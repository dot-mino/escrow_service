import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";


export default function Footer() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: creditsIsOpen, onOpen: openCredits, onOpenChange: onCreditsOpenChange } = useDisclosure();
    return (
        <>
            <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400"> Developed by <a href="https://github.com/dot-mino/" className="hover:underline">dotmino</a>.
                    </span>
                    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                        <li>
                            <Button className="bg-transparent text-sm text-gray-500 sm:text-center dark:text-gray-400 " onPress={onOpen}>About this project</Button>
                            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                                <ModalContent>
                                    {(onClose) => (
                                        <>
                                            <ModalHeader className="flex flex-col gap-1">About this Project : </ModalHeader>
                                            <ModalBody>
                                                <p>
                                                    The final project of the fifth week of <a href="https://www.alchemy.com/university"> Alchemy University </a> consisted of Developing a Decentralized Escrow Service.
                                                </p>
                                                <p>I developed this system using next.js, tailwind.css and hardhat.
                                                    More details in the <a href="https://github.com/dot-mino/escrow_service">readme.md</a> file on github
                                                </p>

                                            </ModalBody>
                                            <ModalFooter>

                                                <Button color="primary" onPress={onClose}>
                                                    Close
                                                </Button>
                                            </ModalFooter>
                                        </>
                                    )}
                                </ModalContent>
                            </Modal>
                        </li>
                        <li>
                            <Button className="bg-transparent text-sm text-gray-500 sm:text-center dark:text-gray-400 hover:text-black" onPress={openCredits}>Credits</Button>
                            <Modal isOpen={creditsIsOpen} onOpenChange={onCreditsOpenChange}>
                                <ModalContent>
                                    {(onClose) => (
                                        <>
                                            <ModalHeader className="flex flex-col gap-1">Credits</ModalHeader>
                                            <ModalBody>

                                                <ul>


                                                </ul>
                                            </ModalBody>
                                            <ModalFooter>

                                                <Button color="primary" onPress={onClose}>
                                                    Close
                                                </Button>
                                            </ModalFooter>
                                        </>
                                    )}
                                </ModalContent>
                            </Modal>
                        </li>

                    </ul>
                </div>
            </footer>
        </>
    );
}

