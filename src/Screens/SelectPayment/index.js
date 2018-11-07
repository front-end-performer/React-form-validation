import React, { Component } from 'react'
import '../SelectPayment/styles.css'
import { TextInputField, Button } from 'evergreen-ui'
import Radio from '../../components/Radio/index'

//Payment options logos
import VisaLogo from '../../assets/visa-logo.jpg'
import MasterCardLogo from '../../assets/master-card-logo.png'
import MaestroLogo from '../../assets/maestro-logo.png'
import SepaLogo from  '../../assets/sepa-logo.png'

class PaymentStage extends Component {
  constructor() {
    super()
    this.state = {
      cardHolder: '',
      cardNumber: '',
      cardCvc: '',
      sepaIban: '',
      sepaName: '',
      formErrors: {cardHolder: '', cardNumber: '', sepaIban: '', sepaName: ''},
      formValidity: {cardHolder: false, cardNumber: false, sepaIban: false, sepaName: false},
      paymentOptions: [
        {
          id: 0,
          methodName: 'card',
          title: 'Kreditkarte',
          subtitle: '+ Transkationsgebhr',
          selected: true,
          renderForm: this.renderCreditCardForm,
          images: [VisaLogo, MasterCardLogo, MaestroLogo]
        },
        {
          id: 1,
          methodName: 'sepa',
          title: 'SEPA Lastschrift',
          subtitle: 'keine zusätzlichen Gebühren',
          selected: false,
          renderForm: this.renderSepaForm,
          images: [SepaLogo]
        }
      ],
      submitCards: false,
      submitSepa: false
    };
    this.handleChange = this.handleChange.bind(this)
  }

  selectOption = (index) => {
    const paymentOptions = this.state.paymentOptions.map(option => {
      option.selected = false
      return option
    })

    paymentOptions[index].selected = true
    this.setState({
      paymentOptions,
      // value: this.state.value
    })
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

    const regexSepaHolder = /^(?:[A-Z\u00C0-\u00D6\u00D8-\u00DE]+ ?)([a-z\u00DF-\u00F6\u00F8-\u00FF '&-]+) ([A-Za-z\u00C0-\u00D6\u00D8-\u00DE\u00DF-\u00F6\u00F8-\u00FF '&-]+)$/gm
    const regexSepaNumber = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}(?:2131|1800|35\d{3})\d{11})$/gm
    const isSepaName = name === "sepaName"
    const isSepaIban = name === "sepaIban"

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

    if(validity[name]) {
      if(isSepaName){
        validity[name] = regexSepaHolder.test(value);
        fieldValidationErrors[name] = validity[name] ? '' : `${name} is required`;
      }
  }

  if(validity[name]) {
    if(isSepaIban){
      validity[name] = regexSepaNumber.test(value);
      fieldValidationErrors[name] = validity[name] ? '' : `${name} is required`;
    }
}

    this.setState({
      formErrors: fieldValidationErrors,
      formValidity: validity,
    }, () => this.canSubmit())
  }

  canSubmit = () => {
    this.setState({submitCards: this.state.formValidity.cardHolder && this.state.formValidity.cardNumber,
      submitSepa: this.state.formValidity.sepaName && this.state.formValidity.sepaIban})
  }

 renderCreditCardForm = () => (
   <section className='section'>
      <div className="form-group">
        <TextInputField
         width={300}
        label='cardHolder'
        name='cardHolder'
        value={this.state.cardHolder}
        onChange={this.handleChange} />
        <div className="invalidFeedback">{this.state.formErrors.cardHolder}</div>
      </div>
      <div className="form-group">
        <TextInputField
         width={300}
        label='cardNumber'
        name='cardNumber'
        value={this.state.cardNumber}
        onChange={this.handleChange} />
        <div className="invalidFeedback">{this.state.formErrors.cardNumber}</div>
      </div>
      </section>
)

renderSepaForm = () => (
<section className='section'>
  <div className="form-group">
    <TextInputField
     width={300}
    label='sepaName'
    name='sepaName'
    value={this.state.sepaName}
    onChange={this.handleChange} />
    <div className="invalidFeedback">{this.state.formErrors.sepaName}</div>
  </div>

  <div className="form-group">
    <TextInputField
    width={300}
    label='sepaIban'
    name='sepaIban'
    value={this.state.sepaIban}
    onChange={this.handleChange} />
    <div className="invalidFeedback">{this.state.formErrors.sepaIban}</div>
  </div>
</section>
)


  handleSubmit = (event) => {
    event.preventDefault()
    const { cardHolder, cardNumber, sepaName, sepaIban } = this.state

    alert(`Your registration detail: \n
           CardHolder: ${cardHolder} \n
           CardNumber: ${cardNumber} \n
           SepaName: ${sepaName} \n
           SepaIban: ${sepaIban} \n`)
  }

  renderContent = (paymentOption) => {
    const {
      selected,
      subtitle,
      title,
      id,
      renderForm,
      images
    } = paymentOption

    if (selected) {
      return (
        <div key={id}>
          <Radio
            onClick={() => this.selectOption(id)}
            active={selected}
            title={title}
            subtitle={subtitle}
            images={images}
            displayBorder
            lightBorder
          />
          {renderForm()}
        </div>
      )
    }

    return (
      <Radio
        key={id}
        onClick={() => this.selectOption(id)}
        active={selected}
        title={title}
        subtitle={subtitle}
        images={images}
      />
    )
  }


  render() {
    // const { cardHolder, cardNumber } = this.state
    return (
      <div className='form'>
      <h1>Form</h1>
      <div>
          <form>
            {this.state.paymentOptions.map(paymentOption => this.renderContent(paymentOption))}
          </form>
          <Button appearance="primary" onClick={this.handleSubmit} intent="success" disabled={!this.state.submitCards || !this.state.submitSepa }>Sign up</Button>
      </div>
      </div>
    )
  }
}

export default PaymentStage;
