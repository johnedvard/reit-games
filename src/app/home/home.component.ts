import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { Subscription } from 'rxjs/internal/Subscription';
import { NearConnectionService } from '../near-connection.service';
import { ReitToken } from '../reit-token';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit, OnDestroy {
  reitGamesNftId = 'reitgames';
  reitGamesNft!: ReitToken;

  $token!: Subscription;
  constructor(
    private viewportScroller: ViewportScroller,
    private router: Router,
    private nearService: NearConnectionService
  ) {}

  ngOnInit(): void {
    this.$token = this.nearService
      .getNftToken(this.reitGamesNftId)
      .subscribe((token) => {
        console.log('got token', token);
        this.reitGamesNft = token;
      });
  }

  ngAfterViewInit(): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.viewportScroller.scrollToAnchor((<NavigationEnd>e).url.slice(1));
      });
  }

  ngOnDestroy(): void {
    if (this.$token) {
      this.$token.unsubscribe();
    }
  }

  changeNftToken(formData: any): void {
    console.log(formData);
  }
}
