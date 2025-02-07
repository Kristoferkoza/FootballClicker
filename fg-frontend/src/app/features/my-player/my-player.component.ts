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

@Component({
  selector: 'app-my-player',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatProgressSpinnerModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  providers: [KitElementsService],
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
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.kitElementsService.findAll().subscribe(
      (kitElements: any) => {
        
        this.boots = kitElements.filter((element: KitElement) => element.kit_part === KitPart.BOOTS);
        this.socks = kitElements.filter((element: KitElement) => element.kit_part === KitPart.SOCKS);
        this.shorts = kitElements.filter((element: KitElement) => element.kit_part === KitPart.SHORTS);
        this.tshirts = kitElements.filter((element: KitElement) => element.kit_part === KitPart.TSHIRT);

        this.loading = false;
      },
      error => {
        console.error('Błąd podczas pobierania danych:', error);
        this.loading = false;
      }
    );
  }
}
