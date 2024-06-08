import React, { Component, useState, useEffect } from "react"
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { ethers } from "ethers";

import Header from '../../components/Header/Header';
import Content from './Content';
import Footer from '../../components/Footer/Footer';

import Counter from "../../contracts/Counter.sol/Counter.json";

const counterAddress = "0x9e012f66e653E486C23fF62e9890c289Ed459730";
console.log(counterAddress, "Counter ABI: ", Counter.abi);

function CounterTest() {
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
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275, marginTop: 20 }}>
          <CardContent>
            <p>Count: {count}</p>
            <Button
              onClick={incrementCounter}
              variant="outlined"
              disabled={isLoading}
            >
              {isLoading ? "loading..." : "+1"}
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }
  

class Governance extends Component {
  render() {
        return (
            <div className="main-container">
                <Header />
                <Content />
                <CounterTest />
                <Footer />
            </div>

        )
    }
}

export default Governance;