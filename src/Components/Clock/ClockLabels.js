import React from 'react';
import PropTyes from 'prop-types';
import { ThemeContextConsumer } from '../../ThemeContext.js';

function ClockLabels({ hoursDisplayed }) {
    return (
      <ThemeContextConsumer>
        {
          ({ theme }) => (
            <div className='titlesContainer'>
              <div className={`${theme}TitleSpan ${(hoursDisplayed) ? '' : 'hide'}`}>HOURS</div>
              <div className={`${theme}TitleSpan`}>MINUTES</div>
              <div className={`${theme}TitleSpan`}>SECONDS</div>
            </div>
          )
        }
      </ThemeContextConsumer>

    );
  }

  ClockLabels.propTypes = {
      hoursDisplayed: PropTyes.bool,
  };

  export default ClockLabels;