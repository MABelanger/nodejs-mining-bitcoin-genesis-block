const sha256Mod = require('./sha256');
const _ = require('lodash');


function getDoubleSha256(inputHex) {
  const firstHash = sha256Mod.getSha256Hex(inputHex);  // af42031e805ff493a07341e2f74ff58149d22ab9ba19f61343e2c86c71c5d66d
  const secondHash = sha256Mod.getSha256Hex(firstHash); // 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f
  //const doubleSha256 = sha256Mod.getHexBigIndian(secondHash);

  return secondHash;
}

var merkleRoot = (hashes) => {
  if (hashes.length == 1)
    return hashes[0]

  return merkleRoot(
    _.chain(hashes)
      .chunk(2)
      .each(leaves => leaves[1] = leaves[1] || leaves[0])
      .map(leaves => leaves.join('')) // concat the array
      .map(getDoubleSha256)
      .value()
  )
}

// Transaction hashes from block 96001:
var tx1 = 'dcc95c8740525e27d87333558e5d0a288d0eac9062598c86c77e75dcde7178d2'
var tx2 = '043cd1d9166cf16a4cc02d4385667657056cbe23f7058877c7fde09ef7de904a'
var tx3 = '88b058d7e3e7b6d174d0f5a76a209a3107de65c01b010cda72ee64b22c980998'

console.log(merkleRoot([tx1, tx2, tx3].sort()).toString('hex'));

// expected 'e7ae478c684e965d730e72b9cac644fd1ebeb1517fe69cc458d9d4070b9de8d8'
// output   'b2f52e4efbbab7653489b83d5ad331f1ada1b7e5959ac63b8aa45a786ae90279'
