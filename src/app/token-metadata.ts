export interface TokenMetadata {
  title?: string; // ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"
  description?: string; // free-form description
  media?: string; // URL to associated media, preferably to decentralized, content-addressed storage
  media_hash?: string; // Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.
  copies?: string; // string of copies of this set of metadata in existence when token was minted.
  issued_at?: string; // When token was issued or minted, Unix epoch in milliseconds
  expires_at?: string; // When token expires, Unix epoch in milliseconds
  starts_at?: string; // When token starts being valid, Unix epoch in milliseconds
  updated_at?: string; // When token was last updated, Unix epoch in milliseconds
  extra?: string; // anything extra the NFT wants to store on-chain. Can be stringified JSON.
  reference?: string; // URL to an off-chain JSON file with more info.
  reference_hash?: string; // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
}
