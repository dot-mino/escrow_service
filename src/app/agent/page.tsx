"use client"
import Navbar from "@/components/navbar";
import { Button, Link } from "@nextui-org/react";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import EscrowArtifact from "../../app/artifacts/contracts/escrow.sol/Escrow.json";

interface Deposit {
    agent: string;
    amount: number;
    beneficiary: string;
    contractAddress: string;
    // altre proprietà del deposito, se presenti
}


export default function Homepage() {
    const [signer, setSigner] = useState<ethers.Signer>();
    const [address, setAddress] = useState<string>("");
    const [deposits, setDeposits] = useState<Deposit[]>([]);

    useEffect(() => {
        if (address) {
            sendAgentAddress(address);
        }
    }, [address]);

    const sendAgentAddress = (address: string) => {
        const socket = io("http://localhost:3000");
        socket.emit("agentAddress", { agent: address });
        console.log("Agent Address sent to server:", address);

        socket.on("agentDeposits", (data: Deposit[]) => {
            console.log("Received agent deposits:", data);
            setDeposits(data);
            socket.disconnect();
        });
    };

    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum)
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                setSigner(signer)
                const address = await signer.getAddress();
                setAddress(address);
                console.log(address)
            } else {
                alert("Please install MetaMask to connect your wallet.");
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
            alert("An error occurred while connecting your wallet.");
        }
    };


    const handleApprove = async (index: number) => {
        try {
            console.log(index)
            const deposit = deposits[index];
            console.log(deposit)
            console.log("depoist Conc Add :", deposit.contractAddress)
            if (signer) {
                const escrowContract = new ethers.Contract(deposit.contractAddress, EscrowArtifact.abi, signer);
                const approveTxn = await escrowContract.approve();
                await approveTxn.wait();
                console.log("Deposit approved successfully:", approveTxn);
            } else {
                alert("Please connect your wallet before approving the deposit.");
            }
        }





        catch (error) {
            console.error("Error approving deposit:", error);
            alert("An error occurred while approving the deposit.");
        }
    }

    return (
        <>
            <Navbar />
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 mt-12 ml-24 mr-24">
                <div className="col-span-1 flex justify-center items-center">
                    <Button color="primary" variant="ghost" size="lg" className="text-xl" onClick={connectWallet}>
                        Connect
                    </Button>
                </div>
                <div className="col-span-2 sm:col-span-2 lg:col-span-1 flex justify-center items-center">

                </div>
                <div className="col-span-1 flex justify-center items-center">
                    <Link href="/">
                        <Button color="primary" variant="ghost" size="lg" className="text-xl">
                            Are you a Depositor?
                        </Button>
                    </Link>
                </div>
                <div className="col-start-1 col-end-7 sm:col-start-1 sm:col-end-3 lg:col-span-3 rounded p-4 py-8 lg:py-48 border border-black-400 rounded-md shadow-md flex justify-center items-center ">
                    <h2>Agent Deposits:</h2>
                    <ul>
                        {deposits.map((deposit, index) => (
                            <li key={index}> Agent: {deposit.agent}, Amount: {deposit.amount}, Beneficiary : {deposit.beneficiary}
                                <Button onClick={() => handleApprove(index)}>Approve</Button>
                            </li>

                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
