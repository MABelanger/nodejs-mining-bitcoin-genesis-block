'use strict';

const JsSHA = require('jssha');

function _reverseHex(inputHex){
  return inputHex.match(/../g).reverse().join('');
}

function getSha256Hex (inputHex) {
  const shaObj = new JsSHA('SHA-256', 'HEX');
  shaObj.update(inputHex);
  const sha256Hex = shaObj.getHash('HEX');

  return sha256Hex;
}

function getHexBigIndian(inputHex){
  return _reverseHex(inputHex);
}

function getHexLittleIndian(inputHex){
  return _reverseHex(inputHex);
}

function getLittleIndianFromDecimal(inputDecimal) {
  const hex = inputDecimal.toString(16);
  return getHexLittleIndian(hex);
}

module.exports = {
  getSha256Hex,
  getHexBigIndian,
  getHexLittleIndian,
  getLittleIndianFromDecimal
};
