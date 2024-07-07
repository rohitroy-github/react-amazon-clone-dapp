<h2>Amazon Clone Dapp (EVM Based)</h2>

<b>This is a decentralized version of Amazon.in powered by blockchain and designed using Vite JS.</b>

<!-- Currently, the app is working on localhost using <b>Sepolia test network</b> and Alchemy. -->

<b>Snapshots from the project : </b>

<img src="https://github.com/rohitroy-github/vite-amazon-clone-dapp/assets/68563695/9888a8ea-2826-4a8b-b5e7-47fdd3af2385" width="750">

<img src="https://github.com/rohitroy-github/vite-amazon-clone-dapp/assets/68563695/dd8d5b35-412a-43e6-9f50-d8395f6eff49" width="750">

<h3><b>Tech Stack :</b></h3>

<b>Frontend :</b>

<ul>
    <li>Vite JS</li>
</ul>

<b>Backend :</b>

<ul>
    <li>Node JS</li>
    <li>Hardhat Development Environment</li>
    <li>Metamask Wallet</li>
    <li>Ethers JS</li>
    <li>Alchemy</li>
</ul>

<h3><b>Guide for testing on local hardhat network :</b></h3>

<b>Environment variables :</b>

<b>Backend :</b>

Terminal 1:

<ul>
    <li>Run (Move inside [blockchain-hardhat] folder) : <b>cd blockchain-hardhat</b></li>
    <li>Run (Running Hardhat node locally) : <b>npx hardhat node</b></li>

</ul>

Terminal 2:

<ul>
    <li>Run (Move inside [blockchain-hardhat] folder) : <b>cd blockchain-hardhat</b></li>
    <li>Run (Running tests | Optional) : <b>npx hardhat test</b></li>
    <li>Run (Running deployment script) : <b>npx hardhat run scripts/deploy[Todo_Contract_Main].js --network localhost</b></li>
</ul>

Update the <b>[config.json]</b> file with the updated contract-address under <b>"31337"</b> "address" feild fetched from Terminal 2.

<b>Frontend :</b>

Terminal 1:

<ul>
    <li>Run (Move inside [frontend-vite] folder) : <b>cd frontend-vite</b></li>
    <li>Run (Running frontend on browser): <b>npm run dev</b></li>
</ul>

The project is complete but I'm making constant modifications to the project. Please don't forget to put a ⭐ if you like the project.
