If you're trying to use truffle features, such as the local smart contracts, run the local ethereum
testnet with the following command. The network id will be set to 15. To totally start over, do this. 
The nonce gets messed up with any restart so this might be necessary:
0. Clear the pending_transaction table
1. stop all local builds and delete the build folder
2. testrpc -m "better moon ladder inner effort novel lecture observe mention route label curtain" -i 15
3. truffle compile
4. truffle migrate
5. start this app

My Mnemonic:      better moon ladder inner effort novel lecture observe mention route label curtain

Useful command to see network id:
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[]}' http://localhost:8545



Alternatively, you can try running a node with geth. I was not able to get truffle features to work this way, though:

1. Init your local ethereum testnet
geth --datadir="directory" init genesis.json

2. Run local ethereum testnet (networkid = chainId in the genesis.json file)
geth --datadir="directory" --networkid 15 --rpc --rpccorsdomain="*"

3. Open another console and connect
geth attach directory/geth.ipc

4. Start mining (you may need to set the etherbase)
miner.start(1)

5. Run a build and log into MetaMask before navigating to the localhost. Now you can submit and upvote images.
As long as you are mining then transactions will process.
