import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerService } from './playerservice/player.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {
  basicInfoForm!: FormGroup;
  uploadedFile: File | null = null;
  selectedFileName: string | null = null;

  majors = ['Analytics', 'Marketing Services', 'Tech'];
  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  constructor(private fb: FormBuilder, private router: Router, private playerService: PlayerService) {}

  ngOnInit(): void {
    this.basicInfoForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      fullName: ['', [Validators.required]],
      major: ['', [Validators.required]],
      employeeId: ['', [Validators.required]],
      photo: [null], // Optional file upload

      // Jersey details
      jerseyName: ['', [Validators.maxLength(30)]],
      gender: ['', [Validators.required]],
      jerseyNumber: [null, [Validators.min(0), Validators.max(99)]],
      size: ['', [Validators.required]],

      // Role selection
    role: ['', [Validators.required]]
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Validate size (max 100MB)
      if (file.size <= 100 * 1024 * 1024) {
        this.uploadedFile = file;
        this.selectedFileName = file.name;

        this.basicInfoForm.patchValue({ photo: file });
        this.basicInfoForm.get('photo')?.updateValueAndValidity();
      } else {
        alert('File is too large! Max size allowed is 100MB.');
        this.uploadedFile = null;
        this.selectedFileName = null;
        this.basicInfoForm.patchValue({ photo: null });
      }
    }
  }

  onNext(): void {
    if (this.basicInfoForm.valid) {
      const formData = this.basicInfoForm.value;
      const player = {
        email: formData.email,
        name: formData.fullName,
        empId: formData.employeeId,
        department: formData.major,

        // Jersey details
        jerseyName: formData.jerseyName || null,
        gender: formData.gender,
        jerseyNumber: formData.jerseyNumber !== null ? formData.jerseyNumber : null,
        size: formData.size,
         role: formData.role
      };

      console.log("player == ", player);

      // If your service expects FormData (for file + json), you may need to send multipart.
      // For now I keep your original playerService.create(player, file) contract.
      this.playerService.create(player, this.uploadedFile ?? undefined).subscribe({
        next: (res) => {
          console.log('Player created:', res);
          this.playerService.setPlayer({
            ...res,
            photoFile: this.uploadedFile
          });
          this.router.navigate(['/registration/preview']);
        },
        error: (err) => {
          if (err.status === 409) {
            alert('User already exists. Please use a different email or employee ID.');
            this.basicInfoForm.reset(); // Reset the form on 409
            this.uploadedFile = null;
            this.selectedFileName = null;
          } else {
            console.error('Error creating player:', err);
            alert('Failed to submit the form. Please try again.');
          }
        }
      });
    } else {
      this.basicInfoForm.markAllAsTouched();
    }
  }
}
