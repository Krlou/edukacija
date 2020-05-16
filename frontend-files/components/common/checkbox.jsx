import React from "react";

import classes from "./checkbox.module.css";

const CheckBox = (props) => {
  return (
    <div className={classes.checkbox}>
      <input
        className={classes.checkboxInput}
        id={`${props.name}CheckBox`}
        name={props.name}
        type="checkbox"
        onChange={props.onChange}
        value={props.value}
      />
      <label
        className={classes.checkboxLabel}
        htmlFor={`${props.name}CheckBox`}
        style={{ color: "#fff" }}
      >
        {props.label}
      </label>
    </div>
  );
};

export default CheckBox;
