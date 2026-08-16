import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  public isSearched: boolean;
  public inputText: string;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.router.navigate(['']);
  }
  searchText(text: string) {
    this.inputText = text;
    if(this.inputText.length !== 0) {
      this.isSearched = true;
      this.router.navigate(['search']);
    }
  }
}
