import React from 'react';
import PropTypes from 'prop-types';
import { ThemeContextConsumer } from '../../ThemeContext.js';

function ChangeSizeButton({ onClick, classNames = {}, buttonText }) {

    return (
        <ThemeContextConsumer>
            {
                ({ theme }) => (
                    <div className={`sizeAppButtonContainer ${classNames.container}}`}>
                        <button onClick={onClick} className={`${theme}ChangeSizeButton ${classNames.button}`}>{buttonText}</button>
                    </div>
                )
            }
        </ThemeContextConsumer>
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