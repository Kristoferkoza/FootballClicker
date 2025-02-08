import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../_services/users/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [UsersService],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent implements OnInit {
  createForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.createForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    });
  }

  get firstName() {
    return this.createForm.get('firstName')!;
  }

  get lastName() {
    return this.createForm.get('lastName')!;
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      const newUser = {
        name: this.createForm.value.firstName,
        surname: this.createForm.value.lastName,
        points: 0
      };

      this.usersService.create(newUser).subscribe({
        next: () => {
          this.router.navigate(['/select-account']);
        },
        error: (err: any) => {
          console.error('Błąd podczas tworzenia użytkownika:', err);
        }
      });
    }
  }

  navigateBack(): void {
    this.router.navigate(['/select-account']);
  }
}
