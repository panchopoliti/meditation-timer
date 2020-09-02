import React from 'react';
import PropTyes from 'prop-types';
import { ThemeContextConsumer, SizeContextConsumer } from '../../Context/ToggleContexts.js';
import styles from './css/ClockLabels.module.scss';

function ClockLabels({ hoursDisplayed }) {
    return (
      <ThemeContextConsumer>
        {({ theme }) => (
          <SizeContextConsumer>
            {({ size }) => (
              <div className={`${styles.container} ${(size === 'big') ? styles.bigContainer : ''}`}>
                <div className={`${styles[`${theme}Title`]} ${(hoursDisplayed) ? '' : styles.hide}`}>HOURS</div>
                <div className={styles[`${theme}Title`]}>MINUTES</div>
                <div className={styles[`${theme}Title`]}>SECONDS</div>
              </div>
            )}
          </SizeContextConsumer>
          )}
      </ThemeContextConsumer>

    );
  }

  ClockLabels.propTypes = {
      hoursDisplayed: PropTyes.bool,
  };

  export default ClockLabels;