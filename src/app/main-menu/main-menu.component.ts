import { Component, OnInit } from '@angular/core';
import { NearConnectionService } from '../near-connection.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.sass'],
})
export class MainMenuComponent implements OnInit {
  menuItems: { name: string; route: string }[] = [
    { name: 'GAMES', route: '/games' },
    { name: 'NFT', route: '/nft' },
    { name: 'ABOUT', route: '/about' },
    { name: 'WEB3', route: '/web3' },
  ];

  constructor(private nearService: NearConnectionService) {}

  loginout() {
    this.nearService.login();
  }

  ngOnInit(): void {}
}
