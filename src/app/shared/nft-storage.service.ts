import { Injectable } from '@angular/core';

import { NFTStorage } from 'nft.storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NftStorageService {
  client = new NFTStorage({ token: environment.nftStorageApiKey });
  constructor() {
    console.log(
      'token: environment.nftStorageApiKey',
      environment.nftStorageApiKey
    );
  }

  async storeImage(file: File): Promise<string> {
    const metadata = await this.client.store({
      name: file.name,
      description: 'Profile picture',
      image: file,
    });
    console.log({ 'metadata.json contents': metadata.data });
    console.log(metadata.url);
    return metadata.data.image.href;
  }
}
