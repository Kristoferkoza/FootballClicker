import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { KitElement } from '../../_models/kitelements/kit-element.model';
import { KitElementsService } from '../../_services/kitelements/kit-elements.service';
import { KitPart } from '../../_enums/kit-part.enum';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { trigger, transition, style, animate } from '@angular/animations';
import { UserKitElementsService } from '../../_services/userkitelement/user-kitelements.service';
import { UsersService } from '../../_services/users/users.service';

@Component({
  selector: 'app-my-player',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatProgressSpinnerModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  providers: [KitElementsService, UserKitElementsService, UsersService],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('0.3s ease', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  templateUrl: './my-player.component.html',
  styleUrl: './my-player.component.scss'
})
export class MyPlayerComponent implements OnInit {
  loading: boolean = true;
  kitElements!: KitElement[];

  boots!: KitElement[];
  selectedBoot: KitElement | null = null;
  socks!: KitElement[];
  selectedSock: KitElement | null = null;
  shorts!: KitElement[];
  selectedShort: KitElement | null = null;
  tshirts!: KitElement[];
  selectedTshirt: KitElement | null = null;

  constructor (
    private kitElementsService: KitElementsService,
    private userKitElementsService: UserKitElementsService,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.userKitElementsService.getUserKitElements(this.usersService.getSelectedAccountId()!).subscribe(
      (data: any[]) => {  
        this.boots = data
          .filter(item => item.kitElement && item.kitElement.kit_part === KitPart.BOOTS)
          .map(item => item.kitElement);
  
        this.socks = data
          .filter(item => item.kitElement && item.kitElement.kit_part === KitPart.SOCKS)
          .map(item => item.kitElement);
  
        this.shorts = data
          .filter(item => item.kitElement && item.kitElement.kit_part === KitPart.SHORTS)
          .map(item => item.kitElement);
  
        this.tshirts = data
          .filter(item => item.kitElement && item.kitElement.kit_part === KitPart.TSHIRT)
          .map(item => item.kitElement);
  
        this.loading = false;
      },
      error => {
        console.error('Błąd podczas pobierania danych:', error);
        this.loading = false;
      }
    );
  }
  
  
}
