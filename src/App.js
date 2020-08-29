import React from 'react';
import Timer from './Components/Clock/Timer.js';
import { getClosestSecond } from './Components/Clock/clock-functions.js';
import { default as Stopwatch } from './Components/Clock/Clock.js';
import './app.scss';
import AudiosModal from './Components/Modals/AudiosModal.js';
import { BelowClockContainer, TabButtons, ChangeSizeButton } from './Components/App';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.mainContainerRef = React.createRef();

        const initialStopwatchRingTime = 2;

        this.state = {
            activeTab: 0,
            keyPressedEvent: null,
            bellStarting: false,
            timeOfTabInactivity: {
                start: null,
                inactivityInSeconds: null,
                isTabActive: true,
            },
            isTimerShowingHours: false,
            isStopwatchShowingHours: false,
            modalClicked: false,
            modalSelectValue: initialStopwatchRingTime,
            showingOverlay: false,  
            numberToRing: initialStopwatchRingTime,
            showAppInBig: false,
        };
    }

    handleClockBtns = tabIndex => this.setState({ activeTab: tabIndex });

    handleModal = (ev, succeed = true) => {

        const { modalClicked, modalSelectValue } = this.state;

        if ((!succeed && modalClicked) || (modalClicked && modalSelectValue === '')) {
            this.setState({ modalSelectValue: this.state.numberToRing });
        } 

        this.setState({ 
            modalClicked: !modalClicked,
            showingOverlay: !this.state.showingOverlay,
        });
    };

    setAppInBigSize = () => {

        this.setState({ showAppInBig: !this.state.showAppInBig });
    }

    setHoursInClock = (state, value) => this.setState({ [state]: value });

    bellStarting = () => this.setState({ bellStarting: true });

    onBodyKeydown = ({ key }) => this.setState({ keyPressed: key});

    handleModalSelect = (ev, optionSelectedObj) => {

        const value = (optionSelectedObj) ? optionSelectedObj.value : '';

        this.setState({ 
            modalSelectValue: value,
        });
    }

    handleVisibilityChange = (ev) => {

        const { timeStamp } = ev || {};
        const { start: inactivityStart, isTabActive } = this.state.timeOfTabInactivity;

        if (isTabActive) {

            this.setState({
                timeOfTabInactivity: {
                    start: timeStamp,
                    inactivityInSeconds: null,
                    isTabActive: false,
                },
            });

            return;
        }

        const timeOfInactivityInMs = timeStamp - inactivityStart;

        const timeOfInactivityInSeconds = getClosestSecond(timeOfInactivityInMs / 1000)

        this.setState({
            timeOfTabInactivity: {
                start: null,
                inactivityInSeconds: timeOfInactivityInSeconds,
                isTabActive: true,
            },
        });
        

    }
    
    componentDidMount() {
        document.addEventListener('keydown', this.onBodyKeydown);
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onBodyKeydown);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }
 
    componentDidUpdate(prevProps, prevState) {

        const { modalClicked, modalSelectValue } = this.state;

        if (this.state.keyPressed) this.setState({ keyPressed: null });

        if (this.state.bellStarting) this.setState({ bellStarting: false });

        if (prevState.modalClicked && !modalClicked) this.setState({ numberToRing: +modalSelectValue });
    }

    render () {
        const { 
            activeTab, 
            keyPressed, 
            bellStarting, 
            numberToRing, 
            isTimerShowingHours,
            isStopwatchShowingHours,
            showingOverlay,
            modalClicked,
            modalSelectValue,
            showAppInBig,
            timeOfTabInactivity,
        } = this.state;

        const showTimer = (!activeTab);

        const hoursInClock = (( showTimer && isTimerShowingHours) || (!showTimer && isStopwatchShowingHours));
        
        const hoursBeingDisplayed = (isTimer) => {
            return {
                setHoursInClock: (state, value) => this.setHoursInClock(state, value),
                stateName: (isTimer) ? 'isTimerShowingHours' : 'isStopwatchShowingHours',
                value: (isTimer) ? isTimerShowingHours : isStopwatchShowingHours,
            }
        }

        const buttonsClassnames = {
            container: (hoursInClock) ? 'hoursInClock' : '',
            buttons: [],
        };

        buttonsClassnames.buttons[activeTab] = 'btnSelected';

        return (
            <div className={`mainContainer ${(showAppInBig) ? 'bigScreenMode' : ''}`}>
                <div onClick={this.handleModal} className={`modalOverlay ${(showingOverlay) ? 'showOverlay' : ''}`}></div>
                <AudiosModal 
                    stopKeyEventPropagation={true}
                    bellStarting={bellStarting}
                    closeModal={this.handleModal} 
                    modalState={modalClicked}
                    ringBellEvery={modalSelectValue}
                    handleMinutesSelect={this.handleModalSelect}
                    showTimer={showTimer}
                />
                <div className='appContainer'>
                    <ChangeSizeButton
                        onClick={this.setAppInBigSize}
                        buttonText={(showAppInBig) ? 'Make it Small' : 'Make it Big!'} 
                    />
                    <main className='appSubContainer'>
                            <TabButtons
                                activeTab={activeTab}
                                handleClick={this.handleClockBtns}
                                amountOfButtons={2}
                                buttonsText={['Timer', 'Stopwatch']}
                                classNames={buttonsClassnames}
                            />
                            <section>
                                <div className='clock'>
                                    <div className={`${(showTimer) ? '' : 'hide' }`}>
                                        <Timer 
                                            keyPressed={(showTimer) ? keyPressed : null} 
                                            bellStarting={this.bellStarting} 
                                            hours={0}
                                            minutes={10} 
                                            seconds={0}
                                            hoursDisplayedInClock={hoursBeingDisplayed(true)}
                                            timeInactivity={timeOfTabInactivity}
                                            ariaIdForContainer={'Clock 1'}
                                        />
                                    </div>
                                    <div className={`${(showTimer) ? 'hide' : '' }`}>
                                        <Stopwatch 
                                            keyPressed={(showTimer) ? null : keyPressed}
                                            bellStarting={this.bellStarting}
                                            hours={0} 
                                            minutes={0} 
                                            seconds={0}
                                            ringEvery={numberToRing}
                                            hoursDisplayedInClock={hoursBeingDisplayed(false)}
                                            timeInactivity={timeOfTabInactivity}
                                            ariaIdForContainer={'Clock 2'}
                                        />
                                    </div>
                                </div>
                            </section>
                            <BelowClockContainer 
                                showTimer={showTimer} 
                                numberToRing={numberToRing} 
                                handleModal={this.handleModal}
                            />
                    </main>
                </div>
                <footer>
                    <span>
                        Logos taken by&nbsp;
                        <a href='https://fontawesome.com/license'>Font Awesome</a>
                        &nbsp;and&nbsp;
                        <a href='https://icons8.com/'>Icons 8</a>
                    </span>
                </footer>
            </div>
        );
    }
}

export default App;










