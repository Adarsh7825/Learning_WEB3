const { ethers } = require('ethers');
const crypto = require('crypto');
const WebSocket = require('ws');
const axios = require('axios');

// 1. Simple Blockchain Implementation
class Block {
    constructor(timestamp, data, previousHash) {
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return crypto.createHash('sha256')
            .update(this.timestamp + JSON.stringify(this.data) + this.previousHash)
            .digest('hex');
    }
}

// 2. P2P Network Implementation
function createP2PNetwork() {
    const server = new WebSocket.Server({ port: 8080 });
    const peers = new Set();

    server.on('connection', (ws) => {
        peers.add(ws);
        console.log('New peer connected');

        ws.on('message', (message) => {
            console.log('Received:', message.toString());
            peers.forEach(peer => {
                if (peer !== ws) {
                    peer.send(message);
                }
            });
        });
    });
}

// 3. Ethereum Network Connection
async function connectToEthereum() {
    const provider = new ethers.providers.JsonRpcProvider('YOUR_RPC_URL');

    try {
        const block = await provider.getBlock('latest');
        console.log('Latest block:', block.number);

        const price = await provider.getGasPrice();
        console.log('Gas price:', ethers.utils.formatUnits(price, 'gwei'));
    } catch (error) {
        console.error('Error connecting to Ethereum:', error);
    }
}

// 4. Unit Conversion
function convertUnits() {
    const oneEth = ethers.utils.parseEther('1.0');
    console.log('1 ETH in Wei:', oneEth.toString());

    const weiAmount = ethers.utils.parseUnits('1000', 'wei');
    const ethAmount = ethers.utils.formatEther(weiAmount);
    console.log('1000 Wei in ETH:', ethAmount);
}

// 5. Digital Signature
async function signAndVerify() {
    const wallet = ethers.Wallet.createRandom();
    const message = "Hello, Web3!";

    try {
        const signature = await wallet.signMessage(message);
        console.log('Signature:', signature);

        const recoveredAddress = ethers.utils.recoverAddress(
            ethers.utils.hashMessage(message),
            signature
        );
        console.log('Recovered address:', recoveredAddress);
        console.log('Original address:', wallet.address);
        console.log('Match:', recoveredAddress === wallet.address);
    } catch (error) {
        console.error('Error signing message:', error);
    }
}

// 6. Gas Monitoring
async function monitorGas() {
    const provider = new ethers.providers.JsonRpcProvider('YOUR_RPC_URL');

    try {
        const gasPrice = await provider.getGasPrice();
        console.log('Current gas price:', ethers.utils.formatUnits(gasPrice, 'gwei'));

        const tx = {
            to: "0x...",
            value: ethers.utils.parseEther("0.1")
        };
        const gasEstimate = await provider.estimateGas(tx);
        console.log('Estimated gas:', gasEstimate.toString());
    } catch (error) {
        console.error('Error monitoring gas:', error);
    }
}

// 7. Wallet Creation
function createWalletFromMnemonic() {
    const mnemonic = ethers.utils.entropyToMnemonic(
        ethers.utils.randomBytes(16)
    );
    console.log('Mnemonic:', mnemonic);

    const wallet = ethers.Wallet.fromMnemonic(mnemonic);
    console.log('Address:', wallet.address);
    console.log('Private Key:', wallet.privateKey);
}

// 8. Hashing Demonstration
function demonstrateHashing() {
    const message = "Hello, Web3!";

    const sha256Hash = crypto.createHash('sha256')
        .update(message)
        .digest('hex');
    console.log('SHA-256:', sha256Hash);

    const keccakHash = crypto.createHash('keccak256')
        .update(message)
        .digest('hex');
    console.log('Keccak-256:', keccakHash);
}

// 9. Message Signing
async function signMessage() {
    const wallet = ethers.Wallet.createRandom();
    const message = "I agree to the terms and conditions";

    try {
        const signature = await wallet.signMessage(message);
        console.log('Message:', message);
        console.log('Signature:', signature);

        const recoveredAddress = ethers.utils.recoverAddress(
            ethers.utils.hashMessage(message),
            signature
        );
        console.log('Verified:', recoveredAddress === wallet.address);
    } catch (error) {
        console.error('Error signing message:', error);
    }
}

// 10. Network Connection
async function connectToNetworks() {
    const networks = {
        mainnet: 'https://mainnet.infura.io/v3/YOUR-PROJECT-ID',
        goerli: 'https://goerli.infura.io/v3/YOUR-PROJECT-ID',
        sepolia: 'https://sepolia.infura.io/v3/YOUR-PROJECT-ID'
    };

    for (const [network, url] of Object.entries(networks)) {
        try {
            const provider = new ethers.providers.JsonRpcProvider(url);
            const block = await provider.getBlock('latest');
            console.log(`${network} latest block:`, block.number);
        } catch (error) {
            console.error(`Error connecting to ${network}:`, error);
        }
    }
}

// 11. Block Explorer Query
async function queryEtherscan() {
    const API_KEY = 'YOUR_ETHERSCAN_API_KEY';
    const address = '0x...'; // Any Ethereum address

    try {
        const response = await axios.get(
            `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${API_KEY}`
        );

        if (response.data.status === '1') {
            const balance = ethers.utils.formatEther(response.data.result);
            console.log('Balance:', balance, 'ETH');
        }
    } catch (error) {
        console.error('Error querying Etherscan:', error);
    }
}

// Run all experiments
async function runExperiments() {
    console.log('Starting Web3 Foundation Experiments...\n');

    // 1. Blockchain Implementation
    console.log('1. Creating a simple blockchain...');
    const genesisBlock = new Block(Date.now(), 'Genesis Block', '0');
    console.log('Genesis Block Hash:', genesisBlock.hash);

    // 2. P2P Network
    console.log('\n2. Starting P2P network...');
    createP2PNetwork();

    // 3. Ethereum Connection
    console.log('\n3. Connecting to Ethereum...');
    await connectToEthereum();

    // 4. Unit Conversion
    console.log('\n4. Converting units...');
    convertUnits();

    // 5. Digital Signature
    console.log('\n5. Creating and verifying digital signature...');
    await signAndVerify();

    // 6. Gas Monitoring
    console.log('\n6. Monitoring gas prices...');
    await monitorGas();

    // 7. Wallet Creation
    console.log('\n7. Creating wallet from mnemonic...');
    createWalletFromMnemonic();

    // 8. Hashing
    console.log('\n8. Demonstrating hashing...');
    demonstrateHashing();

    // 9. Message Signing
    console.log('\n9. Signing message...');
    await signMessage();

    // 10. Network Connection
    console.log('\n10. Connecting to different networks...');
    await connectToNetworks();

    // 11. Block Explorer
    console.log('\n11. Querying block explorer...');
    await queryEtherscan();

    console.log('\nAll experiments completed!');
}

// Run the experiments
runExperiments().catch(console.error); 