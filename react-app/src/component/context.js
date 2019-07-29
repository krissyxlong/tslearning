import React, { Component } from 'react';
/** context provides a way to pass data through the component
 *  tree without having to pass props down manually at every level
 *  使用场景：全局的的数据，如主题色，语言等*/

const ThemeContext = React.createContext('light');

export default class Index extends React.Component {
    render() {
        return <ThemeContext value="dark"><Toolbar /></ThemeContext>;
    }
}

function Toolbar(props) {
    // The Toolbar component must take an extra "theme" prop
    // and pass it to the ThemedButton. This can become painful
    // if every single button in the app needs to know the theme
    // because it would have to be passed through all components.
    return (
        <div>
            <ThemedButton />
        </div>
    );
}

class ThemedButton extends React.Component {
    static contextType = ThemeContext;
    render() {
        return <button>{this.context}</button>;
    }
}

class Button extends Component{
    render() {
        return <button>heheda:`${this.props.theme}`</button>
    }
}
