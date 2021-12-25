import { Injectable } from '@angular/core';
import { Account, connect, WalletConnection } from 'near-api-js';

import { ConnectConfig, keyStores } from 'near-api-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NearConnectionService {
  CONTRACT_NAME = 'dev-1618829854588-2430734';
  APP_KEY_PREFIX = 'shiritori:';

  constructor() {}

  async login() {
    // TODO (johnedvard) get env variable instead of hardcode development
    const near = await connect(this.getNearConfig('development'));
    const walletConnection = new WalletConnection(near, this.APP_KEY_PREFIX);
    let account;
    if (walletConnection.isSignedIn()) {
      // Logged in account, can write as user signed up through wallet
      account = walletConnection.account();
    } else {
      // Contract account, normally only gonna work in read only mode
      account = new Account(near.connection, this.CONTRACT_NAME);
    }
  }

  private getNearConfig(env: string): ConnectConfig {
    const headers = {};
    switch (env) {
      case 'production':
      case 'mainnet':
        return {
          networkId: 'mainnet',
          nodeUrl: 'https://rpc.mainnet.near.org',
          walletUrl: 'https://wallet.near.org',
          helperUrl: 'https://helper.mainnet.near.org',
          headers,
        };
      case 'development':
      case 'testnet':
        return {
          networkId: 'testnet',
          nodeUrl: 'https://rpc.testnet.near.org',
          walletUrl: 'https://wallet.testnet.near.org',
          helperUrl: 'https://helper.testnet.near.org',
          headers,
        };
      case 'betanet':
        return {
          networkId: 'betanet',
          nodeUrl: 'https://rpc.betanet.near.org',
          walletUrl: 'https://wallet.betanet.near.org',
          helperUrl: 'https://helper.betanet.near.org',
          headers,
        };
      case 'local':
        return {
          networkId: 'local',
          nodeUrl: 'http://localhost:3030',
          keyPath: `${environment.home}/.near/validator_key.json`,
          walletUrl: 'http://localhost:4000/wallet',
          headers,
        };
      case 'test':
      case 'ci':
        return {
          networkId: 'shared-test',
          nodeUrl: 'https://rpc.ci-testnet.near.org',
          masterAccount: 'test.near',
          headers,
        };
      case 'ci-betanet':
        return {
          networkId: 'shared-test-staging',
          nodeUrl: 'https://rpc.ci-betanet.near.org',
          masterAccount: 'test.near',
          headers,
        };
      default:
        throw Error(
          `Unconfigured environment '${env}'. Can be configured in src/config.js.`
        );
    }
  }
}
