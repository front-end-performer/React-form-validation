import React, { Component } from 'react';
import '../Form/styles.css';
import { TextInputField } from 'evergreen-ui'

class Form extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      username: '',
      password: '',
      formErrors: {email: '', username:'', password: ''},
      formValidity: {email: false, username: false, password: false},
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
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    const isEmail = name === "email"
    const isPassword = name === "password"
  
    validity[name] = value.length >0
    fieldValidationErrors[name] = validity[name] ? '': `${name} is required and cannot be empty`;

    if(validity[name]) {
      if(isEmail){
        validity[name] = emailTest.test(value);
        fieldValidationErrors[name] = validity[name] ? '' : `${name} should be a valid email address`;
      }
      if(isPassword){
        validity[name] = value.length >= 5;
        fieldValidationErrors[name] = validity[name] ? '': `${name} should be 5 characters or more`;
      }
    }

    this.setState({
      formErrors: fieldValidationErrors,
      formValidity: validity,
    }, () => this.canSubmit())
  }

  canSubmit() {
    this.setState({canSubmit: this.state.formValidity.email && this.state.formValidity.username && this.state.formValidity.password})
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'is-invalid');
  }

  // triggered on submit
  handleSubmit = (event) => {
    // get our const values by destructuring state
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring
    event.preventDefault()
    const { email, username, password } = this.state
    // regular javascript alert function
    alert(`Your registration detail: \n 
           Email: ${email} \n 
           Username: ${username} \n
           Password: ${password}`)
  }
  

  render() {
    const { email, username, password } = this.state
    return (
      <React.Fragment>
      <h1>Registration Form</h1>
      <p>Please fill in all textboxes</p>
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <TextInputField
          className={`form-control ${this.errorClass(this.state.formErrors.email)}`}
          label='email'
          name='email'
          value={email}
          onChange={this.handleChange} />
          <div className="invalid-feedback">{this.state.formErrors.email}</div>
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <TextInputField
          className={`form-control ${this.errorClass(this.state.formErrors.username)}`}
          label='username'
          name='username'
          value={username}
          onChange={this.handleChange} />  
          <div className="invalid-feedback">{this.state.formErrors.username}</div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <TextInputField
          className={`form-control ${this.errorClass(this.state.formErrors.password)}`}
          label='password'
          name='password'
          value={password}
          onChange={this.handleChange} />
          <div className="invalid-feedback">{this.state.formErrors.password}</div>
        </div>
        <button className="btn btn-success btn-block" disabled={!this.state.canSubmit}>Sign up</button>
      </form>
      </React.Fragment>
    )
  }
}

export default Form;
