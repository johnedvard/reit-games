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

  constructor(private nearService: NearConnectionService) {}

  loginout() {
    this.nearService.login();
  }

  ngOnInit(): void {}
}
