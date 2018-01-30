Steps to run locally:

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
