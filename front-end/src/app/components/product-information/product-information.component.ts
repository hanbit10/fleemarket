import { Component, HostListener, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { Product } from '../../models/product';
import { getNumberOfCurrencyDigits } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.scss'],
})
export class ProductInformationComponent implements OnInit {
  tradeOptionRadioButton = ['sell', 'buy', 'freecycle'];

  categoryType = [
    'Book',
    'Clothing',
    'Food',
    'Electronics',
    'Kitchen',
    'Furniture',
    'Sporting goods',
    'Hobbies',
  ];

  districtType = [
    'Markt',
    'Theater',
    'Lindenplatz',
    'St. Jakob',
    'Westpark',
    'Kronenberg',
    'Hörn',
    'Ponttor',
    'Hansemannplatz',
    'Soers',
    'Jülicher Straße',
    'Kalkofen',
    'Kaiserplatz',
    'Adalbertsteinweg',
    'Panneschopp',
    'Rothe Erde',
    'Forst',
    'Frankenberger Viertel',
    'Burtscheid',
    'Marschiertor',
    'Beverau',
  ];

  products: Product = {
    user: {
      userId: this._authService.getUserId(),
      email: this._authService.getUserEmail(),
    },
  };

  screenMode: string;
  selectedFiles?: FileList;
  previews: string[] = [];
  imagename: string[] = [];
  multipleImages: File[] = [];
  counts: boolean;
  numberOfFiles: number = null;
  isDataIncorrect: boolean = false;
  warningMsg: string;

  constructor(
    private cardsService: CardsService,
    private _authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    let screenWidth = window.innerWidth;
    screenWidth > 767
      ? (this.screenMode = 'web')
      : (this.screenMode = 'mobile');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let screenWidth = window.innerWidth;
    screenWidth > 767
      ? (this.screenMode = 'web')
      : (this.screenMode = 'mobile');
  }

  inputValid(): boolean {
    if (
      !this.products.title ||
      !this.products.category ||
      !this.products.district ||
      !this.products.description ||
      this.multipleImages.length === 0
    ) {
      return false;
    }

    if (
      this.products.dealType === 'sell' &&
      this.products.price === undefined
    ) {
      return false;
    }

    return true;
  }

  onFileSelect(event: any): void {
    this.selectedFiles = event.target.files;
    this.numberOfFiles = this.selectedFiles.length;
    this.previews = [];

    if (this.selectedFiles && this.selectedFiles.length > 0) {
      this.multipleImages = Array.from(this.selectedFiles);

      for (let i = 0; i < this.numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }

      this.counts = this.numberOfFiles > 1;
    }
  }

  saveProduct(): void {
    if (!this.inputValid()) {
      this.isDataIncorrect = true;
      this.warningMsg = 'You must fill out!';
      return;
    }

    if (!confirm('Are you sure you want to save your post?')) {
      this.router.navigate(['post']);
      return;
    }

    this.isDataIncorrect = false;

    const formData = new FormData();

    for (const img of this.multipleImages) {
      formData.append('files', img);
    }

    // Upload images FIRST
    this.cardsService.createFile(formData).subscribe({
      next: (response: any) => {
        console.log('S3 upload:', response);

        this.products.imageUrl = response.files.map(
          (file: any) => file.location,
        );

        const data = {
          title: this.products.title,
          description: this.products.description,
          price: this.products.price ?? 0,
          category: this.products.category,
          imageUrl: this.products.imageUrl,
          district: this.products.district,
          dealType: this.products.dealType,
          user: this.products.user,
          contact: this.products.user.email,
        };

        // Save product AFTER S3 upload
        this.cardsService.create(data).subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['']);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },

      error: (error) => {
        console.log('S3 upload failed:', error);
      },
    });
  }

  cancelAlert() {
    if (
      confirm(
        'Your changes could not be saved. Are you sure you want to cancel?',
      )
    ) {
      this.router.navigate(['']);
    } else {
      this.router.navigate(['post']);
    }
  }
}
