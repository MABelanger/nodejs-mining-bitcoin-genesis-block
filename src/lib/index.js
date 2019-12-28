'use strict';

const header = require('./header');
const printUtils = require('./printUtils');

const VERSION = "01000000";
const PREV_BLOCK = "0000000000000000000000000000000000000000000000000000000000000000";
const TARGET = '00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

function isHeaderHashLessThanTarget(blockHash, target) {
    return parseInt(blockHash, 16) < parseInt(target, 16);
}

let numberOfTry = 0; // 36892

let isSolutionFound = false;
while (!isSolutionFound) {

  const version = VERSION;                   // "01000000"(set by the network)
  const prevBlock = PREV_BLOCK;              // "0000000000000000000000000000000000000000000000000000000000000000" (set by the network)
  const merkleRoot = header.getMerkleRoot(); // "3ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a"
  const timestamp = header.getTimestamp();   // "29ab5f49"
  const sizeBits = header.getSize();         // "ffff001d"
  const nonce = header.getNonce(numberOfTry);// "1dac2b7c"(integer 2083236893)

  // 0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a29ab5f49ffff001d1dac2b7c
  const concatHeaderHex = header.getConcatHeader(version, prevBlock, merkleRoot, timestamp, sizeBits, nonce);
  const headerSha256Hex = header.getHeaderSha256Hex(concatHeaderHex);

  isSolutionFound = isHeaderHashLessThanTarget(headerSha256Hex, TARGET);

  if(!isSolutionFound){
    printUtils.printNumberOfTry(numberOfTry)
    numberOfTry+=1;

  } else {
    printUtils.printSolutionFound(headerSha256Hex, TARGET);
    printUtils.printHeader(version, prevBlock, merkleRoot, timestamp, sizeBits, nonce);
  }
}
