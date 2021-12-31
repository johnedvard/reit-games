import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
} from '@angular/core';
import { Account } from 'near-api-js';
import { NearConnectionService } from '../near-connection.service';
import { NftStorageService } from '../shared/nft-storage.service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.sass'],
})
export class AccountMenuComponent implements OnInit {
  @Input() isDropDownOpen!: boolean;
  @Output() isDropDownOpenChange = new EventEmitter<boolean>();

  account!: Account;
  nearTokens!: string;

  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropDownOpenChange.emit(false);
    }
  }

  constructor(
    private nearService: NearConnectionService,
    private eRef: ElementRef,
    private nftStorage: NftStorageService
  ) {
    nearService.getAccount().subscribe((account) => {
      this.account = account;
      this.nearTokens = (
        parseFloat(nearService.getBalance().total) / Math.pow(10, 24)
      ) // because yocto near
        .toFixed(2);
    });
  }

  ngOnInit(): void {}

  signOut(event: MouseEvent) {
    this.nearService.signOut();
    this.isDropDownOpenChange.emit(false);
    // prevent log-in-out component from automatically signing in
    event.preventDefault();
    event.stopPropagation();
  }

  editProfile(event: MouseEvent) {
    // TODO open profile modal
  }
  async saveProfileImage(event: Event) {
    const element: HTMLInputElement = event.currentTarget as HTMLInputElement;
    if (element && element.files) {
      this.nftStorage.storeImage(element.files[0]);
    }
  }
}
