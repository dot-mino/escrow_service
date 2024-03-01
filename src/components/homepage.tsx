import React from "react";
import {Button} from "@nextui-org/react";

export default function Homepage() {
    return (
        <>
        <div className="grid grid-cols-3 gap-4 mt-8">

            <div></div>

            <div></div>

            <div> 
                <Button color="primary" variant="ghost" size="lg" className="text-xl">
                    Are you an Escrow Agent?
                </Button>
            </div>

        </div>
        </>
    )}