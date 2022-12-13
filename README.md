# What is Royscan ?

Royscan is a tool for creators to visualize the rate of royalty fulfilment of non-fungible tokens purchased across major trading marketplaces like Magic Eden, Hadeswap, Opensea, CoraCube, Solanart etc. Creators can also use the tool to reward users who respected and paid royalty on purchase.

# How it works

Given the recent optional royalty payment introduced by the largest Solana blockchain Nft marketplace (Magic Eden), there has been a growing concern by creators on how to collect and analyse royalty fulfilments by holders.

At the moment we are utilizing [Helius](https://helius.xyz/) Api and webhooks to spin up blockchain data indexer.
Using the webhooks we receive filtered transactions as there happen on the blockchain which is further processed to decode royalty payment details and stored on a Postgres database for ease of fetching, filtering, sorting and rendering.

Collections are grouped by candy machine key or combination of token update authority and collection symbol.

# Usage

You can use the service Api endpoints or interact with the Ui (not the best at the momemnt but further improvement awaits the project).

To run a local copy of the application, you will need to copy and modify the `.env.example` file to `.env`

# Api Endpoints

Base Api URL `https://royscan.com`

| Endpoints                       | Usage                                    | Method | Params        |
| ------------------------------- | ---------------------------------------- | ------ | ------------- |
| /api/search?search=searchString | Used to query for collection             | GET    | search        |
| /api/token/{mint}/royalty       | Used to query if an account paid royalty | GET    | mint, address |

|

# Roadmap

- [x] Add transaction indexer
- [x] Add base Api
- [x] Add base UI for demo
- [ ] Improve UI
- [ ] Index transactions from genesis to latest
- [ ] Allow creators to reward and automate rewarding of holders who paid royalty fee
- [ ] Expose more helpful public Api to allow other dApps to interface with the service

# Vision

To become the leading royalty and NFT explorer on the Solana blockchain.

# License

The Royscan project is licensed under the terms of the GPL Open Source license and is available for free.

# Quick Links

- [Live demo](https://royscan.com)
- [Video demo](https://vimeo.com/780488800)
