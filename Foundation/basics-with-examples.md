# Web3 Basics with Real-Life Examples and Experiments

## 1. Why Blockchains? What Do They Provide?

### Real-Life Example: Digital Voting System
Imagine a country's election system:
- **Traditional System**: 
  - Centralized database
  - Single point of failure
  - Potential for manipulation
  - No transparency

- **Blockchain-Based System**:
  - Votes are recorded on blockchain
  - Each vote is immutable
  - Transparent to all participants
  - No single point of failure

### Experiment: Create a Simple Blockchain
```javascript
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
```

## 2. What is Decentralization?

### Real-Life Example: Social Media
- **Centralized (Facebook)**:
  - One company controls all data
  - Can censor content
  - Can sell user data
  - Single point of failure

- **Decentralized (Mastodon)**:
  - Multiple servers (instances)
  - No single owner
  - User data control
  - No censorship

### Experiment: Create a P2P Network
```javascript
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });
const peers = new Set();

server.on('connection', (ws) => {
    peers.add(ws);
    ws.on('message', (message) => {
        // Broadcast to all peers except sender
        peers.forEach(peer => {
            if (peer !== ws) {
                peer.send(message);
            }
        });
    });
});
```

## 3. RPCs and Common RPC Methods

### Real-Life Example: Bank API
- **Traditional Bank API**:
  - Check balance
  - Transfer money
  - View transactions

- **Blockchain RPC**:
  - `eth_getBalance`: Check ETH balance
  - `eth_sendTransaction`: Send ETH
  - `eth_getTransactionReceipt`: View transaction details

### Experiment: Connect to Ethereum Network
```javascript
const { ethers } = require('ethers');

async function connectToEthereum() {
    const provider = new ethers.providers.JsonRpcProvider('YOUR_RPC_URL');
    
    // Get latest block
    const block = await provider.getBlock('latest');
    console.log('Latest block:', block.number);
    
    // Get ETH price
    const price = await provider.getGasPrice();
    console.log('Gas price:', ethers.utils.formatUnits(price, 'gwei'));
}
```

## 4. Wei vs Ether, Lamports vs SOL

### Real-Life Example: Currency Denominations
- **Traditional Currency**:
  - Dollar → Cents (1:100)
  - Euro → Cents (1:100)

- **Cryptocurrency**:
  - ETH → Wei (1:10^18)
  - SOL → Lamports (1:10^9)

### Experiment: Convert Units
```javascript
const { ethers } = require('ethers');

function convertUnits() {
    // Convert 1 ETH to Wei
    const oneEth = ethers.utils.parseEther('1.0');
    console.log('1 ETH in Wei:', oneEth.toString());
    
    // Convert 1000 Wei to ETH
    const weiAmount = ethers.utils.parseUnits('1000', 'wei');
    const ethAmount = ethers.utils.formatEther(weiAmount);
    console.log('1000 Wei in ETH:', ethAmount);
}
```

## 5. Cryptography, Hashing, and Encryption

### Real-Life Example: Digital Signatures
- **Traditional Signature**:
  - Handwritten
  - Can be forged
  - Not unique

- **Digital Signature**:
  - Unique to each transaction
  - Cannot be forged
  - Verifiable

### Experiment: Create and Verify Digital Signature
```javascript
const { ethers } = require('ethers');

async function signAndVerify() {
    const wallet = ethers.Wallet.createRandom();
    const message = "Hello, Web3!";
    
    // Sign message
    const signature = await wallet.signMessage(message);
    console.log('Signature:', signature);
    
    // Verify signature
    const recoveredAddress = ethers.utils.recoverAddress(
        ethers.utils.hashMessage(message),
        signature
    );
    console.log('Recovered address:', recoveredAddress);
    console.log('Original address:', wallet.address);
    console.log('Match:', recoveredAddress === wallet.address);
}
```

## 6. Gas and Transactions

### Real-Life Example: Post Office
- **Traditional Mail**:
  - Stamp cost (fixed)
  - Weight affects cost
  - Priority options

- **Blockchain Transaction**:
  - Gas price (variable)
  - Complexity affects cost
  - Priority options

### Experiment: Monitor Gas Prices
```javascript
const { ethers } = require('ethers');

async function monitorGas() {
    const provider = new ethers.providers.JsonRpcProvider('YOUR_RPC_URL');
    
    // Get current gas price
    const gasPrice = await provider.getGasPrice();
    console.log('Current gas price:', ethers.utils.formatUnits(gasPrice, 'gwei'));
    
    // Get gas estimate for a transaction
    const tx = {
        to: "0x...",
        value: ethers.utils.parseEther("0.1")
    };
    const gasEstimate = await provider.estimateGas(tx);
    console.log('Estimated gas:', gasEstimate.toString());
}
```

## 7. Public and Private Keys, Mnemonic Phrases

### Real-Life Example: Bank Account
- **Traditional Bank**:
  - Account number (public)
  - PIN (private)
  - Recovery phrase (backup)

