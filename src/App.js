import React, { Component } from 'react';
import './App.css'
// import PaymentStage from './Screens/SelectPayment/index'
// import SelectPayment from './Screens/SelectPayment/index'
import PaymentDemo from './Screens/demo/index'

class App extends Component {
  render() {
    return (
      <div className="App">
          {/* <PaymentStage /> */}
          {/* <SelectPayment /> */}
          <PaymentDemo />
      </div>
    );
  }
}

export default App;
