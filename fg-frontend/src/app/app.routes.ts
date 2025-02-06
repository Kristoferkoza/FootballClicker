import { Routes } from '@angular/router';
import { ClickerComponent } from './features/clicker/clicker.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SelectAccountComponent } from './features/select-account/select-account.component';
import { CardsComponent } from './features/cards/cards.component';
import { PacksComponent } from './features/packs/packs.component';
import { ShopComponent } from './features/shop/shop.component';
import { SettingsComponent } from './features/settings/settings.component';
import { CreateAccountComponent } from './features/create-account/create-account.component';
import { MyPlayerComponent } from './features/my-player/my-player.component';

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
        path: 'create-account',
        component: CreateAccountComponent,
    },
    {
        path: 'cards',
        component: CardsComponent,
    },
    {
        path: 'shop',
        component: ShopComponent,
    },
    {
        path: 'packs',
        component: PacksComponent,
    },
    {
        path: 'my-player',
        component: MyPlayerComponent,
    },
    {
        path: 'settings',
        component: SettingsComponent,
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
