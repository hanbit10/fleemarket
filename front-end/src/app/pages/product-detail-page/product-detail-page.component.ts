import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss']
})
export class ProductDetailPageComponent implements OnInit {
  
  product: Product;
  
  constructor(
    private route: ActivatedRoute,
    private _cardservice: CardsService
  ) { }


  ngOnInit(): void {
    this.getProduct(this.route.snapshot.params['productId']);
  }
  
  getProduct(_id: string): void {
    this._cardservice.getProduct(_id)
      .subscribe({
        next: (data) => {
          this.product = data;
        },
        error: (e) => console.error(e)
      });
  }
}
