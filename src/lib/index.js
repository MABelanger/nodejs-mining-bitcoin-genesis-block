'use strict';

const headerMod = require('./header');
const sha256Mod = require('./sha256');
const merkleRootMod = require('./merkleRoot');
const printUtilsMod = require('./printUtils');
const jsonUtilsMod = require('./jsonUtils');



function mineBlock(block){
  const VERSION = "01000000";
  const PREV_BLOCK = "0000000000000000000000000000000000000000000000000000000000000000";
  const TARGET = '00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

  console.log('block.previousblockhash', block.previousblockhash);
  let numberOfTry = 36890; // 36892

  let isSolutionFound = false;
  while (!isSolutionFound) {

    const version = sha256Mod.getHexLittleIndian(block.versionHex);                                  // "01000000"(set by the network)
    const prevBlockHash = sha256Mod.getHexLittleIndian(headerMod.getPreviousBlockHash(block.previousblockhash));                             // "0000000000000000000000000000000000000000000000000000000000000000" (set by the network)
    const merkleRoot = merkleRootMod.getMerkleRoot(block.tx); // "3ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a"
    const timestamp = sha256Mod.getLittleIndianFromDecimal(block.time);                   // "29ab5f49"
    const sizeBits =  sha256Mod.getHexLittleIndian(block.bits);                        // "ffff001d"
    const nonce = headerMod.getNonce(numberOfTry);               // "1dac2b7c"(integer 2083236893)

    // 0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a29ab5f49ffff001d1dac2b7c
    const concatHeaderHex = headerMod.getConcatHeader(version, prevBlockHash, merkleRoot, timestamp, sizeBits, nonce);
    const headerSha256Hex = headerMod.getHeaderSha256Hex(concatHeaderHex);

    isSolutionFound = headerMod.isHeaderHashLessThanTarget(headerSha256Hex, TARGET);

    if(!isSolutionFound){
      printUtilsMod.printNumberOfTry(numberOfTry)
      numberOfTry+=1;

    } else {
      printUtilsMod.printSolutionFound(headerSha256Hex, TARGET);
      printUtilsMod.printHeader(version, prevBlockHash, merkleRoot, timestamp, sizeBits, nonce);
    }
  }
}

jsonUtilsMod.getBlocks(function(blocks){
  blocks.forEach((block)=>{
    mineBlock(block)
  });
});
