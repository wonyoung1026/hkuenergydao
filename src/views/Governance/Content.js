import React, { Component, useState, useEffect } from "react"
import StakeColumn from './StakeColumn.js'
import RedeemColumn from './RedeemColumn.js'

const stakerAddress = process.env.REACT_APP_STAKER_CONTRACT_ADDRESS;
const stakerAddressPolygonscanLink = "https://cardona-zkevm.polygonscan.com/address/" + stakerAddress

const kwhTokenAddress = process.env.REACT_APP_KWH_TOKEN_CONTRACT_ADDRESS
const kwhTokenPolygonscanLink = "https://cardona-zkevm.polygonscan.com/token/" + kwhTokenAddress

const enerTokenAddress = process.env.REACT_APP_ENER_TOKEN_CONTRACT_ADDRESS
const enerTokenPolygonscanLink = "https://cardona-zkevm.polygonscan.com/token/" + enerTokenAddress

function Content() {
    return (
        <div className="container content">
            <div className="row">
                <StakeColumn />
                <RedeemColumn />
            </div>
            <div className="row" style={{ minHeight: '100px' }}></div>
            <i>
                <div className="row">
                    <div className="col-sm-2">
                        <h6>Contract</h6>
                    </div>
                    <div className="col-sm-2">
                        <a href={stakerAddressPolygonscanLink}>{stakerAddress}</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                        <h6>KWH Token</h6>
                    </div>
                    <div className="col-sm-2">
                        <a href={kwhTokenPolygonscanLink}>{kwhTokenAddress}</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                        <h6>ENER Token</h6>
                    </div>
                    <div className="col-sm-2">
                        <a href={enerTokenPolygonscanLink}>{enerTokenAddress}</a>
                    </div>
                </div>
            </i>
        </div>
    );
}

export default Content;