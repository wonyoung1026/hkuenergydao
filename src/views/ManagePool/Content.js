import React, { useState, useEffect } from "react"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { ethers, BrowserProvider } from 'ethers';

import Staker from "../../contracts/Staker.sol/Staker.json";
import EnerToken from "../../contracts/Ener.sol/EnerToken.json";
import UtilToken from "../../contracts/Kwh.sol/UtilToken.json";

const stakerAddress = process.env.REACT_APP_STAKER_CONTRACT_ADDRESS;
const enerTokenAddress = process.env.REACT_APP_ENER_TOKEN_CONTRACT_ADDRESS;
const kwhTokenAddress = process.env.REACT_APP_KWH_TOKEN_CONTRACT_ADDRESS;


const { ethereum } = window;
const provider = new BrowserProvider(ethereum);

const enerTokenContract = new ethers.Contract(enerTokenAddress, EnerToken.abi, provider);
const enerTokenDecimals = parseInt(await enerTokenContract.decimals());

const kwhTokenContract = new ethers.Contract(kwhTokenAddress, UtilToken.abi, provider);
const kwhTokenDecimals = parseInt(await kwhTokenContract.decimals());




function Content() {
    const [signer, setSigner] = useState();
    const [connectedAddress, setConnectedAddress] = useState();
    
    async function connect() {
        try {
            let signer = await provider.getSigner();
            setSigner(signer);
            let address = await signer.getAddress();
            setConnectedAddress(address);
        } catch (err) {
            console.warn("failed to connect..", err);
        }
    }

    const [enerTokenStakingRewardPoolBalance, setEnerTokenStakingRewardPoolBalance] = useState();
    const [isLoadingEnerTokenStakingRewardPoolBalance, setIsLoadingEnerTokenStakingRewardPoolBalance] = useState(false);
    
    const fetchEnerTokenStakingRewardPoolBalance = async () => {
        try {
            if (typeof window.ethereum !== "undefined") {
                const contract = new ethers.Contract(stakerAddress, Staker.abi, provider);
                setIsLoadingEnerTokenStakingRewardPoolBalance(true);
                const enerTokenStakingRewardPoolBalance = parseInt(await contract.governanceTokenStakingRewardPool());
                const adjustedEnerTokenStakingRewardPoolBalance = enerTokenStakingRewardPoolBalance  / Math.pow(10, enerTokenDecimals);
                setEnerTokenStakingRewardPoolBalance(adjustedEnerTokenStakingRewardPoolBalance.toString());
                setIsLoadingEnerTokenStakingRewardPoolBalance(false);
            }
        } catch (err) {
            console.error(err);
        }
    };


    const [kwhTokenRewardPoolBalance, setKwhTokenRewardPoolBalance] = useState();
    const [isLoadingKwhTokenRewardPoolBalance, setIsLoadingKwhTokenRewardPoolBalance] = useState(false);

    const fetchKwhTokenRewardPoolBalance = async () => {
        try {
            if (typeof window.ethereum !== "undefined") {
                ;
                const contract = new ethers.Contract(stakerAddress, Staker.abi, provider);
                setIsLoadingKwhTokenRewardPoolBalance(true);
                const kwhTokenRewardPoolBalance = parseInt(await contract.utilityTokenRewardPoolBalance());
                var adjustedKwhTokenRewardPoolBalance = kwhTokenRewardPoolBalance / Math.pow(10, kwhTokenDecimals);
                setKwhTokenRewardPoolBalance(adjustedKwhTokenRewardPoolBalance.toString());
                setIsLoadingKwhTokenRewardPoolBalance(false);
            }
        } catch (err) {
            console.error(err);
        }
    };


    const [kwhDistributionPoolInput, setKwhDistributionPoolInput] = useState('');
    const handleKwhDistributionPoolInputChange = event => {
        setKwhDistributionPoolInput(event.target.value);
    };

    const [isLoadingDistributeKwhToken, setIsLoadingDistributeKwhToken] = useState(false);

    const distributeKwhToken = async () => {
        try {
            if (typeof window.ethereum !== "undefined") {
                const contract = new ethers.Contract(stakerAddress, Staker.abi, signer);
                setIsLoadingDistributeKwhToken(true);
                var adjustedKwhDistributionPoolInput = parseFloat(kwhDistributionPoolInput) * Math.pow(10, kwhTokenDecimals)
                await contract.distributeUtilityTokenReward(
                    adjustedKwhDistributionPoolInput.toString()
                );
                setIsLoadingDistributeKwhToken(false);
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        }
    }


    const [enerRewardPoolInput, setEnerRewardPoolInput] = useState('');
    const handleEnerRewardPoolInputChange = event => {
        setEnerRewardPoolInput(event.target.value);
    };

    const [isLoadingAddEnerStakingRewardPool, setIsLoadingAddEnerStakingRewardPool] = useState(false);

    const addEnerStakingRewardPool = async () => {
        try {
            if (typeof window.ethereum !== "undefined") {
                const contract = new ethers.Contract(stakerAddress, Staker.abi, signer);
                setIsLoadingAddEnerStakingRewardPool(true);
                var adjustedEnerRewardPoolInput = parseFloat(enerRewardPoolInput) * Math.pow(10, enerTokenDecimals)
                await contract.addGovernmentTokenReward(
                    adjustedEnerRewardPoolInput.toString()
                );
                setIsLoadingAddEnerStakingRewardPool(false);
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        }
    }



    useEffect(() => {
        // get signer and address
        connect();
        
        fetchEnerTokenStakingRewardPoolBalance();
        fetchKwhTokenRewardPoolBalance();
    }, [connectedAddress]);

    return (
        <div className="container content">
            <div className="col-sm-6 talk" >
                <h3>ENER Staking Reward Pool</h3>
                <div style={{ minHeight: '100px' }}>
                    <br />
                    {
                        !isLoadingEnerTokenStakingRewardPoolBalance && (
                            <div className="row">
                                <div className="col-sm-4">
                                    <h6>Staking Reward Pool Balance (ENER)</h6>
                                </div>
                                <div className="col-sm-4">
                                    {enerTokenStakingRewardPoolBalance}
                                </div>
                            </div>
                        ) || (
                            <p>Loading ENER token staking reward pool...</p>
                        )
                    }
                </div>
                <div className="row">
                    <TextField 
                        label="ENER" 
                        type="number" 
                        value= {enerRewardPoolInput}
                        onChange= {handleEnerRewardPoolInputChange}    
                    />
                    <Button
                        className="btn btn-dark start start-two"
                        variant="contained"
                        onClick={addEnerStakingRewardPool}
                        disabled={isLoadingAddEnerStakingRewardPool}
                    >
                        {"Add ENER!"}
                    </Button>

                </div>

            </div>
            <br></br>
            <br></br>
            <div className="col-sm-6 talk">
                <h3>KWH Token Distribution Pool</h3>
                <div style={{ minHeight: '100px' }}>
                    <br />
                    {
                        !isLoadingKwhTokenRewardPoolBalance && (
                            <div className="row">
                                <div className="col-sm-4">
                                    <h6>Utility Token Distribution Pool Balance (KWH)</h6>
                                </div>
                                <div className="col-sm-4">
                                    {kwhTokenRewardPoolBalance}
                                </div>
                            </div>
                        ) || (
                            <p>Loading KWH token distribution pool...</p>
                        )
                    }
                </div>
                <br />
                <div className="row">
                    <TextField 
                        label="KWH" 
                        type="number" 
                        value= {kwhDistributionPoolInput}
                        onChange= {handleKwhDistributionPoolInputChange}    
                    />
                    <Button
                        className="btn btn-dark start start-two"
                        variant="contained"
                        onClick={distributeKwhToken}
                        disabled={isLoadingDistributeKwhToken}
                    >
                        {"Distribute KWH!"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Content;