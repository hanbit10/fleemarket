import { Component, HostListener, OnInit } from '@angular/core';
import { CardsService } from 'src/app/services/cards.service';
import { Product } from 'src/app/models/product';
import { getNumberOfCurrencyDigits } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
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
    user: { userId: this._authService.getUserId(), email: this._authService.getUserEmail() }
  };

  screenMode: string;
  selectedFiles?: FileList;
  previews: string[] = [];
  imagename: string[] = [];
  multipleImages: string[] = [];
  counts: boolean;
  numberOfFiles: number = null;
  isDataIncorrect: boolean = false;
  warningMsg: string;

  constructor(
    private cardsService: CardsService,
    private _authService: AuthService,
    private router: Router
  ) { }

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
    const text =
      (this.products != undefined &&
        this.products.title != undefined &&
        this.products.category != '' &&
        this.products.district != '' &&
        this.products.price != undefined &&
        this.products.description != '' &&
        this.products.imageUrl != undefined) ||
      (this.products.dealType == 'buy' &&
        this.products.title != undefined &&
        this.products.category != '' &&
        this.products.district != '' &&
        this.products.price == undefined &&
        this.products.description != '' &&
        this.products.imageUrl != undefined) ||
      (this.products.dealType == 'freecycle' &&
        this.products.title != undefined &&
        this.products.category != '' &&
        this.products.district != '' &&
        this.products.price == undefined &&
        this.products.description != '' &&
        this.products.imageUrl != undefined)
    return text;
  }

  onFileSelect(event: any): void {
    this.selectedFiles = event.target.files;
    this.numberOfFiles = this.selectedFiles.length;
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      let reader: FileReader;
      for (let i = 0; i < this.numberOfFiles; i++) {
        reader = new FileReader();
        this.multipleImages = event.target.files;
        this.imagename[i] =
          '../../assets/images/productcardImages/' + event.target.files[i].name;
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
      }
      if (this.numberOfFiles <= 1) {
        this.counts = false;
      } else {
        this.counts = true;
      }
      reader.readAsDataURL(this.selectedFiles[0]);
      this.products.imageUrl = this.imagename;
    }
  }

  saveProduct(): void {
    console.log(this.inputValid);
    if (!this.inputValid()) {
      this.isDataIncorrect = true;
      this.warningMsg = "You must fill out!";
    }
    else if (this.inputValid() && confirm("Are you sure you want to save your post?")) {
      this.isDataIncorrect = false;

      const data = {
        title: this.products.title,
        description: this.products.description,
        price: this.products.price,
        category: this.products.category,
        imageUrl: this.products.imageUrl,
        district: this.products.district,
        dealType: this.products.dealType,
        user: this.products.user,
        contact: this.products.user.email,
      };

      if (this.products.price == undefined) {
        this.products.price = 0;
        data.price = this.products.price;
      }
      this.cardsService.create(data).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate([''])
        },
        error: (error) => {
          console.log(error);
        },
      });

      const formData = new FormData();

      for (let imgs of this.multipleImages) {
        formData.append('files', imgs);
        this.cardsService.createFile(formData);
      }
    } else {
      this.router.navigate(['post'])
    }
  }

  cancelAlert() {
    if (confirm("Your changes could not be saved. Are you sure you want to cancel?")) {
      this.router.navigate([''])
    } else {
      this.router.navigate(['post'])
    }
  }
}
