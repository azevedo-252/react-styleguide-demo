import React from "react";
import { getData } from "../../common/request";
import CSSModules from 'react-css-modules';
import styles from "./HomePage.css";

@CSSModules(styles)
export default class HomePage extends React.Component {
  componentWillMount() {
    console.log("[HomePage] will mount with server response: ", this.props.data.home);
  }

  render() {
    let { title } = this.props.data.home;

    return (
      <div styleName='content'>
        <h1>{title}</h1>
        <p styleName='welcomeText'>Thanks for joining!</p>
      </div>
    );
  }

  static fetchData = function(params) {
    return getData("/home");
  }
}
