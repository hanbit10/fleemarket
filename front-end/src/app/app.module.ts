import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductCardListComponent } from './components/product-card-list/product-card-list.component';
import { HeaderComponent } from './components/header/header.component';
import { MainPageNavComponent } from './components/main-page-nav/main-page-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { FloatBtnComponent } from 'src/app/components/float-btn/float-btn.component';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MypageComponent } from './components/mypage/mypage.component';
import { ProductInformationComponent } from './components/product-information/product-information.component';
import { ProductRegisterPageComponent } from './pages/product-register-page/product-register-page.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './components/product-card-list/filter.pipe';
import { AfterSearchComponent } from './pages/after-search/after-search.component';
import { AfterLoginComponent } from './pages/after-login/after-login.component';
import { CardsService } from './services/cards.service';
import { ShareDataService } from './services/share-data.service';
import { ProductEditComponent } from './components/product-edit/product-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductCardListComponent,
    HeaderComponent,
    MainPageNavComponent,
    FooterComponent,
    FloatBtnComponent,
    routingComponents,
    ProductDescriptionComponent,
    ProductDetailPageComponent,
    HeaderComponent,
    SignupPageComponent,
    LoginPageComponent,
    MypageComponent,
    ProductInformationComponent,
    ProductRegisterPageComponent,
    FilterPipe,
    AfterSearchComponent,
    AfterLoginComponent,
    ProductEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthService, CardsService, ShareDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
