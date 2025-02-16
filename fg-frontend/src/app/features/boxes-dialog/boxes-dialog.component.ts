import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { KitElementsService } from '../../_services/kitelements/kit-elements.service';
import { KitElement } from '../../_models/kitelements/kit-element.model';

@Component({
    selector: 'app-boxes-dialog',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule],
    providers: [KitElementsService],
    templateUrl: './boxes-dialog.component.html',
    styleUrl: './boxes-dialog.component.scss',
})
export class BoxesDialogComponent implements OnInit {
  kitElement: KitElement | null = null;
  loading: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { kitElementId: string },
    private kitElementsService: KitElementsService,
    private dialogRef: MatDialogRef<BoxesDialogComponent>
  ) {}

  ngOnInit() {
    this.kitElementsService.findOne(this.data.kitElementId).subscribe({
      next: (kitElement: any) => {
        this.kitElement = kitElement;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading kit element:', err);
        this.loading = false;
      }
    });
  }

  getRarityClass(rarity: string): string {
    return rarity.toLowerCase();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
