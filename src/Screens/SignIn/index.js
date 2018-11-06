import React, {Component} from 'react';
import '../SignIn/styles.css';

import FormInput from '../../Components/FormInput';
import LogIn from '../../Components/Button/index'

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
          email: '',
          password: ''
        }
      }

      canSubmit = () => {
          if(this.state.email.length > 0 && this.state.password.length > 0) 
            return console.log('submit')
            return console.log('not submit')
      }
    
    render() {
        const {  email, password  } = this.state
        return (
            <form className="form">
                <FormInput 
                   value={email} 
                   name={'email'}
                   type={'text'}
                   placeholder={'Email'}
                   onTextChange={(email) => { this.setState({ email })}}/>
                <FormInput 
                   value={password}
                   name={'password'}
                   type={'password'}
                   placeholder={'Password'}
                   onTextChange={(password) => { this.setState({ password }) }}/>
                <LogIn 
                   label='Log in'
                   onClick={ this.canSubmit }/>   
            </form>
        )
    }
}

export default SignIn;