import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './css/Modal.module.scss';
import { noop } from '../../generalFunctions.js'

class Modal extends Component {
  
  constructor(props) {
    super(props); 

    this.divToFocus = null;

    this.setDivFocus = element => {
      this.divToFocus = element;
    };

    this.focusDiv = () => {
      this.divToFocus.focus();
    };
  }

  componentDidUpdate(prevProps) {

    if (this.props.modalState && prevProps.modalState !== this.props.modalState) {

      this.focusDiv();

    }
  }

  closeModalOnKeyPress = (ev) => {

    if (this.props.stopKeyEventPropagation) ev.nativeEvent.stopImmediatePropagation();

    switch (ev.key) {
      case 'Escape':
        return this.props.closeModal(ev);
      case 'Enter':
        return this.props.closeSuccessModal(ev);
      default:
        noop();
    };

  };

  render() {

    const { modalState, children, title, modalValidation } = this.props;

    return (
      <div 
        role='dialog'
        aria-labelledby='modalDialogTitle'
        aria-describedby="bellsDialog"
        ref={this.setDivFocus}
        tabIndex={0} 
        className={
          `${styles.globalAlert} 
          ${styles.modalEffect} 
          ${(modalState) ? styles.showModal : ''} 
          ${(modalValidation) ? '' : styles.invalidModal}`
        }
        onKeyDown={(ev) => this.closeModalOnKeyPress(ev)}>
        <div className={styles.modalContent}>
          <div className={styles.modalTitleContainer}>
            <h2 id='modalDialogTitle' className={styles.modalTitle}>{title}</h2>
          </div>
          {children}
        </div>
      </div>
      );
  }
}

Modal.propTypes = {
  title: PropTypes.string,
  modalState: PropTypes.bool.isRequired,
  modalValidation: PropTypes.bool,
  closeSuccessModal: PropTypes.func,
  closeModal: PropTypes.func,
  stopKeyEventPropagation: PropTypes.bool,
};

Modal.defaultProps = {
  title: 'Modal',
  modalState: false,
  modalValidation: true,
};

export default Modal;