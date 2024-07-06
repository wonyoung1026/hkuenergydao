import React, { Component, useState, useEffect } from "react"
import StakeColumn from './StakeColumn.js'
import RedeemColumn from './RedeemColumn.js'


  
function Content() {
    return (
        <div className="container content">
            <div className="row">
                <StakeColumn />
                <RedeemColumn />
            </div>
        </div>
    );
}

export default Content;