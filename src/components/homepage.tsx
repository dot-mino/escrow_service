import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

export default function Homepage() {
    const [conn, setConn] = useState(false);
    const [escrow, setEscrow] = useState("");

    const [showBeneficiary, setShowBeneficiary] = useState(false);
    const [beneficiary, setBeneficiary] = useState("");

    const [showValue, setShowValue] = useState(false);
    const [value, setValue] = useState("");

    const agentSubmit = (e: any) => {
        e.preventDefault();
        setShowBeneficiary(true);
    };

    const beneficiarySubmit = (e: any) => {
        e.preventDefault();
        setShowValue(true);
        // Aggiungere ulteriori azioni come inviare i dati al server
    };

    const valueSubmit = (e: any) => {
        e.preventDefault();
        console.log("Escrow Agent:", escrow);
        console.log("Beneficiary:", beneficiary);
        console.log("Value :", value)
        // Aggiungere ulteriori azioni come inviare i dati al server
    };

    return (
        <div className="grid grid-cols-3 gap-4 mt-12 ml-24 mr-24">
            <div className="col"></div>
            <div className="col flex justify-center items-center">
                <Button color="primary" variant="ghost" size="lg" className="text-xl sm:text-sm md:text-base">
                    Are you an Escrow Agent?
                </Button>
            </div>
            <div className="col"></div>
            <div className="col rounded p-4 py-48 border border-black-400 rounded-md shadow-md flex justify-center items-center ">
                {!conn ? (
                    <button
                        onClick={() => setConn(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                        Connect
                    </button>
                ) : (
                    <div className="animate__animated animate__fadeIn">
                        <form className="flex flex-col items-center" onSubmit={agentSubmit}>
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
                            <Button type="submit" color="primary" variant="ghost" size="lg" className="text-xl">
                                {">"}
                            </Button>
                        </form>

                        {showBeneficiary && (
                            <form className="flex flex-col items-center mt-4" onSubmit={beneficiarySubmit}>
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
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="ghost"
                                    size="lg"
                                    className="text-xl"
                                >
                                    {">"}
                                </Button>
                            </form>


                        )}

                        {showValue && (
                            <form className="flex flex-col items-center mt-4" onSubmit={valueSubmit}>
                                <Input
                                    isRequired
                                    type="text"
                                    label="Value"
                                    placeholder="amount in ETH"
                                    size="lg"
                                    className="mr-4 mb-4 font-bold text-xl "
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="ghost"
                                    size="lg"
                                    className="text-xl"
                                >
                                    {">"}
                                </Button>
                            </form>


                        )}

                    </div>
                )}
            </div>
            <div className="col"></div>
            <div className="col rounded p-4 py-48 border border-black-400 rounded-md shadow-md "></div>
        </div>
    );
}
