import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { Account } from 'near-api-js';
import { NearConnectionService } from '../near-connection.service';

@Component({
  selector: 'app-log-in-out',
  templateUrl: './log-in-out.component.html',
  styleUrls: ['./log-in-out.component.sass'],
})
export class LogInOutComponent implements OnInit {
  defaultImgSrc = 'assets/default-gamer.svg';
  isDropDownOpen!: boolean;
  gamerImgSrc = this.defaultImgSrc;
  isReady = false; // set to true when wallet connection has been made
  account!: Account;
  @HostBinding('class.signed-in') isSignedIn: boolean = false;
  @HostListener('click', ['$event'])
  click(event: MouseEvent) {
    this.profileImgClick(event);
  }
  constructor(private nearService: NearConnectionService) {
    this.nearService.getAccount().subscribe((account) => {
      this.account = account;
      this.isReady = true;
      if (!this.nearService.isSignedIn()) {
        this.gamerImgSrc = this.defaultImgSrc;
        this.isSignedIn = false;
      } else {
        this.isSignedIn = true;
        this.nearService
          .getProfileImageSrc(account.accountId)
          .then((src: string) => {
            this.gamerImgSrc = src.replace('ipfs://', 'https://ipfs.io/ipfs/');
          });
      }
    });
  }

  profileImgClick(event: MouseEvent) {
    if (!this.isReady) return;
    if (this.nearService.isSignedIn()) {
      this.isDropDownOpen = !this.isDropDownOpen;
      event.stopPropagation();
    } else {
      this.nearService.login();
    }
  }
  appAccountMenuClick(event: MouseEvent) {
    // prevent closing the menu when we click inside the menu
    event.stopPropagation();
  }

  ngOnInit(): void {}
}
