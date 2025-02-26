import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MicroPaymentsService } from '../../_services/micropayments/micropayments.service';
import { UsersService } from '../../_services/users/users.service';
import { Micropayment } from '../../_models/micropayments/micropayment.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from '../../../environments/environment';
import { loadStripe } from '@stripe/stripe-js';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserKitElementsService } from '../../_services/userkitelement/user-kitelements.service';
import { GameService } from '../../_services/game/game.service';

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
    ownedKitElements: string[] = [];

    private stripePromise = loadStripe(environment.stripePublicKey);

    constructor(
        private micropaymentsService: MicroPaymentsService,
        private usersService: UsersService,
        private userKitElementsService: UserKitElementsService,
        private gameService: GameService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.loading = true;
        this.selectedUserId = this.usersService.getSelectedAccountId()!;
        this.userKitElementsService
            .getUserKitElements(this.selectedUserId)
            .subscribe((elements: any[]) => {
                this.ownedKitElements = elements.map(
                    (element) => element.kitElement.id
                );
            });
        this.micropaymentsService.findAll().subscribe((micropayments: any) => {
            this.micropayments = micropayments;
            this.splitMicropayments();
        });
        this.route.queryParams.subscribe((params) => {
            if (params['success']) {
                const micropaymentId = params['micropaymentId'];
                this.micropaymentsService
                    .findOne(micropaymentId)
                    .subscribe((micropayment: any) => {
                        if (
                            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
                                micropayment.reward
                            )
                        ) {
                            this.userKitElementsService
                                .addKitElement(
                                    this.selectedUserId,
                                    micropayment.reward
                                )
                                .subscribe(() => {});
                            console.log(micropayment.reward);
                        } else {
                            let score = this.gameService.getCounter();
                            this.gameService.setCounter(
                                Number(score) + Number(micropayment.reward)
                            );
                            console.log(micropayment.reward);
                        }
                        this.loading = false;

                        this.snackBar.open(
                            `Płatność zakończona. Nagroda została dodana do Twojego konta.`,
                            'Zamknij',
                            {
                                duration: 5000,
                            }
                        );
                    });
            }
            if (params['canceled']) {
                console.log('Płatność anulowana');
            }
            this.loading = false;
        });
    }

    private splitMicropayments(): void {
        const uuidRegex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        this.currencyMicropayments = this.micropayments.filter(
            (mp) => !uuidRegex.test(mp.reward)
        );
        this.itemMicropayments = this.micropayments.filter((mp) =>
            uuidRegex.test(mp.reward)
        );
    }

    formatPrice(price: number): string {
        return (price - 0.01).toFixed(2);
    }

    isOwned(mp: Micropayment): boolean {
        return this.ownedKitElements.includes(mp.reward);
    }

    async purchase(micropayment: Micropayment) {
        if (this.isOwned(micropayment)) {
            return;
        }
        this.loading = true;
        try {
            const response = await fetch(
                'http://localhost:3000/payment/create-session',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        micropayment: micropayment,
                        userId: this.selectedUserId,
                    }),
                }
            );

            const { sessionId } = await response.json();
            const stripe = await this.stripePromise;

            if (stripe) {
                const { error } = await stripe.redirectToCheckout({
                    sessionId,
                });
            } else {
                console.error('Stripe has not loaded.');
            }
        } catch (err) {
            console.error('Błąd podczas przetwarzania płatności:', err);
        } finally {
            this.loading = false;
        }
    }
}
