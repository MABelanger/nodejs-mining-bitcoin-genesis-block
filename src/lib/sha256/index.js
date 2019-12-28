'use strict';

import JsSHA from 'jssha';

function _reverseHex(inputHex){
  return inputHex.match(/../g).reverse().join('');
}

export function getSha256Hex (inputHex) {
  const shaObj = new JsSHA('SHA-256', 'HEX');
  shaObj.update(inputHex);
  const sha256Hex = shaObj.getHash('HEX');

  return sha256Hex;
}

export function getHexBigIndian(inputHex){
  return _reverseHex(inputHex);
}

export function getHexLittleIndian(inputHex){
  return _reverseHex(inputHex);
}

export function getLittleIndianFromDecimal(inputDecimal) {
  const hex = inputDecimal.toString(16);
  return getHexLittleIndian(hex);
}
