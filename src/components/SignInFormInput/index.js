import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import '../SignInFormInput/styles.css'

class FormInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focused: false
    }
  }

  renderTitle = () => {
    const { title } = this.props

    return title ? <p className='title'>{title}</p> : null
  }

  render() {
    const {
      icon,
      type,
      name,
      placeholder,
      value,
      onTextChange,
      border,
      isNumber,
      autoWidth,
      isRequired,
      width,
      maxValue,
      cashInput,
      fontThirdPayment,
      fontRestore
    } = this.props

    const { focused } = this.state
    const active = focused || value !== ''

    return (
      <div
        className={classnames(
          'container', 
          cashInput && 'cashInput',
          !icon && 'narrow',
          active && focused ? 'focused' : null,
          border && 'border',
          border && focused && 'borderFocused',
          autoWidth && 'autoWidth',
        )}
        style={{ width }}
      >
        {icon && <i className={classnames('material-icons', 'icon')}>{icon}</i>}
        <input
          className={classnames(
            'u-full-width',
            'inputArea',
            !icon && 'noMarginLeft',
            isRequired && !value && !focused && 'pulse',
            fontThirdPayment && 'fontThirdPayment',
            fontRestore && 'fontRestore'
          )}
          value={value}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={(event) => { 
            let value = event.target.value

            if (isNumber) value = value.replace(/[^0-9]/g,'')

            if (isNumber && parseFloat(value)) {
              value = parseFloat(value) > maxValue ? maxValue.toLocaleString('it-IT',{useGrouping:true}) : parseFloat(value).toLocaleString('it-IT',{useGrouping:true})
            }

            onTextChange(value)
          }}
          onFocus={() => { 
            if (this.props.onFocus) {
              this.props.onFocus(true)
            }
            this.setState({ focused: true }) 
          }}
          onBlur={() => {
            if (this.props.onFocus) {
              this.props.onFocus(false)
            } 
            this.setState({ focused: false }) 
          }}
        />
      </div>
    )
  }
}

FormInput.defaultProps = {
  type: 'text',
  icon: null,
  border: true,
  value: '',
  name: ''
}

FormInput.propTypes = {
  id: PropTypes.node,
  value: PropTypes.string,
  name: PropTypes.string,
  onTextChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  icon: PropTypes.string,
  border: PropTypes.bool,
  title: PropTypes.string,
  rightIcon: PropTypes.string,
  rightIconText: PropTypes.string,
  placeholder: PropTypes.string,
}

export default FormInput
