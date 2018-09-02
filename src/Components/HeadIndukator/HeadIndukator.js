import React, { Component } from 'react';
import './HeadIndukator.css';
import GlobaMarketlApiDataProperties from './../../Utility/GlobaMarketlApiDataProperties';
import CurrencySelector from './../CurrencySelector/CurrencySelector';

class HeadIndukator extends React.Component {
    constructor(props) {
        super(props);

        const currencies = require('./ConvertableCurrencies.json');
        this.state = {GlobalResponse: null, SelectedCurrency:"USD", SelectedCurrencySymbol:"$",currencies :currencies };

        this.getGlobalData = this.getGlobalData.bind(this);
        this.onSelectedCurrencyChange = this.onSelectedCurrencyChange.bind(this);
        this.findSymbol = this.findSymbol.bind(this);
      }


    componentDidMount() {
        this.tick();
        this.timerID = setInterval(
          () => this.tick(),
          300000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.getGlobalData();

    }


    getGlobalData(){

        fetch(GlobaMarketlApiDataProperties.GlobalApiUrl + "?convert="+this.state.SelectedCurrency.toString())
        .then(response => response.json())
        .then(response => {  this.setState({ GlobalResponse: response.data });});

    }

    getPriceFormat(price){
        var priceString = price.toString();
        var currencySymbol = this.state.SelectedCurrencySymbol;
        var result ="";

        var counter = 0;
        for(var i = priceString.length-1; i>=0 ;i--){
            counter++;

            result = priceString[i]+result;
            if(counter%3===0 && i!==0)
                result = "."+result;
        }

        result = currencySymbol + result;
        return result;
    }

    onSelectedCurrencyChange(event){

        this.setState({SelectedCurrency : event.target.value}, () => {this.getGlobalData(); this.findSymbol();});

    }

    findSymbol(){
        if( this.state.currencies == null ||  this.state.currencies === undefined ||  this.state.SelectedCurrency === null || this.state.SelectedCurrency === undefined)
        {
            this.setState({SelectedCurrencySymbol : ""});
            return;
        }
        var currency = this.state.SelectedCurrency;
        var currencies = this.state.currencies;

        for(var i = 0 ; i<currencies.length;i++)
        {
            if(currencies[i].currency === currency){
                this.setState({SelectedCurrencySymbol :  currencies[i].symbol});
                return;
            }

        }

        this.setState({SelectedCurrencySymbol : this.state.SelectedCurrency});
    }

    render() {
        var element = "";

        element =    (this.state.GlobalResponse !== null && this.state.GlobalResponse !== undefined && this.state.GlobalResponse[GlobaMarketlApiDataProperties.quotes][this.state.SelectedCurrency] !== undefined ) ?
                            (
                            <div >
                                <div className="global-stats mobile visible-xs" data-global-stats-container="">
                                    <ul className="list-group ">
                                        <li className="list-group-item main">
                                        Market Kapasitesi : <strong><a href="/charts/"><span data-global-stats-market-cap="" data-global-currency-market-cap="">{this.getPriceFormat(this.state.GlobalResponse[GlobaMarketlApiDataProperties.quotes][this.state.SelectedCurrency][GlobaMarketlApiDataProperties.quotes_total_market_cap])}</span></a></strong>
                                        <button className="pull-right dropdown-toggle collapsed" data-toggle="collapse" data-target="#global-stats-mobile-1" aria-expanded="false" aria-controls="global-stats-mobile-1"><span className="caret"></span></button>
                                        </li>
                                    </ul>
                                    <div id="global-stats-mobile-1" className="collapse" Style="height: 0px;">
                                        <ul className="list-group">
                                            <li className="list-group-item">24 Saatlik Pazar Hacmi : <strong><a href="/charts/"><span data-global-stats-volume="" data-global-currency-volume="">{this.getPriceFormat(this.state.GlobalResponse[GlobaMarketlApiDataProperties.quotes][this.state.SelectedCurrency][GlobaMarketlApiDataProperties.quotes_total_volume_24h])}</span></a></strong></li>
                                            <li className="list-group-item">BTC Payı : <strong><a href="/charts/#dominance-percentage"><span data-global-stats-btc-dominance="">{this.state.GlobalResponse[GlobaMarketlApiDataProperties.active_cryptocurrencies]}</span>%</a></strong></li>
                                            <li className="list-group-item">Aktif Kriptopara: <strong><a href="/all/views/all/"><span data-global-stats-cryptocurrencies="">{this.state.GlobalResponse[GlobaMarketlApiDataProperties.active_cryptocurrencies]}</span></a></strong></li>
                                            <li className="list-group-item last">Borsa Sayısı: <strong><a href="/currencies/volume/24-hour/"><span data-global-stats-markets="">{this.state.GlobalResponse[GlobaMarketlApiDataProperties.active_markets]}</span></a></strong></li>
                                            <li>
                                                <CurrencySelector id="currency-selector-headindukator" Table="true" classNameName="currency-selector" onChange={this.onSelectedCurrencyChange} value={this.state.SelectedCurrency} />
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="outer-container global-stats desktop hidden-xs">
                                    <div className="container global-stats inside-box desktop">
                                        <div className="pull-left stats-col col-md-11">
                                            <ul className="list-inline stat-counters" data-global-stats-container="">
                                                <li>Aktif Kriptopara : <strong><a href="#"><span data-global-stats-cryptocurrencies="">{this.state.GlobalResponse[GlobaMarketlApiDataProperties.active_cryptocurrencies]}</span></a></strong></li>
                                                <li><span className="icon-bullet">•</span> Borsa Sayısı : <strong><a href="#"><span data-global-stats-markets="">{this.state.GlobalResponse[GlobaMarketlApiDataProperties.active_markets]}</span></a></strong></li>
                                            <li><span className="icon-bullet">•</span> Market Kapasitesi : <strong><a href="#"><span data-global-stats-market-cap="" data-global-currency-market-cap="">{this.getPriceFormat(this.state.GlobalResponse[GlobaMarketlApiDataProperties.quotes][this.state.SelectedCurrency][GlobaMarketlApiDataProperties.quotes_total_market_cap])}</span></a></strong></li>
                                                <li><span className="icon-bullet">•</span> 24 Saatlik Pazar Hacmi : <strong><a href="#"><span data-global-stats-volume="" data-global-currency-volume="">{this.getPriceFormat(this.state.GlobalResponse[GlobaMarketlApiDataProperties.quotes][this.state.SelectedCurrency][GlobaMarketlApiDataProperties.quotes_total_volume_24h])}</span></a></strong></li>
                                                <li><span className="icon-bullet">•</span> BTC Payı : <strong><a href="#"><span data-global-stats-btc-dominance="">{this.state.GlobalResponse[GlobaMarketlApiDataProperties.bitcoin_percentage_of_market_cap]}</span>%</a></strong></li>
                                            </ul>
                                        </div>
                                        <div className="pull-right dropdowns-col col-md-1">
                                            <div >

                                                <CurrencySelector id="currency-selector-headindukator" Table="true" classNameName="currency-selector" onChange={this.onSelectedCurrencyChange} value={this.state.SelectedCurrency} />
                                            </div>


                                        </div>
                                    </div>
                                </div>

                        </div>
                        ) :
                        (<div></div>);
        return (<div className="col-md-12"  Style={this.props.Style}>  {element} </div>);
        }
    }

  export default HeadIndukator;