import React, { Component, useState, useEffect } from "react"
import Button from "@mui/material/Button";

import { ethers } from "ethers";

import Counter from "../../contracts/Counter.sol/Counter.json";

const counterAddress = "0x9e012f66e653E486C23fF62e9890c289Ed459730";
console.log(counterAddress, "Counter ABI: ", Counter.abi);

function Content() {
    const [count, setCount] = useState();
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
      // declare the data fetching function
      const fetchCount = async () => {
        const data = await readCounterValue();
        return data;
      };
      fetchCount().catch(console.error);
    }, []);
  
    async function readCounterValue() {
      // ethers.js에 define 되어 있음
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          counterAddress,
          Counter.abi,
          provider
        );
        try {
          const data = await contract.retrieve();
          setCount(parseInt(data.toString()));
        } catch (err) {
          alert(
            "Switch your MetaMask network to Polygon zkEVM cardona testnet and refresh this page!"
          );
        }
      }
    }
  
    async function requestAccount() {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    }
  
    async function updateCounter() {
      if (typeof window.ethereum !== "undefined") {
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log({ provider });
        const signer = provider.getSigner();
        const contract = new ethers.Contract(counterAddress, Counter.abi, signer);
        const transaction = await contract.increment();
        setIsLoading(true);
        await transaction.wait();
        setIsLoading(false);
        readCounterValue();
      }
    }
  
    const incrementCounter = async () => {
      await updateCounter();
    };
    
    return (
        <div>
            <div className="container content">
                <div className="row">
                    
                    <div className="col-sm-4 talk">
                        <h3>Vote</h3>
                        <br/>
                        <div style={{minHeight: "100px"}}>
                            
                        </div>
                        <Button
                            className="btn btn-dark start start-two"
                            variant="contained"
                        >
                            {"Vote"}
                        </Button>
                    </div>

                    <div className="col-sm-4 talk">
                        <h3>Redeem</h3>
                        <br/>
                        <div style={{minHeight: "100px"}}>
                            Count : {count}
                        </div>
                        <Button
                            className="btn btn-dark start start-two"
                            onClick={incrementCounter}
                            variant="contained"
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "Redeem"}
                        </Button>
                    </div>


                    <div className="col-sm-4 talk">
                        <h3>Stake</h3>
                        <br/>
                        <div style={{minHeight: "100px"}}>
                        </div>
                        <Button
                            className="btn btn-dark start start-two"
                            variant="contained"
                        >
                            {"Stake"}
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Content;