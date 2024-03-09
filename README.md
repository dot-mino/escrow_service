# Decentralized Escrow Service
The final project of the fifth week of Alchemy University consisted of Developing a Decentralized Escrow Service.
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and [Tailwind CSS](https://tailwindcss.com), I also used the Ethereum Development Environment called [Hardhat](https://hardhat.org/)

## Set up
1. Install dependencies by running npm install
2. Start local server by running node server .js in the "server" folder
3. Start application by running npm run dev
4. Open [http://localhost:3001](http://localhost:3001) with your browser to interact w/ the escrow.

## Logic
The logic of the project is very simple: the user logs on to the site via metamask and enters : 
- the amount that wants to send
- the address of the beneficiary
- the escrow agent, the one who will have to approve the transaction in order for the funds to be sent to the beneficiary.

In reality, the depositor sends the funds to the smart contract, which holds them until the escrow agent decides to approve the transaction.

 ## Under the hood
The whole thing is managed by a smart contract that is deployed each time on the sepolia network, within which there is an approval function that will move the blocked funds to the beneficiary, and this function can only be performed by the escrow agent that was chosen before deploying the contract, so each time the user wants to make a transfer, an ad hoc smart contract is created for him.

I decided to use the websockets provided by [Socket.io library](https://socket.io) in order to handle the communication between server and client (escrow and depositor) efficiently and in real time. Using Socket.io, you can send and receive messages instantaneously between the server and the client without having to reload the page or make additional HTTP requests.

## Future implementations
The first thing I want to implement in the future is a notification system that allows the depositor and agent to be informed about the status of transactions quickly and easily.

In addition to improving the user experience and the graphics of the application and perhaps moving to a live version so that the application does not have to run locally


And finally take advantage of the testcase functionality present in hardat, the end of creating an ad hoc testcase for this application