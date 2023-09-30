import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-main-page-nav',
  templateUrl: './main-page-nav.component.html',
  styleUrls: ['./main-page-nav.component.scss']
})
export class MainPageNavComponent implements OnInit {
    
  screenMode: string;
  searchInput: string;

  constructor(
    private router: Router,
    private _shareservice: ShareDataService,
  ) {}

  ngOnInit(): void {
    let screenWidth = window.innerWidth;
    (screenWidth > 767) ? this.screenMode = "web" : this.screenMode = "mobile"
  }
  @HostListener ('window:resize', ['$event'])
  onResize(event: any) {
    let screenWidth = window.innerWidth;
    (screenWidth > 767) ? this.screenMode = "web" : this.screenMode = "mobile"
  }
  searchText() {
    this._shareservice.setSearchText(this.searchInput);
    this.router.navigate(['search']);
  }  
}
