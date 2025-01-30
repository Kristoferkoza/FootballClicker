import { Routes } from '@angular/router';
import { ClickerComponent } from './clicker/clicker.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: 'clicker',
        component: ClickerComponent,
    },
    {
        path: '',
        redirectTo: '/clicker',
        pathMatch: 'full',
    },
    {
        path: '**',
        component: PageNotFoundComponent,
    },
];
