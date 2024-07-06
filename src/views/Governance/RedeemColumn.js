import React, { Component, useState, useEffect } from "react"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


import { ethers, BrowserProvider } from 'ethers';

import Staker from "../../contracts/Staker.sol/Staker.json";
import { ModalStyle } from "./Common.js"
import { pointer } from "@testing-library/user-event/dist/cjs/pointer/index.js";

const stakerAddress = process.env.REACT_APP_STAKER_CONTRACT_ADDRESS;

function RedeemColumn() {
    const { ethereum } = window;
    const provider = new BrowserProvider(ethereum);
    const [signer, setSigner] = useState();

    const [connectedAddress, setConnectedAddress] = useState();

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
    

    const [expectedKwhTokenReward, setExpectedKwhTokenReward] = useState();
    const [isLoadingExpectedKwhTokenReward, setIsLoadingExpectedKwhTokenReward] = useState(false);

    const fetchExpectedKwhTokenReward = async () => {
        try {
            if (typeof window.ethereum !== "undefined") {
                ;
                const contract = new ethers.Contract(stakerAddress, Staker.abi, provider);
                setIsLoadingExpectedKwhTokenReward(true);
                const expectedKwhTokenReward = await contract.rewards(stakerAddress);
                setExpectedKwhTokenReward(parseInt(expectedKwhTokenReward));
                setIsLoadingExpectedKwhTokenReward(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        // get signer and address
        connect();

        fetchKwhTokenRewardPoolBalance();
        fetchExpectedKwhTokenReward();

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
            <div>
                <h3>Redeem KWH</h3>
                <br />
                <div style={{ minHeight: "250px" }}>
                    {
                        !isLoadingKwhTokenRewardPoolBalance && (
                            <div className="row">
                                <div className="col-sm-4">
                                    <h6>
                                        Reward Pool (KWH)
                                        <i onClick={handleOpen} class="fas fa-question-circle" style={{ cursor: "pointer" }}></i>
                                    </h6>
                                </div>
                                <div className="col-sm-4">
                                    {kwhTokenRewardPoolBalance}
                                </div>
                            </div>
                        ) || (
                            <p>Loading KWH token distribution pool...</p>
                        )
                    }
                    <br />
                    {
                        !isLoadingExpectedKwhTokenReward && (
                            <div className="row">
                                <div className="col-sm-4">
                                <h6>
                                Expected Reward (KWH)
                                <i onClick={handleOpen} class="fas fa-question-circle" style={{ cursor: "pointer" }}></i>
                            </h6>
                                </div>
                                <div className="col-sm-4">
                                    {expectedKwhTokenReward}
                                </div>
                            </div>
                        ) || (
                            <p>Loading expected KWH reward...</p>
                        )
                    }
                </div>
                <Button
                    className="btn btn-dark start start-two"
                    // onClick={incrementCounter}
                    variant="contained"
                    /* If Expected Reward > 0 */
                    disabled="true"
                // disabled={isLoading}
                >
                    {"Redeem!"}
                </Button>
            </div>
        </div>
    );
}

export default RedeemColumn;