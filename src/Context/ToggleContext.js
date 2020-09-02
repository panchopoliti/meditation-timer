import React from "react";
import PropTypes from 'prop-types';

export default function ToggleContext(name, defaultValue, secondValue) {

    const { Consumer, Provider } = React.createContext(defaultValue);

    function createClass() {

        return class extends React.Component {
            constructor(props) {
                super(props);
        
                this.state = {
                   [name]: defaultValue,
                }
            }
        
            toggle = () => {
                this.setState(prevState => {
        
                    return {
                        [name]: prevState[name] === defaultValue ? secondValue : defaultValue,
                    };
                });
            };
        
            render() {
                
                return (
                    <Provider
                        value={{ [name]: this.state[name], toggle: this.toggle }}
                    >
                        {this.props.children}
                    </Provider>
                );
            }
        }
    };

    const ContextProvider = createClass();

    return {
        Provider: ContextProvider,
        Consumer,
    }
}

ToggleContext.propTypes = {
    name: PropTypes.string,
    defaultValue: PropTypes.any,
    secondValue: PropTypes.any,
}