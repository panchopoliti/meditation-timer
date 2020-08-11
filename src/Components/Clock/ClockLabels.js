import React from 'react';
import PropTyes from 'prop-types';

function ClockLabels({ hoursDisplayed }) {
    return (
      <div className='titlesContainer'>
        <div className={`titleSpan ${(hoursDisplayed) ? '' : 'hide'}`}>HOURS</div>
        <div className='titleSpan'>MINUTES</div>
        <div className='titleSpan'>SECONDS</div>
      </div>
    );
  }

  ClockLabels.propTypes = {
      hoursDisplayed: PropTyes.bool,
  };

  export default ClockLabels;