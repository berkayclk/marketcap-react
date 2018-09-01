import React, { Component } from 'react';

class CurrencySelector extends React.Component {
    constructor(props) {
        super(props);
        this.state  = { firstFiveCoin : null};

        this.getCurrencies = this.getCurrencies.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.fetchFirstFiveCoin = this.fetchFirstFiveCoin.bind(this);
      }

      componentDidMount() {

        if(this.props.Table !== undefined && this.props.Table === "true" ){
          this.fetchFirstFiveCoin();
        }
      }

      componentWillUnmount() {
      }

    fetchFirstFiveCoin(){
        fetch("https://api.coinmarketcap.com/v2/ticker/?limit=5&start=0&structure=array")
        .then(response => response.json())
        .then(response => { this.setState({ firstFiveCoin: response.data });});
    }

    getCurrencies(){
       var currencies
      if(this.props.Table !== undefined && this.props.Table === "true" && this.state.firstFiveCoin !=null )
      {
        currencies = this.state.firstFiveCoin;
        if(currencies[0].symbol !== "USD")
          currencies.splice(0,0,{name:"Amerikan Doları",symbol:"USD"});
      }else{
        currencies = require('./ConvertableCurrencies.json');
      }


        return currencies;
    }

    getOptions(currencies){
      function Option(props) {
        return <option value={props.value}> {props.text} </option>;
      }
        var options;
        if(currencies !=null){

            if(this.props.Table !== undefined && this.props.Table === "true" )
               options= currencies.map((currency) => <Option text={currency.symbol} value={currency.symbol} />);
            else
              options= currencies.map((currency) => <Option text={ currency.name +" - "+ currency.currency} value={currency.currency} />);
        }

        else
            options = "";

        return options;
    }

    render() {
      const t = this;

     function CurrencyList() {
       var currencies = t.getCurrencies();
       return t.getOptions(currencies);
     }


      return (
            <select id={this.props.id} value={this.props.value} onChange={this.props.onChange}  className={this.props.className} >
              <CurrencyList />
            </select>
        );
      }
  }


  export default CurrencySelector;