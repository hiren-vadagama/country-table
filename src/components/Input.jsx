import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import PropTypes from "prop-types";

const Input = ({ label, children, ...otherProps }) => (
  <Form.Group {...otherProps}>
    {label && <Form.Label>{label}</Form.Label>}
    <InputGroup>{children}</InputGroup>
  </Form.Group>
);

// to add Prefix/Postfix icon, buttons, etc.
const AddOn = ({ isLabeled, children, ...otherProps }) =>
  isLabeled ? (
    <InputGroup.Text {...otherProps}>{children}</InputGroup.Text>
  ) : (
    children
  );

const Field = ({ name, value, onChange, ...otherProps }) => {
  return (
    <Form.Control
      name={name}
      value={value}
      onChange={onChange}
      {...otherProps}
    />
  );
};

const Error = ({ children, ...otherProps }) => (
  <Form.Control.Feedback type="invalid" {...otherProps}>
    {children}
  </Form.Control.Feedback>
);

Input.PrefixAddOn = AddOn;
Input.Field = Field;
Input.PostfixAddOn = AddOn;
Input.Error = Error;

Field.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func,
};

AddOn.defaultProps = {
  isLabeled: true,
};

export default Input;
