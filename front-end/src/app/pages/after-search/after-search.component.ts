import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-after-search',
  templateUrl: './after-search.component.html',
  styleUrls: ['./after-search.component.scss']
})
export class AfterSearchComponent implements OnInit {
  isSearched: boolean;
  inputText: string;
  searchText: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _shareservice: ShareDataService,
  ) { }
  
  ngOnInit(): void {
    this._shareservice.sharedSearchText.subscribe((data) => {
      this.searchText = data;
    });
  }
}
