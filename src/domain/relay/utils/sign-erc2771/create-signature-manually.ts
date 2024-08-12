import { secp256k1 } from '@noble/curves/secp256k1';
import { bytesToHex } from '@noble/curves/abstract/utils';

export const createSignatureManually = (hashMessage: string, privateKeyUint8Array: Uint8Array) => {
  const signatureSigned = secp256k1.sign(hashMessage, privateKeyUint8Array); // sign
  const signatureBytes = signatureSigned.toCompactRawBytes();
  const r = (signatureSigned.recovery + 27).toString(16);

  return `0x${bytesToHex(signatureBytes)}${r}`;
};
