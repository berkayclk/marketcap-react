import React, { Component } from 'react';
import './CurrencyConvert.css'
import CoinApiDataProperties from './../../Utility/CoinApiDataProperties';
import CurrencySelector from './../CurrencySelector/CurrencySelector';

class CurrencyConverter extends React.Component {
    constructor(props) {
        super(props);
        this.state  = {fromCurrencyId:"1",toCurrencyId:"USD",coins:null,fromAmount:0,toAmount:0};

        this.getCoins = this.getCoins.bind(this);
        this.handleFromAmountChange = this.handleFromAmountChange.bind(this);
        this.handleFromCurrencyChange = this.handleFromCurrencyChange.bind(this);
        this.handleToCurrencyChange = this.handleToCurrencyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    componentDidMount() {
        this.getCoins();


    }

    componentWillUnmount() {

    }

     getCoins(){
        fetch("https://api.coinmarketcap.com/v2/ticker/?structure=array")
        .then(response => response.json())
        .then(response => this.setState({ coins: response.data }));

    }

    handleFromAmountChange(event) {
        this.setState({fromAmount: event.target.value});
        this.convert(null,null,event.target.value);
    }
    handleFromCurrencyChange(event) {
        this.setState({fromCurrencyId: event.target.value});
        this.convert(event.target.value,null,null);
    }
    handleToCurrencyChange(event) {
        this.setState({toCurrencyId: event.target.value});
        this.convert(null,event.target.value,null);

    }


    convert(fromCurrencyId,toCurrencyId,fromAmount){
        if(fromCurrencyId == null || fromCurrencyId === undefined)
            fromCurrencyId = this.state.fromCurrencyId;
        if(toCurrencyId == null || toCurrencyId === undefined)
            toCurrencyId = this.state.toCurrencyId;
        if(fromAmount == null || fromAmount === undefined)
            fromAmount = this.state.fromAmount;


        fetch("https://api.coinmarketcap.com/v2/ticker/"+fromCurrencyId +"/?convert="+toCurrencyId)
        .then(response => response.json())
        .then(response => {
            var toCurrencyValue = response.data.quotes[toCurrencyId].price
            var fromCurrencyToValue = fromAmount * parseFloat(toCurrencyValue);
            this.setState({toAmount : fromCurrencyToValue});
        });
    }
    handleSubmit(event) {
        this.convert();

    }

    render() {
        const t = this;


        function Option(props) {
            return <option value={props.value}> {props.text} </option>;
          }

        function CoinList() {

            const coins = t.state.coins;
            var options;
            if(t.state.coins !=null)
                options= coins.map((coin) => <Option text={coin[CoinApiDataProperties.nameProp]} value={coin[CoinApiDataProperties.id]} />);
            else
                options = "";

            return options;
        }
          return (
                <div class="currency-converter col-md-12" >
                    <span className="header col-md-12" > PARA BİRİMİ ÇEVİR</span>

                    <div className="row">
                        <div className="form-group col-md-12">
                                   <select id="fromCurrency" value={this.state.fromCurrencyId}  onChange={this.handleFromCurrencyChange} className="col-md-3" >
                                        <CoinList />
                                    </select>
                                    <input type="text" id="fromAmount" value={this.state.fromAmount} onChange={this.handleFromAmountChange} className="col-md-8"/>
                        </div>

                        <div className="form-group col-md-12">

                                <CurrencySelector id="toCurrency" value={this.state.toCurrencyId} onChange={this.handleToCurrencyChange}  className="col-md-3" />
                                <input id="toAmount" value={this.state.toAmount} className="col-md-8" />
                        </div>

                        <div className="form-group submit-item col-md-12" >
                           <input value="ÇEVİR" type="hidden" className="btn btn-primary btn-lg btn-block" id="convertCurrency" onClick={this.handleSubmit} />
                        </div>

                    </div>

            </div>
            );
        }
    }

  export default CurrencyConverter;