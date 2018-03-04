If you're trying to use truffle features, such as the local smart contracts, run the local ethereum
testnet with the following command. The network id will be set to 15. To totally start over, do this. 
The nonce gets messed up with any restart so this might be necessary:<br />
1. Clear the pending_transaction table <br />
2. stop all local builds and delete the build folder <br />
3. testrpc -m "better moon ladder inner effort novel lecture observe mention route label curtain" -i 15 <br />
4. truffle compile <br />
5. truffle migrate <br />
6. start this app <br />
<br /><br />
My Mnemonic:      better moon ladder inner effort novel lecture observe mention route label curtain 
<br /><br />
Useful command to see network id: <br />
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[]}' http://localhost:8545 
<br /><br /><br />


Alternatively, you can try running a node with geth. I was not able to get truffle features to work this way, though:
<br /><br />
1. Init your local ethereum testnet <br />
geth --datadir="directory" init genesis.json <br />
<br /><br />
2. Run local ethereum testnet (networkid = chainId in the genesis.json file) <br />
geth --datadir="directory" --networkid 15 --rpc --rpccorsdomain="*" <br />
<br /><br />
3. Open another console and connect <br />
geth attach directory/geth.ipc <br />
<br /><br />
4. Start mining (you may need to set the etherbase) <br />
miner.start(1) 
<br /><br />
5. Run a build and log into MetaMask before navigating to the localhost. Now you can submit and upvote images.
As long as you are mining then transactions will process.
