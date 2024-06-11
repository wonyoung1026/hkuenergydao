import { useSDK } from "@metamask/sdk-react";
import React, { useState } from "react";

function Nav() {
    const { sdk, connected, connecting, provider, chainId } = useSDK();

    const [account, setAccount] = useState();

    const connect = async () => {  
      try {
        const accounts = await sdk?.connect();
        const truncatedAccount = accounts?.[0].slice(0,10);
        setAccount(truncatedAccount);
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
    // Force connect on launch
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
                        
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="/generation-stats">
                                Generation Stats
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/contact-us">Contact us</a>
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