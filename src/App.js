import React, { Component } from 'react';
import Clcok from './Components/Clock/Clock';
import MarketCapTable from './Components/MarketCapTable/MarketCapTable';
import CurrencyConverter from './Components/CurrencyConverter/CurrencyConverter';
import HeadIndukator from './Components/HeadIndukator/HeadIndukator'
import './App.css';

class App extends React.Component {


  render() {

    return (
      <div >
        <div className="col-md-12" Style="border-bottom:1px solid #14141450; margin-bottom:15px;">
          <HeadIndukator />
        </div>

        <div className="container">

          <div className="col-md-6">
                  <Clcok  />
            </div>
          <div className="col-md-6">
              <CurrencyConverter/>
            </div>


            <div className="col-md-12" Style="margin-top:10px;">
              <MarketCapTable  />
            </div>
        </div>


      </div>
    );
  }
}

export default App;
