import { Component, Input, OnInit } from '@angular/core';
import { PRODUCTS } from 'src/app/models/mock-product';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit {

  @Input() productId: string;
  @Input() productTitle: string;
  @Input() productCategory: string;
  @Input() productPrice: number;
  @Input() district: string;
  @Input() createdAt: string;
  @Input() productImage: string[];
  @Input() productDescription: string;
  @Input() contact: string;
  
  product: Product;
  slides: string[]; 
  currentIndex: number = 0;
  userEmail: string = this._authservice.getUserEmail();

  getCurrentSlideUrl(): string{
    return this.slides[this.currentIndex];
  }

  goToNext(): void {
    const isLastSlide = this.currentIndex === this.slides.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;
    this.currentIndex = newIndex;
  }

  goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide
      ? this.slides.length - 1
      : this.currentIndex - 1;
    this.currentIndex = newIndex;
  }

  constructor(private _authservice: AuthService,) { }

  ngOnInit(): void {
    this.slides = this.productImage;
  }

}
