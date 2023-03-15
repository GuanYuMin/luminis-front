import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ClientGuard } from './client.guard';
import { AboutUsComponent } from './shared/components/about-us/about-us.component';
import { HomeComponent } from './shared/components/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'about',
    component: AboutUsComponent,
    canActivate: [ClientGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
