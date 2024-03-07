import React, { useEffect, useState } from "react";
import { Button, Link, user } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { ethers, parseEther } from "ethers";
import io from "socket.io-client";

import EscrowArtifact from "../app/artifacts/contracts/escrow.sol/Escrow.json";

declare global {
    interface Window {
        ethereum: any
    }
}

export default function Homepage() {
    const [conn, setConn] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [address, setAddress] = useState("");

    const [signer, setSigner] = useState<ethers.Signer>();
    const [escrow, setEscrow] = useState("");
    const [beneficiary, setBeneficiary] = useState("");

    const [value, setValue] = useState("")

    const [contractAddress, setContractAddress] = useState("");


    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum)
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                setSigner(signer)
                const address = await signer.getAddress();
                setAddress(address);
                setConn(true);


            } else {
                alert("Please install MetaMask to connect your wallet.");
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
            alert("An error occurred while connecting your wallet.");
        }
    };

    const submit = async (e: any) => {
        e.preventDefault();
        setWaiting(true);

        //accetta la tx
        //manda in wait
        //azione asincrona in attesa che l'agent accetti la tx


        console.log("Escrow Agent:", escrow);
        console.log("Beneficiary:", beneficiary);
        console.log("Value :", value);

        //setWaiting(false);  
    };

    const deploy = async (e: any) => {
        e.preventDefault();
        try {
            const ethValue = ethers.parseEther(value);
            const ContractFactory = new ethers.ContractFactory(EscrowArtifact.abi, EscrowArtifact.bytecode, signer);
            const deployedContract = await ContractFactory.deploy(escrow, beneficiary, { value: ethValue });
            console.log("Deploying contract...");
            const deploymentTxResponse = await deployedContract.deploymentTransaction();
            if (deploymentTxResponse) {
                const receipt = await deploymentTxResponse.wait();
                if (receipt?.contractAddress) {
                    await setContractAddress(receipt.contractAddress);
                    // Invia l'agente al server Socket.IO
                    const socket = io("http://localhost:3000");
                    const depositData = { wallet: address, agent: escrow, amount: value, beneficiary: beneficiary, contractAddress: receipt.contractAddress }
                    socket.emit("submitDeposit", depositData);
                } else {
                    throw new Error("Contract address is null");
                }
            } else {
                throw new Error("Deployment transaction response is null");
            }
        } catch (error) {
            console.error("Error deploying contract:", error);
            alert("An error occurred while deploying the contract.");
            setWaiting(false);
        }
    }



    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 ml-24 mr-24">
            <div className="col-span-1"></div>
            <div className="col-span-2 lg:col-span-1 flex justify-center items-center">
                <Link href="/agent">
                    <Button color="primary" variant="ghost" size="lg" className="text-xl">
                        Are you an Escrow Agent?
                    </Button>
                </Link>
            </div >
            <div className="col-span-1"></div>
            <div className="col-span-2 lg:col-span-1 rounded p-4 py-8 lg:py-48 border border-black-400 rounded-md shadow-md flex justify-center items-center ">
                {!conn ? (
                    <button
                        onClick={connectWallet}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                        Connect
                    </button>
                ) : (
                    <div className="animate__animated animate__fadeIn w-full flex flex-col items-center">
                        {waiting ? (
                            <p>Waiting... :)</p>
                        ) : (
                            <>
                                <form className="flex flex-col items-center" onSubmit={submit}>
                                    <Input
                                        isRequired
                                        type="text"
                                        label="Escrow Agent"
                                        placeholder="0x000000.."
                                        size="lg"
                                        className="mr-4 mb-4 font-bold text-xl "
                                        value={escrow}
                                        onChange={(e) => setEscrow(e.target.value)}
                                    />
                                    <Input
                                        isRequired
                                        type="text"
                                        label="Beneficiary"
                                        placeholder="0x0000.."
                                        size="lg"
                                        className="mr-4 mb-4 font-bold text-xl "
                                        value={beneficiary}
                                        onChange={(e) => setBeneficiary(e.target.value)}
                                    />
                                    <Input
                                        isRequired
                                        type="text"
                                        label="Value"
                                        placeholder="Amount in ETH"
                                        size="lg"
                                        className="mr-4 mb-4 font-bold text-xl "
                                        onChange={(e) => {
                                            e.preventDefault();
                                            const regex = /[^0-9.]/;
                                            if (regex.test(e.target.value)) {
                                                e.preventDefault();
                                                e.target.value = ""; // Clear the input field
                                                alert("Please enter a valid number");
                                            } else setValue(e.target.value);
                                        }}
                                    />

                                    <Button type="submit" color="primary" variant="ghost" size="lg" className="text-xl">
                                        {">"}
                                    </Button>
                                </form>
                            </>
                        )}
                    </div>
                )}
            </div>
            <div className="col-span-1 lg:col-span-1 flex flex-col items-center justify-center">
                {conn ? (
                    <>
                        <h2 className="mb-12 mr-4">Connected with: {`${address.substring(0, 6)}...${address.substring(38, 42)}`}</h2>
                        {"->"}
                    </>

                ) : (
                    <div></div>
                )}
            </div>
            <div className="col-span-2 lg:col-span-1 rounded p-4 py-8 lg:py-48 border border-black-400 rounded-md shadow-md ">
                {waiting ? (
                    <>
                        <h2 className="mt-4"> Escrow Agent : {`${escrow.substring(0, 6)}...${escrow.substring(38, 42)}`} </h2>
                        <h2 className="mt-4"> Beneficiary  : {`${beneficiary.substring(0, 6)}...${beneficiary.substring(38, 42)}`} </h2>
                        <h2 className="mt-4"> Amount : {value} ETH </h2>
                        <p className="mt-6">Sign to send the transaction to Smart Contract Escrow and wait for the escrow agent to accept the transaction.</p>
                        <div className="flex justify-end mt-6">
                            <form className="flex flex-col items-center" onSubmit={deploy}>
                                <Button type="submit" color="primary" variant="ghost" size="md" className="text-md">
                                    {"Send >"}
                                </Button>
                            </form>
                        </div>
                        {contractAddress ? (
                            <>
                                <Link href={`https://sepolia.etherscan.io/address/${contractAddress}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                                    View Contract on Etherscan
                                </Link>
                            </>
                        ) : (
                            <div></div>
                        )}
                    </>

                ) : (
                    <div></div>
                )}
            </div>
        </div >
    );
}
