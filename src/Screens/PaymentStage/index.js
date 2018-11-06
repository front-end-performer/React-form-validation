import React, { Component } from 'react';
import '../PaymentStage/styles.css';
import { TextInputField } from 'evergreen-ui'

class Payment extends Component {
  constructor() {
    super()
    this.state = {
      cardHolder: '',
      cardNumber: '',
      cardExpiryMonth: '',
      cardExpiryYear: '',
      cardCvc: '',
      iban: '',
      formErrors: {cardHolder: '', cardNumber: '', cardExpiryMonth: '', cardExpiryYear: '', cardCvc: '', iban: ''},
      formValidity: {cardHolder: false, cardNumber: false, cardExpiryMonth: false, cardExpiryYear: '', cardCvc: false, iban: false},
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
    // const regexCardExpiryMonth = /^(0[1-9]|1[0-2])(\/|-)([0-9]{4})$/gm
    const regexIban = /^AL\d{10}[0-9A-Z]{16}$|^AD\d{10}[0-9A-Z]{12}$|^AT\d{18}$|^BH\d{2}[A-Z]{4}[0-9A-Z]{14}$|^BE\d{14}$|^BA\d{18}$|^BG\d{2}[A-Z]{4}\d{6}[0-9A-Z]{8}$|^HR\d{19}$|^CY\d{10}[0-9A-Z]{16}$|^CZ\d{22}$|^DK\d{16}$|^FO\d{16}$|^GL\d{16}$|^DO\d{2}[0-9A-Z]{4}\d{20}$|^EE\d{18}$|^FI\d{16}$|^FR\d{12}[0-9A-Z]{11}\d{2}$|^GE\d{2}[A-Z]{2}\d{16}$|^DE\d{20}$|^GI\d{2}[A-Z]{4}[0-9A-Z]{15}$|^GR\d{9}[0-9A-Z]{16}$|^HU\d{26}$|^IS\d{24}$|^IE\d{2}[A-Z]{4}\d{14}$|^IL\d{21}$|^IT\d{2}[A-Z]\d{10}[0-9A-Z]{12}$|^[A-Z]{2}\d{5}[0-9A-Z]{13}$|^KW\d{2}[A-Z]{4}22!$|^LV\d{2}[A-Z]{4}[0-9A-Z]{13}$|^LB\d{6}[0-9A-Z]{20}$|^LI\d{7}[0-9A-Z]{12}$|^LT\d{18}$|^LU\d{5}[0-9A-Z]{13}$|^MK\d{5}[0-9A-Z]{10}\d{2}$|^MT\d{2}[A-Z]{4}\d{5}[0-9A-Z]{18}$|^MR13\d{23}$|^MU\d{2}[A-Z]{4}\d{19}[A-Z]{3}$|^MC\d{12}[0-9A-Z]{11}\d{2}$|^ME\d{20}$|^NL\d{2}[A-Z]{4}\d{10}$|^NO\d{13}$|^PL\d{10}[0-9A-Z]{,16}n$|^PT\d{23}$|^RO\d{2}[A-Z]{4}[0-9A-Z]{16}$|^SM\d{2}[A-Z]\d{10}[0-9A-Z]{12}$|^SA\d{4}[0-9A-Z]{18}$|^RS\d{20}$|^SK\d{22}$|^SI\d{17}$|^ES\d{22}$|^SE\d{22}$|^CH\d{7}[0-9A-Z]{12}$|^TN59\d{20}$|^TR\d{7}[0-9A-Z]{17}$|^AE\d{21}$|^GB\d{2}[A-Z]{4}\d{14}$/
    const regexExpiryYear = /^[0-9]{4}$/
    const isCardHolder = name === "cardHolder"
    const isCardNumber = name === "cardNumber"
    // const isCardExpiryMonth = name === "cardExpiryMonth"
    const isCardExpiryYear = name === "cardExpiryYear"
    const isCardCvc = name === "cardCvc"
    const isIban = name === "iban"
  
    validity[name] = value.length >0
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

   
    // if(isCardExpiryMonth){
    //   validity[name] = regexCardExpiryMonth.test(value);
    //   fieldValidationErrors[name] = validity[name] ? '' : `${name} should be a here`;
    // }

    if(isCardExpiryYear){
          validity[name] = regexExpiryYear.test(value);
          fieldValidationErrors[name] = validity[name] ? '' : `${name} should be 4 digits format`
    }   

    if(isCardCvc){
          validity[name] = value.length > 1 && value.slice(0,3);
          fieldValidationErrors[name] = validity[name] ? '' : `${name} should be 3 digits!`
    }  

    if(isIban){
      validity[name] = regexIban.test(value);
      fieldValidationErrors[name] = validity[name] ? '' : `${name} The expire date formate is not correct!`
}  

    this.setState({
      formErrors: fieldValidationErrors,
      formValidity: validity,
    }, () => this.canSubmit())
  }

  canSubmit() {
    this.setState({canSubmit: this.state.formValidity.cardHolder && this.state.formValidity.cardNumber && this.state.formValidity.cardExpiryMonth && this.state.formValidity.cardExpiryYear && this.state.formValidity.cardCvc})
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'is-invalid');
  }

