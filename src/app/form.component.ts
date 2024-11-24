import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  editIndex!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      middleName: [''],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      dob: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParams['id'];
    if (id !== undefined) {
      this.isEdit = true;
      this.editIndex = +id;
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users[this.editIndex]) {
        this.form.patchValue(users[this.editIndex]);
      }
    }
  }

  calculateAge(): void {
    const dob = new Date(this.form.value.dob);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      this.form.patchValue({ age: age - 1 });
    } else {
      this.form.patchValue({ age: age });
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (this.isEdit) {
      users[this.editIndex] = this.form.value;
    } else {
      users.push(this.form.value);
    }

    localStorage.setItem('users', JSON.stringify(users));
    this.router.navigate(['/']);
  }
}
