'use strict';

const headerMod = require('./header');
const merkleRootMod = require('./merkleRoot');
const printUtilsMod = require('./printUtils');
const jsonUtilsMod = require('./jsonUtils');

function getTxs(){
  return [
    '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b'
  ]
}

function mineBlock(block){
  const VERSION = "01000000";
  const PREV_BLOCK = "0000000000000000000000000000000000000000000000000000000000000000";
  const TARGET = '00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

  let numberOfTry = 0; // 36892

  let isSolutionFound = false;
  while (!isSolutionFound) {

    const version = VERSION;                                  // "01000000"(set by the network)
    const prevBlock = PREV_BLOCK;                             // "0000000000000000000000000000000000000000000000000000000000000000" (set by the network)
    const merkleRoot = merkleRootMod.getMerkleRoot(getTxs()); // "3ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a"
    const timestamp = headerMod.getTimestamp();                  // "29ab5f49"
    const sizeBits = headerMod.getSize();                        // "ffff001d"
    const nonce = headerMod.getNonce(numberOfTry);               // "1dac2b7c"(integer 2083236893)

    // 0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a29ab5f49ffff001d1dac2b7c
    const concatHeaderHex = headerMod.getConcatHeader(version, prevBlock, merkleRoot, timestamp, sizeBits, nonce);
    const headerSha256Hex = headerMod.getHeaderSha256Hex(concatHeaderHex);

    isSolutionFound = headerMod.isHeaderHashLessThanTarget(headerSha256Hex, TARGET);

    if(!isSolutionFound){
      printUtilsMod.printNumberOfTry(numberOfTry)
      numberOfTry+=1;

    } else {
      printUtilsMod.printSolutionFound(headerSha256Hex, TARGET);
      printUtilsMod.printHeader(version, prevBlock, merkleRoot, timestamp, sizeBits, nonce);
    }
  }
}


mineBlock()
