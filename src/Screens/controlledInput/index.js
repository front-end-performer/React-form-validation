import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
import '../controlledInput/styles.css'
// import classnames from 'classnames'
import { TextInputField } from 'evergreen-ui'

class LogIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            email_check: ''
        }
    }

    handleChange = (e) => {
      let error_message = ''
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.target.value)) {
     error_message = 'Please enter a valid email address.'
   }

        this.setState({
            email: e.target.value,
            email_check: error_message
        })
    }


    render() {
        const { email, email_check } = this.state

        return (
            <div className='form'>
                <TextInputField
                className='input'
                value={email}
                label="Email"
                name="Email"
                type={'text'}
                width={200}
                hint="requires."
                placeholder="email"
                onChange={this.handleChange}
                />
                <div className='red'>{email_check}</div>

                {/* <TextInputField
                className='input'
                value={password}
                label="Password"
                name="Password"
                type={'number'}
                width={200}
                hint="requires."
                placeholder="Password"
                onChange={this.handleChange}
                />
                <div className='red'>{error_password}</div> */}
            </div>
        )
    }
}

export default LogIn
