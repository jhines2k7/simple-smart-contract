const Web3 = require('web3');
const solc = require('solc');
const fs = require('fs');

let web3 = new Web3('http://localhost:8545'); // Replace this with the URL of your Ethereum node

let source = fs.readFileSync('SimpleStorage.sol', 'utf8'); // Read the contract source code
let compiledContract = solc.compile(source, 1);
let abi = compiledContract.contracts[':SimpleStorage'].interface;
let bytecode = '0x'+compiledContract.contracts[':SimpleStorage'].bytecode;

// Deploy the contract
let simpleStorage = new web3.eth.Contract(JSON.parse(abi));
web3.eth.getAccounts().then(function (accounts) {
    return simpleStorage.deploy({data: bytecode})
    .send({from: accounts[0], gas: '4700000'})
    .on('receipt', function(receipt) {
        console.log('Contract deployed at ', receipt.contractAddress);
        
        // Now, let's call the contract's methods
        let contractInstance = new web3.eth.Contract(JSON.parse(abi), receipt.contractAddress);
        
        // Call the 'set' function of the contract:
        contractInstance.methods.set(10).send({from: accounts[0]}).then(function() {
            // Call the 'get' function of the contract:
            return contractInstance.methods.get().call();
        })
        .then(function(value) {
            console.log('The value of data is: ', value);
        });
    });
});