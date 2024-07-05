import React, { Component, useState, useEffect } from "react"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


import { ethers, BrowserProvider } from 'ethers';

import Staker from "../../contracts/Staker.sol/Staker.json";

// TODO: contract address hard coded for now
const stakerAddress = "0x5459278815CEFB554919E16646D201Db10ffD7cd";
console.log(stakerAddress, "Staker ABI: ", Staker.abi);

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  
function Content() {
    const { ethereum } = window;
    const provider = new BrowserProvider(ethereum);
    const [signer, setSigner] = useState()

    const [connectedAddress, setConnectedAddress] = useState()

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
    
    const [isHover, setIsHover] = useState();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    async function connect() {
        try {
            let signer  = await provider.getSigner();
            setSigner(signer);
            let address = await signer.getAddress();
            setConnectedAddress(address);
        } catch (err) {
            console.warn("failed to connect..", err);
        }
      }

    const fetchApy = async () => {
        try {
            if (typeof window.ethereum !== "undefined") {;
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
    const fetchEnerStaked = async () => {
        try {
            if (typeof window.ethereum !== "undefined") {;
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
            if (typeof window.ethereum !== "undefined") {;
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
            if (typeof window.ethereum !== "undefined") {;
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
            if (typeof window.ethereum !== "undefined") {;
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
        // calculatePctStaked();
        // calculateEstimatedStakingReward();
        
        fetchTotalEnerStaked();
        // fetchWithdrawalDeadline();
        // checkIfDeadlinePassed(); --> then switch button to "Redeem ENER token"



    }, [connectedAddress]);
    return (
        <div>
            
            <div className="modal">
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                </Modal>
            </div>
            <div className="container content">
                <div className="row">
                    <div className="col-sm-4 talk">
                        <h3>Stake</h3>
                        <div style={{minHeight: "250px"}}>
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
                                )  || (
                                    <p>Loading APY...</p>
                                )
                            }
                            <br/>
                            {
                                !isLoadingEnerStaked && (
                                    <div className="row">
                                        <div onMouseOver={handleOpen} className="col-sm-4">
                                            <h6>Staked (ENER)</h6>
                                        </div>
                                        <div className="col-sm-4">
                                            {enerStaked}
                                        </div>
                                    </div>
                                )  || (
                                    <p>Loading amount of ENER staked...</p>
                                )
                            }
                            <br/>
                            {
                                !isLoadingEnerStaked && (
                                    <div className="row">
                                        <div onMouseOver={handleOpen} className="col-sm-4">
                                            <h6>Expected Staking Reward (ENER)</h6>
                                        </div>
                                        <div className="col-sm-4">
                                            {enerStakingReward}
                                        </div>
                                    </div>
                                )  || (
                                    <p>Loading expected ENER staking reward...</p>
                                )
                            }
                        </div>
                        <Button
                            className="btn btn-dark start start-two"
                            variant="contained"
                        >
                            {"Stake"}
                        </Button>
                    </div>

                    <div className="col-sm-4 talk">
                        <h3>Redeem</h3>
                        <br/>
                        <div style={{minHeight: "100px"}}>
                            {/* Count : {count} */}
                        </div>
                        <Button
                            className="btn btn-dark start start-two"
                            // onClick={incrementCounter}
                            variant="contained"
                            // disabled={isLoading}
                        >
                            {/* {isLoading ? "Loading..." : "Redeem"} */}
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Content;