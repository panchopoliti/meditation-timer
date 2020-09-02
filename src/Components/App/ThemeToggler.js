import React from 'react';
import { ThemeContextConsumer } from '../../ThemeContext.js';

export default function ThemeToggler () {
    
    return (
        <ThemeContextConsumer>
            {
                ({ theme, toggleTheme }) => (
                    <div className='toggleButtonContainer'>
                        <button
                            onClick={toggleTheme} 
                            className={`${theme}ToggleButton`}>
                        </button>
                    </div>
                )
            }
        </ThemeContextConsumer>
    )
}