import React, { Component } from 'react';
import './App.css'
// import PayStage from './Screens/SelectPayment/index'
import PaymentStage from './Screens/SelectPayment/index'

class App extends Component {
  render() {
    return (
      <div className="App">
          {/* <PayStage /> */}
          <PaymentStage />
      </div>
    );
  }
}

export default App;
