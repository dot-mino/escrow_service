"use client"
import Navbar from "@/components/navbar";
import { Button, Link } from "@nextui-org/react";
import { ethers } from "ethers";
import { useState } from "react";

export default function Homepage() {
    const [signer, setSigner] = useState<ethers.Signer>();
    const [address, setAddress] = useState("");

    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum)
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                setSigner(signer)
                setAddress(await signer.getAddress());
                console.log(address)
            } else {
                alert("Please install MetaMask to connect your wallet.");
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
            alert("An error occurred while connecting your wallet.");
        }
    };

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
                <div className="col-start-1 col-end-7 sm:col-start-1 sm:col-end-3 lg:col-span-3 rounded p-4 py-8 lg:py-48 border border-black-400 rounded-md shadow-md flex justify-center items-center "></div>
            </div>
        </>
    );
}
