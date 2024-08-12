import { eth, utils } from 'web3';
import { ICallInfo } from '../../interfaces/call-info.interface';

export const getHashedMessage = (
  callInfo: ICallInfo,
  CALL_ERC2771_TYPEHASH: string,
  DOMAIN_SEPARATOR: string,
) => {
  const encodedParameters = eth.abi.encodeParameters(
    ['bytes32', 'uint256', 'address', 'bytes32', 'address', 'uint256', 'uint256'],
    [
      CALL_ERC2771_TYPEHASH,
      callInfo.chainId,
      callInfo.target,
      utils.soliditySha3({ type: 'bytes', value: callInfo.data }),
      callInfo.user,
      callInfo.userNonce,
      callInfo.userDeadline,
    ],
  );

  const message = utils.soliditySha3({
    type: 'bytes',
    value: encodedParameters,
  });

  const encodedMessage = utils.encodePacked(
    { type: 'bytes', value: ['0x19', '0x01'] },
    {
      type: 'bytes',
      value: DOMAIN_SEPARATOR,
    },
    {
      type: 'bytes',
      value: message,
    },
  );

  const hashedMessage = utils.soliditySha3({
    type: 'bytes',
    value: encodedMessage,
  });

  return { hashedMessage, message };
};
