import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import SignIn from './Screens/SignIn';
// import LogIn from './Screens/controlledInput/index'
// import Validation from './Screens/Disabling_Submit_Button/index'
// import Form from './Screens/Form/index'
// import Payment from './Screens/PaymentStage/index'
// import PayStage from './Screens/PaymentCompStage/index'
import SelectPayment from './SelectPayment/index'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* <SignIn /> */}
          {/* <LogIn /> */}
          {/* <Validation /> */}
          {/* <Form /> */}
          {/* <Payment /> */}
          {/* <PayStage /> */}
          <SelectPayment />
        </header>
      </div>
    );
  }
}

export default App;
