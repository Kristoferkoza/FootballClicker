import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MicroPaymentsService } from '../../_services/micropayments/micropayments.service';
import { UsersService } from '../../_services/users/users.service';
import { Micropayment } from '../../_models/micropayments/micropayment.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-shop',
    standalone: true,
    imports: [CommonModule, HttpClientModule, MatProgressSpinnerModule],
    templateUrl: './shop.component.html',
    styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
    selectedUserId: string = '';
    loading: boolean = true;
    micropayments: Micropayment[] = [];
    currencyMicropayments: Micropayment[] = [];
    itemMicropayments: Micropayment[] = [];

    constructor(
        private micropaymentsService: MicroPaymentsService,
        private usersService: UsersService
    ) {}

    ngOnInit() {
        this.selectedUserId = this.usersService.getSelectedAccountId()!;
        this.micropaymentsService.findAll().subscribe((micropayments: any) => {
            this.micropayments = micropayments;
            this.splitMicropayments();
            this.loading = false;
        });
    }

    private splitMicropayments(): void {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        this.currencyMicropayments = this.micropayments.filter(mp => !uuidRegex.test(mp.reward));
        this.itemMicropayments = this.micropayments.filter(mp => uuidRegex.test(mp.reward));
    }
}
