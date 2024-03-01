import React from "react";
import { Button } from "@nextui-org/react";

export default function Homepage() {
    return (
        <>

            <div className="grid grid-cols-3 gap-4 mt-12 ml-24 mr-24">
                <div className="col"></div>
                <div className="col flex justify-center items-center">
                    <Button color="primary" variant="ghost" size="lg" className="text-xl sm:text-sm md:text-base">
                        Are you an Escrow Agent?
                    </Button>
                </div>
                <div className="col"></div>
                <div className="col rounded p-4 py-48 border border-black-400 rounded-md shadow-md "></div>
                <div className="col"></div>
                <div className="col rounded p-4 py-48 border border-black-400 rounded-md shadow-md "></div>
            </div>
        </>
    )
}