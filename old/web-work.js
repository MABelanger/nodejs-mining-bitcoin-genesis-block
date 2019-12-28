const sha256Mod = require('./sha256');
const _ = require('lodash');

function getDoubleSha256(inputHex) {
  const firstHash = sha256Mod.getSha256Hex(inputHex);
  const secondHash = sha256Mod.getSha256Hex(firstHash);
  return secondHash;
}

function getMerkleRoot (hashes) {
  if (hashes.length == 1){
    return hashes[0];
  }

  return getMerkleRoot(
    _.chain(hashes)
      .chunk(2)
      .each(leaves => leaves[1] = leaves[1] || leaves[0])
      .map(leaves => leaves.join('')) // concat the array
      .map(getDoubleSha256)
      .value()
  )
}

// Transaction hashes from block 96001:
const txs = [
  'dcc95c8740525e27d87333558e5d0a288d0eac9062598c86c77e75dcde7178d2',
  '043cd1d9166cf16a4cc02d4385667657056cbe23f7058877c7fde09ef7de904a',
  '88b058d7e3e7b6d174d0f5a76a209a3107de65c01b010cda72ee64b22c980998'
]

var littleIndianTxs = txs.map(sha256Mod.getHexLittleIndian);
var merkleRoot = getMerkleRoot(littleIndianTxs);

var merkleRootBigIndian = sha256Mod.getHexLittleIndian(merkleRoot);

console.log(merkleRootBigIndian);

// expected 'e7ae478c684e965d730e72b9cac644fd1ebeb1517fe69cc458d9d4070b9de8d8'
// output   'b2f52e4efbbab7653489b83d5ad331f1ada1b7e5959ac63b8aa45a786ae90279'
