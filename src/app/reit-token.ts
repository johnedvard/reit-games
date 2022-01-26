import { TokenMetadata } from './token-metadata';

export interface ReitToken {
  id: string;
  owner_id: string;
  metadata: TokenMetadata;
}
