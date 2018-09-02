import React, { Component } from 'react';
import './Banner.css';
import CurrencyConverter from '../CurrencyConverter/CurrencyConverter';
import bannerImg from '../../assests/images/banner.jpg';
class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
      }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
            return (
                <div className="banner col-md-12"  >
                    <img className="col-md-12" src={bannerImg} height="100%" width="100%;"></img>
                    <span className="bannerHeaber">COIN MARKET</span>
                    <CurrencyConverter className="col-md-5 converter"/>
                </div>
            );
        }

    }

  export default Banner;