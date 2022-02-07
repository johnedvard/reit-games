import { Injectable } from '@angular/core';
import {
  connect,
  Near,
  WalletConnection,
  ConnectConfig,
  keyStores,
  Account,
  Contract,
} from 'near-api-js';
import { AccountBalance } from 'near-api-js/lib/account';

import { ReplaySubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReitToken } from './reit-token';
import { TokenMetadata } from './token-metadata';

@Injectable({
  providedIn: 'root',
})
export class NearConnectionService {
  CONTRACT_NAME = 'dev-1642243356013-50842527229872';
  APP_KEY_PREFIX = 'reit-games:';

  private readAccount!: Account;
  private account: ReplaySubject<Account> = new ReplaySubject<Account>();
  private contract!: Contract;
  private near!: Near;
  private walletConnection!: WalletConnection;
  private balance!: AccountBalance;
  private profileSubject = new ReplaySubject<string>();

  constructor() {
    this.initNear().then(async ({ near, walletConnection }) => {
      if (walletConnection) {
        this.readAccount = new Account(near.connection, this.CONTRACT_NAME);
        let account = this.readAccount;
        if (walletConnection.isSignedIn()) {
          // loggied in user, has write priveledge
          account = walletConnection.account();
          account.getAccountBalance().then((balance: AccountBalance) => {
            this.balance = balance;
          });
        } else {
          // account with read priveledges only
          account = this.readAccount;
        }
        this.contract = await new Contract(account, this.CONTRACT_NAME, {
          // View methods are read only. They don't modify the state, but usually return some value.
          viewMethods: [
            'getProfileImageSrc',
            'nft_metadata',
            'nft_tokens_for_owner',
            'nft_token',
          ],
          // Change methods can modify the state. But you don't receive the returned value when called.
          changeMethods: ['setProfileImageSrc', 'updateNftToken'],
        });
        this.account.next(account);
      }
    });
  }

  getBalance(): AccountBalance {
    return this.balance || { total: 0 };
  }

  getAccount(): Observable<Account> {
    return this.account.asObservable();
  }

  login() {
    // TODO (johnedvard) get env variable instead of hardcode development
    if (!this.walletConnection || !this.near) return;
    if (!this.walletConnection.isSignedIn()) {
      // Need to pass the correct contract name to be able to call change methods on behalf of the user without requesting permission
      this.walletConnection.requestSignIn(this.CONTRACT_NAME);
    }
  }

  signOut() {
    if (!this.walletConnection) return;
    this.walletConnection.signOut();
    // User should still be able to read content
    this.account.next(this.readAccount);
  }

  isSignedIn(): boolean {
    if (this.walletConnection) {
      return this.walletConnection.isSignedIn();
    }
    return false;
  }

  saveProfileImageSrc(profileImageSrc: string): Promise<string> {
    // Trick user to see uploaded image before it's stored on the contract
    this.profileSubject.next(profileImageSrc);
    return (<any>this.contract)
      .setProfileImageSrc({
        profileImageSrc,
      })
      .then((src: string) => {
        this.profileSubject.next(src);
      });
  }

  getNftMetadata(): Promise<string> {
    return (<any>this.contract).nft_metadata().then((res: any) => {
      console.log(res);
    });
  }

  getNftTokensForOwner(account_id: string): Promise<string> {
    const args = { account_id };
    return (<any>this.contract).nft_tokens_for_owner(args).then((res: any) => {
      console.log(res);
    });
  }

  getNftToken(token_id: string): Observable<ReitToken> {
    return new Observable((observer) => {
      this.walletConnection
        .account()
        .functionCall({
          contractId: this.contract.contractId,
          methodName: 'nft_token',
          args: { token_id },
        })
        .then((res: any) => {
          console.log('function callo', res);
        });
      (<any>this.contract).nft_token({ token_id }).then((res: ReitToken) => {
        observer.next(res);
      });
    });
  }

  updateNftToken(token_id: string, metadata: TokenMetadata): Promise<void> {
    return (<any>this.contract)
      .updateNftToken({ token_id, description: metadata.description })
      .then((src: string) => {
        console.log('updated nft token', src);
      });
  }

  getProfileImageSrc(username: string): Observable<string> {
    (<any>this.contract)
      .getProfileImageSrc({ username })
      .then((src: string) => {
        this.profileSubject.next(src);
      });
    return this.profileSubject.asObservable();
  }

  private async initNear(): Promise<{
    near: Near;
    walletConnection: WalletConnection | null;
  }> {
    const nearConfig = this.getNearConfig('development');
    if (!this.near) {
      this.near = await connect(nearConfig);
      this.walletConnection = new WalletConnection(
        this.near,
        this.APP_KEY_PREFIX
      );
    }
    return { near: this.near, walletConnection: this.walletConnection };
  }

  private getNearConfig(env: string): ConnectConfig {
    const headers = {};
    const keyStore = new keyStores.BrowserLocalStorageKeyStore(
      window.localStorage,
      this.APP_KEY_PREFIX
    );
    switch (env) {
      case 'production':
      case 'mainnet':
        return {
          networkId: 'mainnet',
          nodeUrl: 'https://rpc.mainnet.near.org',
          walletUrl: 'https://wallet.near.org',
          helperUrl: 'https://helper.mainnet.near.org',
          headers,
          keyStore,
        };
      case 'development':
      case 'testnet':
        return {
          networkId: 'testnet',
          nodeUrl: 'https://rpc.testnet.near.org',
          walletUrl: 'https://wallet.testnet.near.org',
          helperUrl: 'https://helper.testnet.near.org',
          headers,
          keyStore,
        };
      case 'betanet':
        return {
          networkId: 'betanet',
          nodeUrl: 'https://rpc.betanet.near.org',
          walletUrl: 'https://wallet.betanet.near.org',
          helperUrl: 'https://helper.betanet.near.org',
          headers,
          keyStore,
        };
      case 'local':
        return {
          networkId: 'local',
          nodeUrl: 'http://localhost:3030',
          keyPath: `${environment.home}/.near/validator_key.json`,
          walletUrl: 'http://localhost:4000/wallet',
          headers,
          keyStore,
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
          keyStore,
        };
      default:
        throw Error(
          `Unconfigured environment '${env}'. Can be configured in src/config.js.`
        );
    }
  }
}
