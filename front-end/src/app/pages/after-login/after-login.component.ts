import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['./after-login.component.scss']
})
export class AfterLoginComponent implements OnInit {
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
