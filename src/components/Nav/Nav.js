import { useSDK } from "@metamask/sdk-react";
import React, { useState } from "react";


function Nav() {

    const [account, setAccount] = useState();
    const { sdk, connected, connecting, provider, chainId } = useSDK();
  
    const connect = async () => {
      try {
        const accounts = await sdk?.connect();
        setAccount(accounts?.[0]);
      } catch (err) {
        console.warn("failed to connect..", err);
      }
    };
  
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light static-top header-a">
            <div className="container nav-container">
                <a className="navbar-brand brand" href="#">Energy DAO</a>

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

                            <li className="nav-pills">
                              {account && `Connected account: ${account}`}
                              {chainId && `Connected chain: ${chainId}`}
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