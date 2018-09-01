import React, { Component } from 'react';
import CoinApiDataProperties from './../../Utility/CoinApiDataProperties';
import './MarketCap.css';
import CurrencySelector from './../CurrencySelector/CurrencySelector';
import TableModifier from './TableModifier'

class MarketCapTable extends React.Component {
    constructor(props) {
        super(props);
        const currencies = require('./ConvertableCurrencies.json');
        this.state  = {coins:null,limit:20, start:1, currency: "USD" ,symbol:"$", currencies:currencies};

        this.currencySelectorOnChange = this.currencySelectorOnChange.bind(this);
        this.onLimitChange = this.onLimitChange.bind(this);
        this.onStartChange = this.onStartChange.bind(this);
        this.tick = this.tick.bind(this);
        this.getCurrencySymbol = this.getCurrencySymbol.bind(this);
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


        fetch("https://api.coinmarketcap.com/v2/ticker/?limit="+this.state.limit+"&start="+this.state.start+"&structure=array&convert="+this.state.currency)
        .then(response => response.json())
        .then(response => {  this.setState({ coins: response.data });});

    }

     getDate(unixTimeStamp){
        var d = new Date('1970-01-01 00:00:00');
        d.setSeconds(d.getSeconds() + unixTimeStamp);
        d.setHours(d.getHours() + 3 );

        var dateString = this.fillDateItem(d.getDate()) + '.'+
                         this.fillDateItem(parseInt(d.getMonth())+1) +'.' +
                         this.fillDateItem(d.getFullYear()) +' -- '+
                         this.fillDateItem(d.getHours()) + ':'+
                         this.fillDateItem(d.getMinutes()) +':'+
                         this.fillDateItem(d.getSeconds());
        return dateString;
    }
     fillDateItem(number){
        var result = parseInt(number);

        if(result>9)
            return result.toString();
        else
            return '0'+result.toString();
    }
    getPriceFormat(price){
        var priceString = price.toString();
        var symbol = this.getCurrencySymbol();
        var result ="";

        var counter = 0;
        for(var i = priceString.length-1; i>=0 ;i--){
            counter++;

            result = priceString[i]+result;
            if(counter%3===0 && i!==0)
                result = "."+result;
        }

        result = symbol +" "+ result;
        return result;
    }

    getCurrencySymbol(){
        return  (this.state.symbol !== null && this.state.symbol !== "")? this.state.symbol : this.state.currency;
    }

    findSymbol(){
        if( this.state.currencies === null ||  this.state.currencies === undefined ||  this.state.currency === null || this.state.currency === undefined)
        {
            this.setState({symbol : this.state.currency});
            return;
        }
        var currency = this.state.currency;
        var currencies = this.state.currencies;

        for(var i = 0 ; i<currencies.length;i++)
        {
            if(currencies[i].currency === currency){
                this.setState({symbol :  currencies[i].symbol});
                return;
            }

        }

        this.setState({symbol : this.state.currency});
    }
    currencySelectorOnChange(event){
        this.setState({currency :event.target.value},() => {this.findSymbol(); this.tick();});
    }
    onLimitChange(event){
        this.setState({limit :event.target.value},() => { this.tick();});
    }

    onStartChange(event){
        this.setState({start :event.target.value},() => { this.tick();});
    }

    render() {

        const t = this;
        function Row(props) {
            return (
                ( props.coin[CoinApiDataProperties.quotes][t.state.currency] !=null &&  props.coin[CoinApiDataProperties.quotes][t.state.currency] !==undefined)?(
                <tr>
                    <th scope="row" class="coin rank">
                        {props.coin[CoinApiDataProperties.rank]}
                    </th>
                    <td class="coin name">
                         <img src={"https://s2.coinmarketcap.com/static/img/coins/16x16/"+props.coin[CoinApiDataProperties.id]+".png"}  class="logo-sprite" alt="Bitcoin" height="16" width="16"/>
                        <span></span>    {props.coin[CoinApiDataProperties.nameProp]}
                    </td>
                    <td class="coin usd price">
                        {t.getCurrencySymbol() +" "+ props.coin[CoinApiDataProperties.quotes][t.state.currency].price}
                    </td>
                    <td class="coin usd market-cap">
                        {t.getPriceFormat(props.coin[CoinApiDataProperties.quotes][t.state.currency][CoinApiDataProperties.quotes_market_cap])}
                    </td>
                    <td class="coin usd circulating-supply">
                        {t.getPriceFormat(props.coin[CoinApiDataProperties.quotes][t.state.currency][CoinApiDataProperties.quotes_market_cap])}
                    </td>
                    <td class="coin usd 24h_change">
                        <span className={(props.coin[CoinApiDataProperties.quotes][t.state.currency][CoinApiDataProperties.quotes_percent_change_24h]>0)?"green":(props.coin[CoinApiDataProperties.quotes].USD[CoinApiDataProperties.quotes_percent_change_24h]<0)?"red":"black" }>{props.coin[CoinApiDataProperties.quotes].USD[CoinApiDataProperties.quotes_percent_change_24h]}%</span>
                    </td>
                    <td class="coin  last-updated">
                        { t.getDate(props.coin[CoinApiDataProperties.last_updated])}
                    </td>

                </tr>):(<tr></tr>)

            )
          }

        function CoinList() {

            const coins = t.state.coins;
            var rows;
            if(t.state.coins !=null)
                 rows= coins.map((coin) => <Row coin={coin} />);
            else
                 rows = "";

            return rows;
        }

        const element = ( this.state.coins !== null && this.state.coins !== undefined &&  this.state.coins.length>0) ? (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">
                            Rank
                        </th>
                        <th scope="col">
                            Coin Adı
                        </th>
                        <th scope="col">
                            Değeri
                        </th>
                        <th scope="col">
                            Market Kapasitesi
                        </th>
                        <th scope="col">
                            Dolaşımdaki Miktar
                        </th>
                        <th scope="col">
                            24 Saatilk Değişim
                        </th>
                        <th scope="col">
                            Son Güncellenme
                        </th>
                    </tr>
                </thead>
                <tbody>
                    < CoinList />
                </tbody>

            </table> ) :
        ( <div>
              Yükleniyor...
        </div>);



        return (
            <div>
            <TableModifier limit={this.state.limit} start={this.state.start} currency={this.state.currency} onCurrencyChange={this.currencySelectorOnChange}  onLimitChange={this.onLimitChange} onStartChange={this.onStartChange} />
              {element}

            </div>
        );
        }
    }

  export default MarketCapTable;