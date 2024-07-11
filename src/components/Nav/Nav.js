import { useSDK } from "@metamask/sdk-react";
import React, { useState, useEffect } from "react";


import Staker from "../../contracts/Staker.sol/Staker.json";

import { ethers, BrowserProvider } from 'ethers';

const stakerAddress = process.env.REACT_APP_STAKER_CONTRACT_ADDRESS;

function Nav() {
    const { sdk, connected, connecting, _, chainId } = useSDK();
    const { ethereum } = window;
    const provider = new BrowserProvider(ethereum);

    const [account, setAccount] = useState();
    const [accountIsAdmin, setAccountIsAdmin] = useState();

    const connect = async () => {  
      try {
        const accounts = await sdk?.connect();
        if (accounts && accounts.length > 0) {
          const mainAccount = accounts[0];
          const truncatedAccount = mainAccount.slice(0,10);
          setAccount(truncatedAccount);
          const isadm = await isAdmin(mainAccount);
          setAccountIsAdmin(isadm);
        }  else {
          console.warn("No account found..");
        }
      } catch (err) {
        console.warn("failed to connect..", err);
      }
    };
    const disconnect = async () => {
      try {
          sdk?.terminate();
    
      } catch (err) {
          console.warn("failed to terminated..", err)
      }
    };

    async function isAdmin(walletAddress) {
      // ethers.js에 define 되어 있음
      if (typeof window.ethereum !== "undefined") {
        const contract = new ethers.Contract(
          stakerAddress,
          Staker.abi,
          provider
        );
        try {
          return await contract.isAdmin(walletAddress);
        } catch (err) {
          console.warn(err);
          alert(
            "Switch your MetaMask network to Polygon zkEVM cardona testnet and refresh this page...", err
          );
        }
      }
    }
    // TODO: Force connect on launch for now. 
    connect();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light static-top header-a">
            <div className="container nav-container">
                <a className="navbar-brand brand" href="#">ENER DAO</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse alink" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="/governance">
                                Governance
                            </a>
                        </li>
                        {
                          accountIsAdmin && (
                            <li className="nav-item dropdown">
                                <a className="nav-link" href="/manage-pool">
                                    Manage Reward Pool
                                </a>
                            </li>
                          )
                        }
                        

                        <li className="nav-item dropdown">
                            <a className="nav-link" href="/generation-stats">
                                Generation Stats
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/contact-us">Contact Us</a>
                        </li>


                      {connected && (
                            <li className="nav-item dropdown">
                                <a className="btn btn-outline-secondary" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  {account && `Account: ${account}`}<br></br>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                  <a className="dropdown-item" href="#" onClick={connect} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Reconnect</a>
                                  <a className="dropdown-item" href="#" onClick={disconnect} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Disconnect</a>
                                </div>
                            </li>
                        ) ||                         
                        <li className="nav-item">
                          <a className="btn btn-outline-secondary" href="#" onClick={connect} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Connect Wallet
                          </a>
                        </li>
                      }
                    </ul>


                </div>


            </div>
        </nav>
    );
}

export default Nav;