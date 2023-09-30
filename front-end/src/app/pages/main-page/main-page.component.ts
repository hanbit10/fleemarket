import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public isSearched: boolean;
  public inputText: string;
  public searched: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }
  
  searchText(text: string) {
    this.inputText = text;
    if(this.inputText.length !== 0) {
      this.isSearched = true;
      this.router.navigate(['search']);
    }
  }
}
