import React from "react";
import Styleguide from 'react-styleguide';
import { getData } from "../../common/request";

import Prism from 'prismjs';
import styles from './landing.css';

import Button from '../../styleguide/Button/Button';

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
