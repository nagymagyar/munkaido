import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './work.html',
  styleUrl: './work.css',
})
export class Work {
  workForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.workForm = this.fb.group({
      projectName: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', [Validators.required, this.futureDateValidator]],
      hours: ['', [Validators.required, Validators.min(0.5), Validators.max(12)]],
      description: ['', [Validators.required, Validators.maxLength(30)]]
    });
  }

  // Custom validator to prevent future dates
  futureDateValidator(control: any) {
    if (!control.value) return null;
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return selectedDate <= today ? null : { futureDate: true };
  }

  get f() {
    return this.workForm.controls;
  }

  isFieldTouched(fieldName: string): boolean {
    const field = this.workForm.get(fieldName);
    return field ? field.touched : false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.workForm.get(fieldName);
    if (!field) return '';

    if (field.hasError('required')) {
      return 'Ez a mező kötelező';
    }
    if (field.hasError('minlength')) {
      return 'Minimum 3 karakter szükséges';
    }
    if (field.hasError('min')) {
      return 'Minimum 0.5 óra lehet';
    }
    if (field.hasError('max')) {
      return 'Maximum 12 óra lehet';
    }
    if (field.hasError('maxlength')) {
      return 'Maximum 30 karakter megengedett';
    }
    if (field.hasError('futureDate')) {
      return 'A dátum nem lehet jövőbeli';
    }

    return '';
  }

  onSubmit() {
    this.submitted = true;
    if (this.workForm.valid) {
      console.log('Form Submitted:', this.workForm.value);
      alert('Sikeres regisztráció!\n\nAdatok:\nProjekt: ' + this.workForm.value.projectName + 
            '\nDátum: ' + this.workForm.value.date + 
            '\nÓrák: ' + this.workForm.value.hours + 
            '\nLeírás: ' + this.workForm.value.description);
      this.workForm.reset();
      this.submitted = false;
    }
  }
}

