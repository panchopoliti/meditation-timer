import React, { Component } from 'react';
import Modal from './Modal.js'
import PropTypes from 'prop-types';
import styles from './css/AudiosModal.module.scss';
import { audiosInfoArray, defaultAudioSelected } from '../Bells';
import { TextField, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import AutoComplete from '@material-ui/lab/Autocomplete';
import { getNumberWithTimeUnitLabel } from '../../generalFunctions.js';
import { SizeContextConsumer } from '../../Context/ToggleContexts.js';

const maxOfMinutesSelection = 360;

const notIncludedNumber = num => {
    return ((num > 60 && num % 5 !== 0) ||  
     (num > 90 && num % 10 !== 0) ||
     (num > 120 && num % 30 !== 0))
}

class AudiosModal extends Component {
    constructor(props) {
        super(props);

        let initialSelectValue = (this.props.ringBellEvery === 1) ?
         `${this.props.ringBellEvery} minute` :
         `${this.props.ringBellEvery} minutes`;

        this.state = {
            selectAudiosValue: defaultAudioSelected,
            autoCompleteInputValue: initialSelectValue,
        };
    }

    handleSelectAudiosChange = (ev) => this.setState({ selectAudiosValue: ev.target.value });

    handleInputChange = (ev, value) => {
        if (!ev) return;

        this.setState({ autoCompleteInputValue: value});
    }

    startAudioBellFromBeginning = () => {

        this.bellRef.currentTime = 0;
        this.bellRef.play();
    };

    closeSuccessModal = () => this.props.closeModal();
    
    closeModal = (ev) => this.props.closeModal(ev, false);

    componentDidUpdate(prevProps) {

        if (prevProps.bellStarting === false && this.props.bellStarting === true) {
            this.startAudioBellFromBeginning();
        }
    }

    render() {

        const { autoCompleteInputValue, selectAudiosValue } = this.state;

        const sortComparison = (nameA, nameB) =>  (nameA > nameB) ? 1 : (nameA < nameB) ? -1 : 0;

        const orderedAudios = audiosInfoArray.sort((objA, objB) => sortComparison(objA.name, objB.name));
        const audios = orderedAudios.map(({ name }, i) => {

            return <MenuItem key={i} value={name}> {name} </MenuItem>
        });

        const { src: selectedAudioSrc } = audiosInfoArray.find(({ name }) => name === selectAudiosValue);
        const minutesOptionsArr = getNumberWithTimeUnitLabel(maxOfMinutesSelection, notIncludedNumber);
        
        return (
            <Modal 
                title={'Settings'}
                modalState={this.props.modalState}
                closeModal={this.closeModal}
                closeSuccessModal={this.closeSuccessModal}
                stopKeyEventPropagation={this.props.stopKeyEventPropagation}
            >   
            <SizeContextConsumer>
                {({ size }) => (
                    <div className={(size === 'big' ? styles.bigContainer : '')}>
                        <div className={styles.audioSelection}>
                            <FormControl>
                                <InputLabel id="simple-select-label">Bells</InputLabel>
                                <Select
                                    labelId="simple-select-label"
                                    id="simple-select"
                                    value={this.state.selectAudiosValue}
                                    onChange={this.handleSelectAudiosChange}
                                >
                                    {audios}
                                </Select>
                            </FormControl>
                        </div>
                        <figure className={styles.reproduceAudio}>
                            <figcaption>Reproduce Bell</figcaption>
                            <audio ref={e => this.bellRef = e} src={selectedAudioSrc} controls>
                                Your browser does not support the
                                <code>audio</code> element.
                            </audio>
                        </figure>
                        <div className={`${styles.inputContainer} ${(this.props.showTimer) ? styles.hide : ''}`}>
                            <AutoComplete
                                id="combo-box"
                                options={minutesOptionsArr}
                                getOptionSelected={(option, { value }) => option.value === value}
                                getOptionLabel={(option) => option.label}
                                onChange={this.props.handleMinutesSelect}
                                onInputChange={(ev, value) => this.handleInputChange(ev, value)}
                                inputValue={autoCompleteInputValue}
                                handleHomeEndKeys={true}
                                filterSelectedOptions={true}
                                fullWidth={true}
                                renderInput={(params) => <TextField {...params} label="Ring every" variant="outlined" />}
                            />
                        </div>
                        <div className={styles.buttonsContainer}>
                            <button 
                                className={`${styles.alertButton} ${styles.button} ${(this.props.showTimer) ? styles.hide : ''}`}
                                onClick={(ev) => this.closeModal(ev, false)}>
                                Cancel
                            </button>
                            <button className={`${styles.successButton} ${styles.button}`} onClick={this.closeSuccessModal}>Save changes</button>
                        </div>
                    </div>
                )}
            </SizeContextConsumer>
            </Modal>
        );
    }
}

AudiosModal.propTypes = {
    modalState: PropTypes.bool,
    ringBellEvery: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    closeModal: PropTypes.func,
    closeSuccessModal: PropTypes.func,
    stopKeyEventPropagation: PropTypes.bool,
    bellStarting: PropTypes.bool,
    handleMinutesSelect: PropTypes.func,
    showTimer: PropTypes.bool,
}

export default AudiosModal;