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
        setTimeout(() => {
            this.addRippleEffects();
        }, 0);
        
    }

    private addRippleEffects() {
        document.querySelectorAll('.sidebar__item').forEach(item => {
            item.addEventListener('click', (e: any) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    width: 20px; height: 20px;
                    background: rgba(255,255,255,0.3);
                    border-radius: 50%;
                    transform: translate(-50%, -50%) scale(0);
                    animation: ripple 0.6s ease-out;
                `;
                
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                item.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    navigateTo(path: string) {
        this.router.navigate([path]);
    }
}
