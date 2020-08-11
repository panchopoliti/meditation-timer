import React from 'react';
import PropTypes from 'prop-types';

function ChangeSizeButton({ onClick, classNames = {}, buttonText }) {

    return (
        <div className={`sizeAppButtonContainer ${classNames.container}}`}>
            <button onClick={onClick} className={`${classNames.button}`}>{buttonText}</button>
        </div>
    );
    
}

ChangeSizeButton.propTypes = {
    onClick: PropTypes.func,
    buttonText: PropTypes.string,
    classNames: PropTypes.shape({
        container: PropTypes.string,
        button: PropTypes.string,
    }),
}

ChangeSizeButton.defaultProps = {
    buttonText: 'Change Size Button',
    classNames: {
        container: '',
        button: '',
    },
}

export default ChangeSizeButton;