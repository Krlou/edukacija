import React, { Component } from "react";

import Popover from "./popover";

import classes from "./buttonMenu.module.css";

class ButtonMenu extends Component {
  state = {};

  handleRedirect = () => {
    window.location.pathname = "/new-book";
  };

  renderPopover(
    colStyleObj,
    placement,
    buttonStyleClass,
    iconClass,
    headerText,
    bodyText,
    isStudent
  ) {
    return (
      <div style={isStudent ? {} : { marginRight: "32px" }}>
        <Popover
          placement={placement}
          buttonStyleClass={buttonStyleClass}
          iconClass={iconClass}
          headerText={headerText}
          bodyText={bodyText}
          isStudent={isStudent}
        />
      </div>
    );
  }

  renderButton(buttonStyleClass, iconStyleObj, iconClass, title) {
    return (
      <div>
        <button
          className={classes.iconBtn}
          id={buttonStyleClass}
          title={title}
          onClick={this.handleRedirect}
        >
          <i style={iconStyleObj} className={iconClass}></i>
        </button>
      </div>
    );
  }

  render() {
    return null;
  }
}

export default ButtonMenu;
