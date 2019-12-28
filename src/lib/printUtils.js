'use strict';

function printNumberOfTry(numberOfTry){
  process.stdout.write('\r' + 'numberOfTry: ' + numberOfTry);
}

function printSolutionFound(headerSha256Hex, target){
  console.log('');
  console.log('!!!We found a perfect header combinaison!!!');
  console.log('because the hash of the header is:  ' + headerSha256Hex);
  console.log('and is smaller than the target:     ' + target);
}

function printHeader(version, prevBlock, merkleRoot, timestamp, sizeBits, nonce){
  console.log('Base on the header:');
  console.log('  version:     ' + version);
  console.log('  prev_block:  ' + prevBlock);
  console.log('  merkle_root: ' + merkleRoot);
  console.log('  timestamp:   ' + timestamp);
  console.log('  size_bits:   ' + sizeBits);
  console.log('  nonce:       ' + nonce);
}

module.exports = {
  printNumberOfTry,
  printSolutionFound,
  printHeader
};
