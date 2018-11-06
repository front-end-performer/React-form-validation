import React from 'react';
import '../Button/styles.css';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const LogIn = (props) => (
    <div className={classnames('loginButton',
    )} 
    onClick={props.onClick}>
    {props.label.toUpperCase()}
    </div>
)

  LogIn.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func
  }
  

export default LogIn