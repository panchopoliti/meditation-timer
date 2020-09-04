import React from 'react';
import Timer from './Components/Clock/Timer.js';
import { getClosestSecond } from './Components/Clock/clock-functions.js';
import { default as Stopwatch } from './Components/Clock/Clock.js';
import styles from './css/App.module.scss';
import AudiosModal from './Components/Modals/AudiosModal.js';
import { BelowClockContainer, TabButtons, SizeToggler, NavBar, Footer } from './Components/App';
import { ThemeContextConsumer, SizeContextConsumer } from './Context/ToggleContexts.js';

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
                isWindowTabActive: true,
            },
            isTimerShowingHours: false,
            isStopwatchShowingHours: false,
            modalClicked: false,
            modalSelectValue: initialStopwatchRingTime,
            showingOverlay: false,  
            numberToRing: initialStopwatchRingTime,
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
        const { start: inactivityStart } = this.state.timeOfTabInactivity;

        if (document.visibilityState === 'hidden') {

            if (inactivityStart !== null) return;

            this.setState({
                timeOfTabInactivity: {
                    start: timeStamp,
                    inactivityInSeconds: null,
                    isWindowTabActive: false,
                },
            });

        } else {

            const timeOfInactivityInMs = timeStamp - inactivityStart;

            const timeOfInactivityInSeconds = getClosestSecond(timeOfInactivityInMs / 1000)
    
            this.setState({
                timeOfTabInactivity: {
                    start: null,
                    inactivityInSeconds: timeOfInactivityInSeconds,
                    isWindowTabActive: true,
                },
            });
        }
    }
    
    componentDidMount() {
        document.addEventListener('keydown', this.onBodyKeydown);
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
        document.addEventListener('resume', this.handleVisibilityChange);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onBodyKeydown);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        document.removeEventListener('resume', this.handleVisibilityChange);
    }
 
    componentDidUpdate(prevState) {

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
            container: (hoursInClock) ? styles.hoursInClock : '',
        };

        return (
            <ThemeContextConsumer>
                {({ theme }) => (
                    <SizeContextConsumer>
                        {({ size }) => (
                            <div className={`${styles[`${theme}MainContainer`]} ${(size === 'big') ? styles.bigContainer : ''}`}>
                                <div onClick={this.handleModal} className={`${styles.modalOverlay} ${(showingOverlay) ? styles.showOverlay : ''}`}></div>
                                <AudiosModal 
                                    stopKeyEventPropagation={true}
                                    bellStarting={bellStarting}
                                    closeModal={this.handleModal} 
                                    modalState={modalClicked}
                                    ringBellEvery={modalSelectValue}
                                    handleMinutesSelect={this.handleModalSelect}
                                    showTimer={showTimer}
                                />
                                <NavBar/>
                                <div className={styles.appContainer}>
                                    <SizeToggler />
                                    <main className={styles.appSubContainer}>
                                            <TabButtons
                                                activeTab={activeTab}
                                                handleClick={this.handleClockBtns}
                                                amountOfButtons={2}
                                                buttonsText={['Timer', 'Stopwatch']}
                                                classNames={buttonsClassnames}
                                            />
                                            <section>
                                                <div className={styles.clock}>
                                                    <div className={(showTimer) ? '' : styles.hide}>
                                                        <Timer 
                                                            keyPressed={(showTimer) ? keyPressed : null} 
                                                            bellStarting={this.bellStarting} 
                                                            hours={0}
                                                            minutes={10} 
                                                            seconds={0}
                                                            hoursDisplayedInClock={hoursBeingDisplayed(true)}
                                                            timeInactivity={timeOfTabInactivity}
                                                            ariaIdForContainer={'Clock-1'}
                                                        />
                                                    </div>
                                                    <div className={(showTimer) ? styles.hide : ''}>
                                                        <Stopwatch 
                                                            keyPressed={(showTimer) ? null : keyPressed}
                                                            bellStarting={this.bellStarting}
                                                            hours={0} 
                                                            minutes={0} 
                                                            seconds={0}
                                                            ringEvery={numberToRing}
                                                            hoursDisplayedInClock={hoursBeingDisplayed(false)}
                                                            timeInactivity={timeOfTabInactivity}
                                                            ariaIdForContainer={'Clock-2'}
                                                        />
                                                    </div>
                                                </div>
                                            </section>
                                            <BelowClockContainer 
                                                showTimer={showTimer} 
                                                numberToRing={numberToRing} 
                                                handleModal={this.handleModal}
                                                modalClicked={modalClicked}
                                            />
                                    </main>
                                </div>
                                <Footer/>
                            </div>
                        )}
                    </SizeContextConsumer>
                )}
            </ThemeContextConsumer>
        );
    }
}

export default App;



