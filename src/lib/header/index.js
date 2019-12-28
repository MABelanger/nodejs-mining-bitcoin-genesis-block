'use strict';

const sha256 = require('../sha256');

function getMerkleRoot(){
    // this is calculated with the transactions
    const merkleRoot = "3ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a"
    return merkleRoot
}

function getTimestamp(){
    // this is your current timestamp
    // GMT : Saturday, January 3, 2009 6:15:05 PM -> 1231006505 -> "29ab5f49"
    const currentIsoDate = "2009-01-03T18:15:05Z";
    const epochInMSecond = new Date(Date.parse(currentIsoDate)).getTime();
    const epochInSecond = epochInMSecond/1000;
    const timestamp = sha256.getLittleIndianFromDecimal(epochInSecond)
    return timestamp;
}

function getSize(){
    // this is the size of the block ??
    const sizeBits = "ffff001d";
    return sizeBits
}

function getNonce(numberOfTry){
    const nonceDecimal = numberOfTry + 2083200000; // we need 36893 try
    const nonceLittleIndian = sha256.getLittleIndianFromDecimal(nonceDecimal) // 2083236893
    return nonceLittleIndian;
}

function getConcatHeader(version, prevBlock, merkleRoot, timestamp, sizeBits, nonce) {
  const hexHeader = `${version}${prevBlock}${merkleRoot}${timestamp}${sizeBits}${nonce}`;
  return hexHeader;
}

function getHeaderSha256Hex(headerHex) {
  const firstHash = sha256.getSha256Hex(headerHex);  // af42031e805ff493a07341e2f74ff58149d22ab9ba19f61343e2c86c71c5d66d
  const secondHash = sha256.getSha256Hex(firstHash); // 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f
  const headerSha256Hex = sha256.getHexBigIndian(secondHash);

  return headerSha256Hex;
}

function isHeaderHashLessThanTarget(blockHash, target) {
    return parseInt(blockHash, 16) < parseInt(target, 16);
}

module.exports = {
  getMerkleRoot,
  getTimestamp,
  getSize,
  getNonce,
  getConcatHeader,
  getHeaderSha256Hex,
  isHeaderHashLessThanTarget
}