- **Cryptocurrency Wallet**:
  - Public address (public)
  - Private key (private)
  - Mnemonic phrase (backup)

### Experiment: Create Wallet from Mnemonic
```javascript
const { ethers } = require('ethers');

function createWalletFromMnemonic() {
    // Generate random mnemonic
    const mnemonic = ethers.utils.entropyToMnemonic(
        ethers.utils.randomBytes(16)
    );
    console.log('Mnemonic:', mnemonic);
    
    // Create wallet from mnemonic
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);
    console.log('Address:', wallet.address);
    console.log('Private Key:', wallet.privateKey);
}
```

## 8. Tokens and NFTs

### Real-Life Example: Digital Assets
- **Traditional Digital Assets**:
  - Digital photos
  - Music files
  - Documents

- **Blockchain Tokens**:
  - ERC20 tokens (fungible)
  - ERC721 tokens (non-fungible)
  - SPL tokens (Solana)

### Experiment: Create Simple Token
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }
    
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
```

## 9. Basic Cryptography

### Real-Life Example: Password Protection
- **Traditional Password**:
  - Stored in database
  - Can be hacked
  - Single point of failure

- **Blockchain Security**:
  - Distributed verification
  - Cryptographic proof
  - No single point of failure

### Experiment: Hash Function
```javascript
const crypto = require('crypto');

function demonstrateHashing() {
    const message = "Hello, Web3!";
    
    // SHA-256 hash
    const sha256Hash = crypto.createHash('sha256')
        .update(message)
        .digest('hex');
    console.log('SHA-256:', sha256Hash);
    
    // Keccak-256 hash (Ethereum)
    const keccakHash = crypto.createHash('keccak256')
        .update(message)
        .digest('hex');
    console.log('Keccak-256:', keccakHash);
}
```

## 10. Signing Messages

### Real-Life Example: Digital Contracts
- **Traditional Contract**:
  - Physical signature
  - Notarization
  - Paper trail

- **Digital Signature**:
  - Cryptographic proof
  - Immutable record
  - Instant verification

### Experiment: Sign and Verify Message
```javascript
const { ethers } = require('ethers');

async function signMessage() {
    const wallet = ethers.Wallet.createRandom();
    const message = "I agree to the terms and conditions";
    
    // Sign message
    const signature = await wallet.signMessage(message);
    console.log('Message:', message);
    console.log('Signature:', signature);
    
    // Verify signature
    const recoveredAddress = ethers.utils.recoverAddress(
        ethers.utils.hashMessage(message),
        signature
    );
    console.log('Verified:', recoveredAddress === wallet.address);
}
```

## 11. Devnet vs Mainnet

### Real-Life Example: Testing Environment
- **Traditional Software**:
  - Development environment
  - Staging environment
  - Production environment

- **Blockchain**:
  - Devnet (testing)
  - Testnet (staging)
  - Mainnet (production)

### Experiment: Connect to Different Networks
```javascript
const { ethers } = require('ethers');

async function connectToNetworks() {
    // Connect to different networks
    const networks = {
        mainnet: 'https://mainnet.infura.io/v3/YOUR-PROJECT-ID',
        goerli: 'https://goerli.infura.io/v3/YOUR-PROJECT-ID',
        sepolia: 'https://sepolia.infura.io/v3/YOUR-PROJECT-ID'
    };
    
    for (const [network, url] of Object.entries(networks)) {
        const provider = new ethers.providers.JsonRpcProvider(url);
        const block = await provider.getBlock('latest');
        console.log(`${network} latest block:`, block.number);
    }
}
```

## 12. Airdropping

### Real-Life Example: Marketing Campaign
- **Traditional Marketing**:
  - Email distribution
  - Social media giveaway
  - Coupon codes

- **Crypto Airdrop**:
  - Token distribution
  - Smart contract automation
  - Transparent process

### Experiment: Create Airdrop Contract
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Airdrop is ERC20 {
    mapping(address => bool) public claimed;
    
    constructor() ERC20("AirdropToken", "ADT") {
        _mint(address(this), 10000 * 10 ** decimals());
    }
    
    function claim() public {
        require(!claimed[msg.sender], "Already claimed");
        require(balanceOf(address(this)) >= 100 * 10 ** decimals(), "No tokens left");
        
        claimed[msg.sender] = true;
        _transfer(address(this), msg.sender, 100 * 10 ** decimals());
    }
}
```

## 13. Block Explorers

### Real-Life Example: Bank Statement
- **Traditional Banking**:
  - Monthly statements
  - Transaction history
  - Account activity

- **Block Explorer**:
  - Real-time transactions
  - Contract interactions
  - Token transfers

### Experiment: Query Block Explorer API
```javascript
const axios = require('axios');

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
        console.error('Error:', error);
    }
}
```

## Additional Resources
1. [Ethereum Documentation](https://ethereum.org/en/docs/)
2. [Web3.js Documentation](https://web3js.readthedocs.io/)
3. [OpenZeppelin Contracts](https://openzeppelin.com/contracts/)
4. [Etherscan API](https://docs.etherscan.io/) 