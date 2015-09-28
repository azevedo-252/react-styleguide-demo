import React from "react";
import Styleguide from 'react-styleguide';
import { getData } from "../../common/request";
import CSSModules from 'react-css-modules';
import styles from "./LandingPage.css";

import Prism from 'prismjs';
import Button from '../Button/Button';

@CSSModules(styles)
export default class LandingPage extends React.Component {
  render() {
    return (
      <Styleguide title="Example Project Styleguide">
        <div
          title="Button"
          description="Here is a description describing a simple Button component and how you would use it."
          example="<Button />"
        >
          <Button />
        </div>
      </Styleguide>
    );
  }

  static fetchData = function(params) {
    return getData("/landing");
  }
}
