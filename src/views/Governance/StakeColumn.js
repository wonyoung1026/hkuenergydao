import React, { Component, useState, useEffect } from "react"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


import { ethers, BrowserProvider } from 'ethers';

import Staker from "../../contracts/Staker.sol/Staker.json";
import {ModalStyle} from "./Common.js"
import { pointer } from "@testing-library/user-event/dist/cjs/pointer/index.js";

const stakerAddress = process.env.REACT_APP_STAKER_CONTRACT_ADDRESS;


function Content() {
    const { ethereum } = window;
    const provider = new BrowserProvider(ethereum);
    const [signer, setSigner] = useState();

    const [connectedAddress, setConnectedAddress] = useState();

    const [apy, setApy] = useState();
    const [isLoadingApy, setIsLoadingApy] = useState(false);

    const [enerStaked, setEnerStaked] = useState();
    const [isLoadingEnerStaked, setIsLoadingEnerStaked] = useState(false);

    const [enerStakingReward, setEnerStakingReward] = useState();
    const [isLoadingEnerStakingReward, setIsLoadingEnerStakingReward] = useState(false);



    const [totalEnerStaked, setTotalEnerStaked] = useState();
    const [isLoadingTotalEnerStaked, setIsLoadingTotalEnerStaked] = useState(false);

    const [stakingRewardPool, setStakingRewardPool] = useState();
    const [isLoadingStakingRewardPool, setIsLoadingStakingRewardPool] = useState(false);

    const [stakingPeriod, setStakingPeriod] = useState(); // in days
    const [isLoadingStakingPeriod, setIsLoadingStakingPeriod] = useState(false);


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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


    const fetchEnerStaked = async () => {
        try {
            if (typeof window.ethereum !== "undefined") {
                ;
                const contract = new ethers.Contract(stakerAddress, Staker.abi, provider);
                setIsLoadingEnerStaked(true);
                const enerStaked = await contract.balances(connectedAddress);
                setEnerStaked(parseInt(enerStaked));
                setIsLoadingEnerStaked(false);
            }
        } catch (err) {
            console.error(err);
        }
    };
    const fetchEnerStakingReward = async () => {
        try {
            if (typeof window.ethereum !== "undefined") {
                ;
                const contract = new ethers.Contract(stakerAddress, Staker.abi, provider);
                setIsLoadingEnerStakingReward(true);
                const enerStakingReward = await contract.calculateGovernanceTokenStakingReward(connectedAddress);
                setEnerStakingReward(parseInt(enerStakingReward));
                setIsLoadingEnerStakingReward(false);
            }
        } catch (err) {
            console.error(err);
        }
    };
    const fetch = async () => {
        try {
            if (typeof window.ethereum !== "undefined") {
                ;
                const contract = new ethers.Contract(stakerAddress, Staker.abi, provider);
                setIsLoadingEnerStakingReward(true);
                const enerStakingReward = await contract.calculateGovernanceTokenStakingReward(connectedAddress);
                setEnerStakingReward(parseInt(enerStakingReward));
                setIsLoadingEnerStakingReward(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const fetchTotalEnerStaked = async () => {
        try {
            if (typeof window.ethereum !== "undefined") {
                ;
                const contract = new ethers.Contract(stakerAddress, Staker.abi, provider);
                setIsLoadingTotalEnerStaked(true);
                const totalStaked = await contract.totalStaked();
                setTotalEnerStaked(parseInt(totalStaked));
                setIsLoadingTotalEnerStaked(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        // get signer and address
        connect();

        // Stake section
        fetchApy();
        fetchEnerStaked();
        fetchEnerStakingReward();
        fetchTotalEnerStaked();
        fetchStakingPeriod();

    }, [connectedAddress]);
    return (
        <div className="col-sm-6 talk">
            <div className="modal">
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={ModalStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
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
                                        <i onClick={handleOpen} class="fas fa-question-circle" style={{ cursor: "pointer" }}></i>
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
                            <TextField label="ENER" type="number" />
                            <Button
                                className="btn btn-dark start start-two"
                                variant="contained"
                            >
                                {"Stake!"}
                            </Button>
                        </div>
                    ) || (
                        <div className="row">
                            <Button
                                className="btn btn-dark start start-two"
                                variant="contained"
                            >
                                {
                                    true && (
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