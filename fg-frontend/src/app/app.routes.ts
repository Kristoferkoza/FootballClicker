import { Routes } from '@angular/router';
import { ClickerComponent } from './clicker/clicker.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SelectAccountComponent } from './select-account/select-account.component';
import { CardsComponent } from './cards/cards.component';

export const routes: Routes = [
    {
        path: 'clicker',
        component: ClickerComponent,
    },
    {
        path: 'select-account',
        component: SelectAccountComponent,
    },
    {
        path: 'cards',
        component: CardsComponent,
    },
    {
        path: '',
        redirectTo: '/select-account',
        pathMatch: 'full',
    },
    {
        path: '**',
        component: PageNotFoundComponent,
    },
];
