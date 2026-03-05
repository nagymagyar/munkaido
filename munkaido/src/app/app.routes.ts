import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Work } from './work/work';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: 'work', component: Work }
];

