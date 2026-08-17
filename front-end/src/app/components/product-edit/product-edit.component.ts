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

  updateCard(): void {
    if (!this.inputValid()) {
      this.isDataIncorrect = true;
      this.warningMsg = 'You must fill out!';
      return;
    }

    if (!confirm('Are you sure you want to change your post?')) {
      return;
    }

    this.isDataIncorrect = false;

    const updateProduct = (imageUrls: string[]) => {
      const data = {
        title: this.products.title,
        description: this.products.description,
        price: this.products.price ?? 0,
        category: this.products.category,
        imageUrl: imageUrls,
        district: this.products.district,
        dealType: this.products.dealType,
        user: this.products.user,
      };

      this.cardsService.update(this.products._id, data).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['mypage']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    };

    // No new images selected
    if (!this.multipleImages || this.multipleImages.length === 0) {
      updateProduct(this.products.imageUrl);
      return;
    }

    // Upload new images to S3
    const formData = new FormData();

    for (const image of this.multipleImages) {
      formData.append('files', image);
    }

    this.cardsService.createFile(formData).subscribe({
      next: (response: any) => {
        const imageUrls = response.files.map((file: any) => file.location);

        updateProduct(imageUrls);
      },
      error: (error) => {
        console.log(error);
      },
    });
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
