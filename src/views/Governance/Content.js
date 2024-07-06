import React, { Component, useState, useEffect } from "react"
import StakeColumn from './StakeColumn.js'
import RedeemColumn from './RedeemColumn.js'

const stakerAddress = process.env.REACT_APP_STAKER_CONTRACT_ADDRESS;
const polygonscanLink = "https://cardona-zkevm.polygonscan.com/address/" + stakerAddress
function Content() {
    return (
        <div className="container content">
            <div className="row">
                <StakeColumn />
                <RedeemColumn />
            </div>
            <div className="row" style={{minHeight: '100px'}}></div>
            <div className="row">
                    <i>Contract : <a href={polygonscanLink}>{stakerAddress}</a></i>
            </div>
        </div>
    );
}

export default Content;