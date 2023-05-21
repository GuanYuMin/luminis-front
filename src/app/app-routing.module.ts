import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ClientGuard } from './client.guard';
import { AboutUsComponent } from './shared/components/about-us/about-us.component';
import { HomeComponent } from './shared/components/home/home.component';
import { TalleresComponent } from './shared/components/talleres/talleres.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { TallerComponent } from './shared/components/taller/taller.component';
import { MembresiasComponent } from './shared/components/membresias/membresias.component';
import { BlogComponent } from './views/blog/blog.component';
import { FaqsComponent } from './views/faqs/faqs.component';
import { AvisoComponent } from './views/aviso/aviso.component';
import { TycComponent } from './views/tyc/tyc.component';
import { ConfirmacionComponent } from './views/confirmacion/confirmacion.component';
import { BlogListComponent } from './views/blog-list/blog-list.component';

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
  },
  {
    path: 'talleres',
    component: TalleresComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'taller',
    component: TallerComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'perfil',
    component: ProfileComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'membresias',
    component: MembresiasComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'blog',
    component: BlogComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'blog-list',
    component: BlogListComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'faqs',
    component: FaqsComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'aviso',
    component: AvisoComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'tyc',
    component: TycComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'confirmacion',
    component: ConfirmacionComponent,
    canActivate: [ClientGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled',
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
