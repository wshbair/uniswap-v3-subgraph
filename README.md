## Uniswap V3 Staker Subgraph

Subgraph to be used by the [UNI V3 Staker Frontend](https://github.com/vbstreetz/uniswap-v3-staker-frontend).

### Examples

 

### Deployment

1. Create a new subgraph at https://thegraph.com/explorer/subgraph/create. You might want to create an additional one for other testnets e.g. rinkeby
2. Update `package.json` and `Makefile` to match the created subgraphs.
3. Ran `yarn` to install node packages.
4. Deploy e.g. to mainent with `make mainnet`
5. Visit the subgraphs and verify no errors in indexing.

### Commands
npm run deploy-local
npm run deploy
graph create --node http://localhost:8020/ wshbair/uniswap-v3-subgraph
yarn codegen

## TODO
- Fix fetchTokenTotalSupply function in token.ts