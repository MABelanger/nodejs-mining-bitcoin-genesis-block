const sha256Mod = require('../sha256');
const _ = require('lodash');

function getDoubleSha256(inputHex) {
  const firstHash = sha256Mod.getSha256Hex(inputHex);
  const secondHash = sha256Mod.getSha256Hex(firstHash);
  return secondHash;
}

function getMerkleRootLittleIndian (hashes) {
  if (hashes.length == 1){
    return hashes[0];
  }

  return getMerkleRootLittleIndian(
    _.chain(hashes)
      .chunk(2)
      .each(leaves => leaves[1] = leaves[1] || leaves[0])
      .map(leaves => leaves.join('')) // concat the array
      .map(getDoubleSha256)
      .value()
  )
}

function getMerkleRoot(txs){
  const littleIndianTxs = txs.map(sha256Mod.getHexLittleIndian);
  const merkleRootLittleIndian = getMerkleRootLittleIndian(littleIndianTxs);

  // const merkleRootBigIndian = sha256Mod.getHexBigIndian(merkleRootLittleIndian);

  return merkleRootLittleIndian;
}

module.exports = {
  getMerkleRoot
}
