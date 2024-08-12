import { eth } from 'web3';
import { createSignatureManually } from './create-signature-manually';
import { getHashedMessage } from './get-hashed-message';
import { ICallInfo } from '../../interfaces/call-info.interface';

export const signCallWithERC2771 = async (
  callInfo: ICallInfo,
  CALL_ERC2771_TYPEHASH: string,
  DOMAIN_SEPARATOR: string,
  privateKey: string,
) => {
  const { hashedMessage } = getHashedMessage(callInfo, CALL_ERC2771_TYPEHASH, DOMAIN_SEPARATOR);
  const messageHexWithoutPrefix = hashedMessage.substring(2);
  const privateKeyUint8Array = eth.accounts.parseAndValidatePrivateKey(privateKey);

  return createSignatureManually(messageHexWithoutPrefix, privateKeyUint8Array);
};
