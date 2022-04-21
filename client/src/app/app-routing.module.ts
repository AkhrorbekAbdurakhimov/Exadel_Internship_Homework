import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';


const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'categories', component: CategoriesPageComponent },
  { path: '', component: MainPageComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
