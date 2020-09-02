import React from "react";

const { Consumer, Provider } = React.createContext('light');

class ThemeContextProvider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
           theme: 'light',
        }
    }

    toggleTheme = () => {
        this.setState(prevState => {

            return {
                theme: prevState.theme === "light" ? "dark" : "light"
            };
        });
    };

    render() {
        return (
        <Provider
            value={{ theme: this.state.theme, toggleTheme: this.toggleTheme }}
        >
            {this.props.children}
        </Provider>
        );
    }
}

export { ThemeContextProvider, Consumer as ThemeContextConsumer };