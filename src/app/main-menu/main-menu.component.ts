import { Component, OnInit } from '@angular/core';
import { NearConnectionService } from '../near-connection.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.sass'],
})
export class MainMenuComponent implements OnInit {
  menuItems: { name: string }[] = [
    { name: 'GAMES' },
    { name: 'NFT' },
    { name: 'ABOUT' },
    { name: 'WEB3' },
  ];
  defaultImgSrc = 'assets/default-gamer.svg';
  gamerImgSrc = '';
  constructor(private nearService: NearConnectionService) {
    if (!this.isLoggedIn()) {
      this.gamerImgSrc = this.defaultImgSrc;
    }
  }

  loginout() {
    this.nearService.login();
  }

  private isLoggedIn() {
    return false;
  }

  ngOnInit(): void {}
}
