import React from "react";
import CSSModules from 'react-css-modules';
import styles from "./Button.css";

@CSSModules(styles)
export default class Button extends React.Component {
  render() {
    return <button styleName="root">Hello world</button>;
  }
}
