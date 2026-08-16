import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private searchText = new BehaviorSubject<string>('');
  sharedSearchText = this.searchText.asObservable();

  constructor() { }
  
  setSearchText(text: any) {
    this.searchText.next(text);
  }
}
