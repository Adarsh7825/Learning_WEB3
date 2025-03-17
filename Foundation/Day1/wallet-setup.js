const { ethers } = require('ethers');

async function setupWallet() {
    try {
        // Create a random wallet
        const wallet = ethers.Wallet.createRandom();

        // Get wallet details
        const address = wallet.address;
        const privateKey = wallet.privateKey;
        const mnemonic = wallet.mnemonic.phrase;

        console.log('Wallet created successfully!');
        console.log('Address:', address);
        console.log('Private Key:', privateKey);
        console.log('Mnemonic Phrase:', mnemonic);

        // Create a wallet from mnemonic
        const walletFromMnemonic = ethers.Wallet.fromMnemonic(mnemonic);
        console.log('\nVerifying wallet from mnemonic:');
        console.log('Address matches:', walletFromMnemonic.address === address);

        // Get wallet balance (requires provider)
        const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/YOUR-PROJECT-ID');
        const balance = await provider.getBalance(address);
        console.log('\nWallet Balance:', ethers.utils.formatEther(balance));

        return {
            address,
            privateKey,
            mnemonic
        };
    } catch (error) {
        console.error('Error setting up wallet:', error);
        throw error;
    }
}

// Run the setup
setupWallet()
    .then(result => {
        console.log('\nWallet setup completed successfully!');
        console.log('Please save your mnemonic phrase securely!');
    })
    .catch(error => {
        console.error('Failed to setup wallet:', error);
    });     