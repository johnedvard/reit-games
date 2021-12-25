import { Component, OnInit } from '@angular/core';
import { NearConnectionService } from '../near-connection.service';

@Component({
  selector: 'app-log-in-out',
  templateUrl: './log-in-out.component.html',
  styleUrls: ['./log-in-out.component.sass'],
})
export class LogInOutComponent implements OnInit {
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
