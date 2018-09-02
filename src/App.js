import React, { Component } from 'react';
import MarketCapTable from './Components/MarketCapTable/MarketCapTable';
import HeadIndukator from './Components/HeadIndukator/HeadIndukator'
import Banner from './Components/Banner/Banner'
import './App.css';

class App extends React.Component {


  render() {

    return (
      <div>
      <HeadIndukator Style="float:left;border-bottom:1px solid #14141450; margin-bottom:15px;" />
        <div className=" container">
           <Banner />

          <MarketCapTable className="col-md-12" Style="float:left; margin-top:20px;" />


      </div>
      </div>
    );
  }
}

export default App;
