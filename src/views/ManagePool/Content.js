import React, { useState, useEffect } from "react"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { ethers, BrowserProvider } from 'ethers';

import Staker from "../../contracts/Staker.sol/Staker.json";

const stakerAddress = process.env.REACT_APP_STAKER_CONTRACT_ADDRESS;

function Content() {
    const { ethereum } = window;
    const provider = new BrowserProvider(ethereum);
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
                ;
                const contract = new ethers.Contract(stakerAddress, Staker.abi, provider);
                setIsLoadingEnerTokenStakingRewardPoolBalance(true);
                const enerTokenStakingRewardPoolBalance = await contract.governanceTokenStakingRewardPool();
                setEnerTokenStakingRewardPoolBalance(parseInt(enerTokenStakingRewardPoolBalance));
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
                const kwhTokenRewardPoolBalance = await contract.utilityTokenRewardPoolBalance();
                setKwhTokenRewardPoolBalance(parseInt(kwhTokenRewardPoolBalance));
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
                await contract.distributeUtilityTokenReward(
                    kwhDistributionPoolInput
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
                await contract.addGovernmentTokenReward(
                    enerRewardPoolInput
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