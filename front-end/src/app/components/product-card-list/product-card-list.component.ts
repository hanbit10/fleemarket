import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CardsService } from 'src/app/services/cards.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-product-card-list',
  templateUrl: './product-card-list.component.html',
  styleUrls: ['./product-card-list.component.scss']
})
export class ProductCardListComponent implements OnInit {

  products: Product[];
  product: Product;
  isMypost: boolean = false;
  currentRoute: any;
  
  constructor (
    private _cardservice: CardsService,
    private _authservice: AuthService,
    private _shareservice: ShareDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentRoute = event;
    });
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  // todo: username -> userid
  private writer: string = this._authservice.getUserId();
  searchText: string;

  ngOnInit() {
    if(this.currentRoute.url === "/search") {
      this.searchedProducts();  
    } else if (this.currentRoute.url === "/mypage" && this.writer !== null) {
      this.myProducts();
    } else {
      this.retrieveProducts();
    }
  }
  
  retrieveProducts() {
    this._cardservice.getAll().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (e) => console.log(e)
    });
  }
  searchedProducts() {
    this._shareservice.sharedSearchText.subscribe((data) => {
      this.searchText = data;
    });
    this._cardservice.searchByTitle(this.searchText).subscribe(res => {
      this.products = res;
    });
  }
  myProducts() {
    this._cardservice.getProductByUser(this.writer).subscribe({
      next: (data) => {
        this.products = data;
        this.isMypost = true;
      },
      error: (e) => console.log(e)
    });
  }
  deleteProduct(productId: string) {
    if(confirm("Are you sure you want to delete this post?")) {
      this._cardservice.delete(productId).subscribe(data => {
        this.router.navigate(['mypage']);
      })
    } else {
    }
  }
}

