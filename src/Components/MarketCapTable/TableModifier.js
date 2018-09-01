import React, { Component } from 'react';
import CurrencySelector from './../CurrencySelector/CurrencySelector';

class TableModifier extends React.Component {
    constructor(props) {
        super(props);
        this.state  = {limit:20, start:0, currency: "USD" , firstFiveCoin : null};


      }

    componentDidMount() {
    }

    componentWillUnmount() {
    }



    render() {



        return (
            <div>
                <div className="form-group col-md-4">
                    <label htmlFor="limit" className="col-md-6">Coin Sayısı : </label>
                    <input type="number" max="100" id="limit" value={this.props.limit} className="col-md-6" onChange={this.props.onLimitChange}/>
                </div>
                <div className="form-group col-md-4">
                      <label htmlFor="star" className="col-md-6">Başlangıç Rankı : </label>
                    <input type="number" id="start" value={this.props.start}  className="col-md-6" onChange={this.props.onStartChange} />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="currency-selector-table" className="col-md-6">Tablo Kuru : </label>
                     <CurrencySelector id="currency-selector-table" className="col-md-6" onChange={this.props.onCurrencyChange} value={this.props.currency}  Table="true"/>
                </div>


            </div>
        );
        }
    }

  export default TableModifier;