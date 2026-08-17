import { Component, HostListener, OnInit } from '@angular/core';
// import { CardsService } from 'src/app/services/cards.service';
import { CardsService } from '../../services/cards.service';
import { Product } from '../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
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
    user: this._auth.getUser(),
  };

  screenMode: string;
  selectedFiles?: FileList;
  previews: string[] = [];
  imagename: string[] = [];
  multipleImages: File[] = [];
  counts: boolean;
  numberOfFiles: number;
  isDataIncorrect: boolean = false;
  warningMsg: string;

  constructor(
    private cardsService: CardsService,
    private activatedRoute: ActivatedRoute,
    private _auth: AuthService,
    private router: Router,
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params['productId'])
        cardsService.getProduct(params['productId']).subscribe((editCard) => {
          this.products = editCard;
          this.imagePreview();
        });
    });
  }

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

  onFileSelect(event: any): void {
    this.selectedFiles = event.target.files;
    this.numberOfFiles += this.selectedFiles.length;

    if (this.selectedFiles && this.selectedFiles.length > 0) {
      this.multipleImages = Array.from(this.selectedFiles);

      for (let i = 0; i < this.selectedFiles.length; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }

      this.counts = this.numberOfFiles > 1;
    }
  }

  imagePreview() {
    this.previews = [this.products.imageUrl[0]];
    this.numberOfFiles = this.products.imageUrl.length;
    if (this.previews.length > 0) {
      this.counts = true;
    }
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
        this.products.imageUrl != undefined);
    return text;
  }

  updateCard(): void {
    if (!this.inputValid()) {
      this.isDataIncorrect = true;
      this.warningMsg = 'You must fill out!';
    } else if (
      this.inputValid() &&
      confirm('Are you sure you want to change your post?')
    ) {
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
        //contact: this.products.contact,
      };
      if (this.products.price == undefined) {
        this.products.price = 0;
        data.price = this.products.price;
      }
      this.cardsService.update(this.products._id, data).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['mypage']);
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
    }
  }

  cancelAlert() {
    if (
      confirm(
        'Your changes could not be saved. Are you sure you want to cancel?',
      )
    ) {
      this.router.navigate(['mypage']);
    } else {
      this.router.navigate([`/edit/${this.products._id}`]);
    }
  }
}
