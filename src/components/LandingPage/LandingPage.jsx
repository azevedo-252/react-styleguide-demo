import React from "react";
import { getData } from "../../common/request";
import CSSModules from 'react-css-modules';
import styles from "./LandingPage.css";

@CSSModules(styles)
export default class LandingPage extends React.Component {
  componentWillMount() {
    console.log("[LandingPage] will mount with server response: ", this.props.data.landing);
  }

  render() {
    let { title } = this.props.data.landing;

    return (
      <div styleName='content'>
        <h1 styleName='heading'>{title}</h1>
        <p styleName='lead'>Create an account to get started!</p>
        <button styleName='signUpButton' onClick={this.signUp}>Sign up</button>
      </div>
    );
  }

  signUp = (event) => {
    alert("Sign Up!");
  }

  static fetchData = function(params) {
    return getData("/landing");
  }
}
