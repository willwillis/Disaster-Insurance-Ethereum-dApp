#!/usr/bin/bash
echo "Starting process...."
truffle compile
truffle migrate --network kovan
truffle build
echo "\n\n\n Truffle Steps Complete...."

# npm install
# npm run start
npm run build
npm run deploy

echo "\n\n\n Deployment Complete! Balbaro!"