  // triggered on submit
  handleSubmit = (event) => {
    // get our const values by destructuring state
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring
    event.preventDefault()
    const { cardHolder, cardNumber, cardExpiryMonth, cardExpiryYear, cardCvc } = this.state
    // regular javascript alert function
    alert(`Your registration detail: \n 
           CardHolder: ${cardHolder} \n 
           CardNumber: ${cardNumber} \n
           CardExpiryMonth: ${cardExpiryMonth}
           CardCvc: ${cardCvc}
           CardExpiryYear: ${cardExpiryYear}`)
  }
  

  render() {
    const { cardHolder, cardNumber, cardExpiryMonth, cardExpiryYear, cardCvc, iban } = this.state
    return (
      <div>
      <h1>Registration Form</h1>
      <p>Please fill in all textboxes</p>
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <TextInputField
          width="300"
        //   className={`form-control ${this.errorClass(this.state.formErrors.cardHolder)}`}
          label='cardHolder'
          name='cardHolder'
          value={cardHolder}
          onChange={this.handleChange} />
          <div className="invalid-feedback">{this.state.formErrors.cardHolder}</div>
        </div>

        <div className="form-group">
          <TextInputField
          width="300"
          className={`form-control ${this.errorClass(this.state.formErrors.cardNumber)}`}
          label='cardNumber'
          name='cardNumber'
          value={cardNumber}
          onChange={this.handleChange} />  
          <div className="invalid-feedback">{this.state.formErrors.cardNumber}</div>
        </div>

        <div className="form-group">
          <TextInputField
          width="300"
          className={`form-control ${this.errorClass(this.state.formErrors.cardExpiryMonth)}`}
          label='cardExpiryMonth'
          name='cardExpiryMonth'
          placeholder='MM'
          type='number'
          value={cardExpiryMonth && cardExpiryMonth <= 12 ? cardExpiryMonth.slice(0,2) : ''}
          onChange={this.handleChange} />
          <div className="invalid-feedback">{this.state.formErrors.cardExpiryMonth}</div>
        </div>

        <div className="form-group">
          <TextInputField
          width="300"
          className={`form-control ${this.errorClass(this.state.formErrors.cardExpiryYear)}`}
          label='cardExpiryYear'
          name='cardExpiryYear'
          type='number'
          value={cardExpiryYear.slice(0,4)}
          onChange={this.handleChange} />
          <div className="invalid-feedback">{this.state.formErrors.cardExpiryYear}</div>
        </div>

         <div className="form-group">
          <TextInputField
          width="300"
          className={`form-control ${this.errorClass(this.state.formErrors.cardCvc)}`}
          label='cardCvc'
          name='cardCvc'
          type='number'
          value={cardCvc.slice(0,3)}
          onChange={this.handleChange} />
          <div className="invalid-feedback">{this.state.formErrors.cardCvc}</div>
        </div>

         <div className="form-group">
          <TextInputField
          width="300"
          className={`form-control ${this.errorClass(this.state.formErrors.iban)}`}
          label='iban'
          name='iban'
          type={'text'}
          value={iban}
          onChange={this.handleChange} />  
          <div className="invalid-feedback">{this.state.formErrors.iban}</div>
        </div>

        <button className="btn btn-success btn-block" disabled={!this.state.canSubmit}>Sign up</button>
      </form>
      </div>
    )
  }
}

export default Payment;
