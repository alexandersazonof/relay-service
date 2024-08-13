import { ICallInfo } from '../../src/domain/relay/interfaces/call-info.interface';
import { signCallWithERC2771 } from '../../src/domain/relay/utils/sign-erc2771/sign-erc2771';
import { callERC2771TypeHashRequest, domainSeparatorRequest } from './requests';

export const buildCallFromOperatorRequestBody = async (
  app: any,
  callInfo: ICallInfo,
  privateKey: string,
) => {
  const { text: CALL_ERC2771_TYPEHASH } = await callERC2771TypeHashRequest(app);
  const { text: DOMAIN_SEPARATOR } = await domainSeparatorRequest(app);

  const signature = await signCallWithERC2771(
    callInfo,
    CALL_ERC2771_TYPEHASH,
    DOMAIN_SEPARATOR,
    privateKey,
  );

  return {
    ...callInfo,
    signature,
  };
};
