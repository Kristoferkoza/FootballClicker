import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { UsersService } from '../../_services/users/users.service';
import { User } from '../../_models/users/user.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserKitElementConfigService } from '../../_services/userkitelementconfig/user-kitelementconfig.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        CommonModule,
        MatDividerModule,
        MatProgressSpinnerModule,
    ],
    providers: [UsersService, UserKitElementConfigService],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
    selectedUser!: User;
    bonus: number = 0;
    loading: boolean = true;

    constructor(
        private router: Router,
        private usersService: UsersService,
        private userKitElementConfigService: UserKitElementConfigService
    ) {}

    ngOnInit(): void {
        const userId = this.usersService.getSelectedAccountId()!;

        this.usersService.findOne(userId).subscribe(
            (user) => {
                this.selectedUser = user as User;

                this.userKitElementConfigService
                    .getUserKitConfig(userId)
                    .subscribe(
                        (config) => {
                            this.bonus = config.bonus;
                            this.loading = false;
                        },
                        (error) => {
                            console.error(
                                'Błąd podczas pobierania bonusu:',
                                error
                            );
                            this.loading = false;
                        }
                    );
            },
            (error) => {
                console.error('Błąd podczas pobierania użytkownika:', error);
                this.loading = false;
            }
        );
    }

    navigateTo(path: string) {
        this.router.navigate([path]);
    }
}
