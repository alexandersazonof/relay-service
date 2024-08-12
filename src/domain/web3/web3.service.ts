import { Injectable } from '@nestjs/common';
import { Web3ManagerService } from 'src/common/web3-manager/web3-manager.service';

@Injectable()
export class Web3Service {
  constructor(public readonly web3Service: Web3ManagerService) {}

  getContractErrorNameByHex(code: string) {
    return this.web3Service.getContractErrorNameByHex(code);
  }
}
