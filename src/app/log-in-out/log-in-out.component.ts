import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
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
  gamerImgSrc!: string;
  isReady = false; // set to true when wallet connection has been made
  account!: Account;

  constructor(
    private nearService: NearConnectionService,
    private eRef: ElementRef
  ) {
    this.nearService.getAccount().subscribe((account) => {
      this.account = account;
      this.isReady = true;
      if (!this.isLoggedIn()) {
        this.gamerImgSrc = this.defaultImgSrc;
      } else {
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

  private isLoggedIn() {
    return false;
  }

  ngOnInit(): void {}
}
