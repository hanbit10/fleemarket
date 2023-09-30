import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { ProductRegisterPageComponent } from './pages/product-register-page/product-register-page.component';
import { MypageComponent } from './components/mypage/mypage.component';
import { ProductCardListComponent } from './components/product-card-list/product-card-list.component';
import { AfterSearchComponent } from './pages/after-search/after-search.component';
import { DetailOpenGuard } from './pages/product-detail-page/guard/detail-open.guard';
import { AfterLoginComponent } from './pages/after-login/after-login.component';
import { AppComponent } from './app.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';

const routes: Routes = [
  { path: '', component: MainPageComponent,
    children: [
      { path: '', component: ProductCardListComponent },
      { path: 'products', component: ProductCardListComponent },
    ]
  },
  { path: 'welcome', component: AfterLoginComponent, },
  { path: 'search', component: AfterSearchComponent, },
  {
    path: 'products/:productId', component: ProductDetailPageComponent,
    data: {
      path: 'products/:productId',
    },
    canActivate: [DetailOpenGuard],
  },
  {
    path: 'login', component: LoginPageComponent,
    data: {
      path: 'login',
    },
  },
  {
    path: 'signup', component: SignupPageComponent,
    data: {
      path: 'signup',
    },
  },
  {
    path: 'post', component: ProductRegisterPageComponent,
    data: {
      path: 'post',
    },
    canActivate: [DetailOpenGuard],
  },
  {
    path: 'mypage',
    component: MypageComponent,
    data: {
      path: 'mypage',
    },
    canActivate: [DetailOpenGuard],
  },
  { path: 'edit/:productId', component: ProductEditComponent, }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [ MainPageComponent ];
