import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MicroPaymentsService } from '../../_services/micropayments/micropayments.service';
import { UsersService } from '../../_services/users/users.service';
import { Micropayment } from '../../_models/micropayments/micropayment.model';

@Component({
    selector: 'app-shop',
    standalone: true,
    imports: [CommonModule, HttpClientModule],
    templateUrl: './shop.component.html',
    styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
    selectedUserId: string = '';
    micropayments: Micropayment[] = [];

    constructor(
        private micropaymentsService: MicroPaymentsService,
        private usersService: UsersService
    ) {}

    ngOnInit() {
        this.selectedUserId = this.usersService.getSelectedAccountId()!;
        this.micropaymentsService.findAll().subscribe((micropayments: any) => {
            this.micropayments = micropayments as Micropayment[];
        });
    }
}
