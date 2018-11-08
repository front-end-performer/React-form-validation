import React, { Component } from 'react';
import '../PaymentStage/styles.css';
import { TextInputField, Button } from 'evergreen-ui'

class PaymentStage extends Component {
  constructor() {
    super()
    this.state = {
      cardHolder: '',
      cardNumber: '',
      formErrors: {cardHolder: '', cardNumber: ''},
      formValidity: {cardHolder: false, cardNumber: false},
      renderForm: this.renderCreditCardForm,
      canSubmit: false,
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    }, () => { this.validateField( name, value ) })
  }

  validateField = (name, value) => {
    const fieldValidationErrors = this.state.formErrors
    const validity = this.state.formValidity
    const regexCardHolder = /^(?:[A-Z\u00C0-\u00D6\u00D8-\u00DE]+ ?)([a-z\u00DF-\u00F6\u00F8-\u00FF '&-]+) ([A-Za-z\u00C0-\u00D6\u00D8-\u00DE\u00DF-\u00F6\u00F8-\u00FF '&-]+)$/gm
    const regexCardNumber = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}(?:2131|1800|35\d{3})\d{11})$/gm
    const isCardHolder = name === "cardHolder"
    const isCardNumber = name === "cardNumber"
  
    validity[name] = value.length > 0
    fieldValidationErrors[name] = validity[name] ? '': `${name} is required and cannot be empty`;

    if(validity[name]) {
      if(isCardHolder){
        validity[name] = regexCardHolder.test(value);
        fieldValidationErrors[name] = validity[name] ? '' : `${name} should be a Full Name`;
      }
    }
      if(validity[name]) {
        if(isCardNumber){
          validity[name] = regexCardNumber.test(value);
          fieldValidationErrors[name] = validity[name] ? '' : `${name} is required`;
        }
    }

    this.setState({
      formErrors: fieldValidationErrors,
      formValidity: validity,
    }, () => this.canSubmit())
  }

  canSubmit() {
    this.setState({canSubmit: this.state.formValidity.cardHolder && this.state.formValidity.cardNumber })
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'is-invalid');
  }

 renderCreditCardForm = () => (
        <form>
            <div className="form-group">
              <TextInputField
              className={`form-control ${this.errorClass(this.state.formErrors.cardHolder)}`}
              width="300"
              label='cardHolder'
              name='cardHolder'
              value={this.state.cardHolder}
              onChange={this.handleChange} />
              <div className="invalid-feedback">{this.state.formErrors.cardHolder}</div>
            </div>

            <div className="form-group">
              <TextInputField
              width="300"
              className={`form-control ${this.errorClass(this.state.formErrors.cardNumber)}`}
              label='cardNumber'
              name='cardNumber'
              value={this.state.cardNumber}
              onChange={this.handleChange} />  
              <div className="invalid-feedback">{this.state.formErrors.cardNumber}</div>
            </div>
        </form>
)

 
  handleSubmit = (event) => {
    event.preventDefault()
    const { cardHolder, cardNumber } = this.state

    alert(`Your registration detail: \n 
           CardHolder: ${cardHolder} \n 
           CardNumber: ${cardNumber} \n`)
  }
  

  render() {
    // const { cardHolder, cardNumber } = this.state
    return (
      <div>
      <h1>Registration Form</h1>
      <p style={{marginBottom: 40}}>Please fill in all textboxes</p>
      <div>
          {this.renderCreditCardForm()}
          <Button onClick={this.handleSubmit} intent="success" disabled={!this.state.canSubmit}>Sign up</Button>
      </div>
      </div>
    )
  }
}

export default PaymentStage;
