/* global BigInt */
import React, { Component, useState, useEffect } from "react"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


import { ethers, BrowserProvider } from 'ethers';

import Staker from "../../contracts/Staker.sol/Staker.json";
import EnerToken from "../../contracts/Ener.sol/EnerToken.json";

import { ModalStyle } from "./Common.js"

const stakerAddress = process.env.REACT_APP_STAKER_CONTRACT_ADDRESS;
const enerTokenAddress = process.env.REACT_APP_ENER_TOKEN_CONTRACT_ADDRESS;


const { ethereum } = window;
const provider = new BrowserProvider(ethereum);
const signer = await provider.getSigner();

const enerTokenContract = new ethers.Contract(enerTokenAddress, EnerToken.abi, signer);
const enerTokenDecimals = parseInt(await enerTokenContract.decimals());

function Content() {
    const [connectedAddress, setConnectedAddress] = useState();

    const [enerStaked, setEnerStaked] = useState();
    const [isLoadingEnerStaked, setIsLoadingEnerStaked] = useState(false);

    const [enerStakingReward, setEnerStakingReward] = useState();
    const [isLoadingEnerStakingReward, setIsLoadingEnerStakingReward] = useState(false);

    const [expectedReturnOpen, setExpectedReturnOpen] = React.useState(false);
    const expectedReturnHandleOpen = () => setExpectedReturnOpen(true);
    const expectedReturnHandleClose = () => setExpectedReturnOpen(false);

    async function connect() {
        try {
            let address = await signer.getAddress();
            setConnectedAddress(address);
        } catch (err) {
            console.warn("failed to connect..", err);
        }
    }

    const [apy, setApy] = useState();
    const [isLoadingApy, setIsLoadingApy] = useState(false);
    const fetchApy = async () => {
        try {
            if (typeof window.ethereum !== "undefined") {
                ;
                const contract = new ethers.Contract(stakerAddress, Staker.abi, provider);
                setIsLoadingApy(true);
                const stakingRewardRate = await contract.stakingRewardRate();
                setApy(parseInt(stakingRewardRate));
                setIsLoadingApy(false);
            }
        } catch (err) {
            console.error(err);
        }
    };


    const [stakingPeriod, setStakingPeriod] = useState(); // in days
    const [isLoadingStakingPeriod, setIsLoadingStakingPeriod] = useState(false);

    const fetchStakingPeriod = async () => {
        try {
            if (typeof window.ethereum !== "undefined") {
                ;
                const contract = new ethers.Contract(stakerAddress, Staker.abi, provider);
                setIsLoadingStakingPeriod(true);
                const stakingPeriodTs = await contract.lockDuration();
                const stakingPeriodInDays = parseInt(stakingPeriodTs) / 24 / 60 / 60; // e.g.stakingPeriod 86400s -> 24 hours -> 1 day
                setStakingPeriod(stakingPeriodInDays); 
                setIsLoadingStakingPeriod(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const [depositTime, setDepositTime] = useState(); // in days
    const [isLoadingDepositTime, setIsLoadingDepositTime] = useState(false);

    const fetchDespositTime = async () => {
        try {
            if (typeof window.ethereum !== "undefined") {
                ;
                const contract = new ethers.Contract(stakerAddress, Staker.abi, provider);
                setIsLoadingDepositTime(true);
                const despositTs = await contract.depositTimestamps(connectedAddress);
                const depositDate = new Date(parseInt(despositTs) * 1000);
                setDepositTime(depositDate); 
                setIsLoadingDepositTime(false);
            }
        } catch (err) {
            console.error(err);
        }
    };


    const fetchEnerStaked = async () => {
        try {
            if (typeof window.ethereum !== "undefined") {
                ;
                const contract = new ethers.Contract(stakerAddress, Staker.abi, provider);
                setIsLoadingEnerStaked(true);
                const enerStaked = parseInt(await contract.balances(connectedAddress));
                const adjustedEnerStaked = enerStaked / Math.pow(10, enerTokenDecimals);

                setEnerStaked(adjustedEnerStaked.toString());
                setIsLoadingEnerStaked(false);
            }
        } catch (err) {
            console.error(err);
        }
    };
    const fetchEnerStakingReward = async () => {
        try {
            if (typeof window.ethereum !== "undefined") {
                const contract = new ethers.Contract(stakerAddress, Staker.abi, provider);
                setIsLoadingEnerStakingReward(true);
                const enerStakingReward = await contract.calculateGovernanceTokenStakingReward(connectedAddress);
                const adjustedEnerStakingReward = parseInt(enerStakingReward) / Math.pow(10, enerTokenDecimals);
                setEnerStakingReward(adjustedEnerStakingReward.toString());
                setIsLoadingEnerStakingReward(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const [isReadyForStakingRewardWithdrawal, setIsReadyForStakingRewardWithdrawal] = useState(false);
    const checkIfReadyForStakingRewardWithdrawal = async () => {
        try {
            if (depositTime) {
                var withdrawalDeadline = depositTime;
                withdrawalDeadline.setSeconds(withdrawalDeadline.getSeconds() + stakingPeriod);
                setIsReadyForStakingRewardWithdrawal(Date.now() > withdrawalDeadline);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const [isLoadingWithdrawEnerToken, setIsLoadingWithdrawEnerToken] = useState(false);

    const withdrawEnerToken = async () => {
        try {
            if (typeof window.ethereum !== "undefined") {
                const contract = new ethers.Contract(stakerAddress, Staker.abi, signer);
                setIsLoadingWithdrawEnerToken(true);
                await contract.withdrawGovernanceToken();
                setIsLoadingWithdrawEnerToken(false);
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        }
    }

    const [isLoadingStakeEnerToken, setIsLoadingStakeEnerToken] = useState(false);

    const stakeEnerToken = async () => {
        try {
            if (typeof window.ethereum !== "undefined") {
                const contract = new ethers.Contract(stakerAddress, Staker.abi, signer);
                setIsLoadingStakeEnerToken(true);
                const adjustedEnerStakeInput = parseFloat(enerStakeInput) * Math.pow(10, enerTokenDecimals)
                await enerTokenContract.approve(
                    stakerAddress, adjustedEnerStakeInput.toString()
                );
                await contract.stake(
                    adjustedEnerStakeInput.toString()
                );
                setIsLoadingStakeEnerToken(false);
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        }
    }

    const [enerStakeInput, setEnerStakeInput] = useState('');
    const handleEnerStakeInputChange = event => {
        setEnerStakeInput(event.target.value);
    };

    useEffect(() => {
        // get signer and address
        connect();

        // Stake section
        fetchApy();
        fetchStakingPeriod();
        fetchDespositTime();
        fetchEnerStaked();
        fetchEnerStakingReward();

        
        checkIfReadyForStakingRewardWithdrawal();

    }, [connectedAddress]);
    return (
        <div className="col-sm-6 talk">
            <div className="modal">
                <Modal
                    open={expectedReturnOpen}
                    onClose={expectedReturnHandleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={ModalStyle}>
                        <Typography id="modal-modal-title" variant="h6">
                            <b>Expected Return (ENER)</b>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            "Expected Return (ENER)" = (1 + APY%) * "Staked (ENER)" 
                            <br />
                            <br />
                            <i>Note that stake reward will only be given if the user keeps ENER token staked for at least the duration specified in "Staking Period (days)"</i>
                        </Typography>
                    </Box>
                </Modal>
            </div>
            <div >
                <h3>Locked Staking</h3>
                <div style={{ minHeight: "250px" }}>
                    <br />
                    {
                        !isLoadingApy && (
                            <div className="row">
                                <div className="col-sm-4">
                                    <h6>APY</h6>
                                </div>
                                <div className="col-sm-4">
                                    {apy} %
                                </div>
                            </div>
                        ) || (
                            <p>Loading APY...</p>
                        )
                    }
                    <br />
                    {
                        !isLoadingStakingPeriod && (
                            <div className="row">
                                <div className="col-sm-4">
                                    <h6>Staking Period (days)</h6>
                                </div>
                                <div className="col-sm-4">
                                    {stakingPeriod}
                                </div>
                            </div>
                        ) || (
                            <p>Loading Staking Period...</p>
                        )
                    }
                    <br />
                    {
                        !isLoadingDepositTime && (
                            <div className="row">
                                <div className="col-sm-4">
                                    <h6>Deposit Time</h6>
                                </div>
                                <div className="col-sm-4">
                                    {depositTime && (depositTime.toString())}
                                </div>
                            </div>
                        ) || (
                            <p>Loading Staking Period...</p>
                        )
                    }
                    <br />
                    {
                        !isLoadingEnerStaked && (
                            <div className="row">
                                <div className="col-sm-4">
                                    <h6>
                                        Staked (ENER)
                                    </h6>
                                </div>
                                <div className="col-sm-4">
                                    {enerStaked}
                                </div>
                            </div>
                        ) || (
                            <p>Loading amount of ENER staked...</p>
                        )
                    }
                    <br />
                    {
                        !isLoadingEnerStaked && (
                            <div className="row">
                                <div className="col-sm-4">
                                    <h6>
                                        Expected Return (ENER)
                                        <i onClick={expectedReturnHandleOpen} class="fas fa-question-circle" style={{ cursor: "pointer" }}></i>
                                    </h6>
                                </div>
                                <div className="col-sm-4">
                                    {enerStakingReward}
                                </div>
                            </div>
                        ) || (
                            <p>Loading expected ENER staking reward...</p>
                        )
                    }
                </div>
                <br></br>
                {
                    enerStaked <= 0 && (
                        // If no ener token staked yet. 
                        <div className="row">
                            <TextField 
                                label="ENER" 
                                type="number" 
                                value= {enerStakeInput}
                                onChange= {handleEnerStakeInputChange}    
                            />
                            <Button
                                className="btn btn-dark start start-two"
                                variant="contained"
                                onClick={stakeEnerToken}
                                disabled={isLoadingStakeEnerToken}
                            >
                                {"Stake ENER!"}
                            </Button>
                        </div>
                    ) || (
                        <div className="row">
                            <Button
                                className="btn btn-dark start start-two"
                                variant="contained"
                                onClick={withdrawEnerToken}
                                disabled={isLoadingWithdrawEnerToken}
                            >
                                {
                                    isReadyForStakingRewardWithdrawal && (
                                        // If deadline passed
                                        "Withdraw ENER!"
                                    ) || (
                                        // If deadline has not passed
                                        "Cancel Staking"
                                    )
                                }

                            </Button>
                        </div>

                    )

                }
            </div>
        </div>

    );
}

export default Content;