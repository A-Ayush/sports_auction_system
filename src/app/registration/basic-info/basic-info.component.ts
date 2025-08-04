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

  constructor(private fb: FormBuilder, private router: Router,private playerService: PlayerService) {}

  ngOnInit(): void {
    this.basicInfoForm = this.fb.group({
      fullName: ['', [Validators.required]],
      major: ['', [Validators.required]],
      employeeId: ['', [Validators.required]],
      photo: [null] // Optional file upload
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
      name: formData.fullName,
      empId: formData.employeeId,
      department: formData.major
    };

    console.log("player == " + player);

    this.playerService.create(player, this.uploadedFile!).subscribe({
      next: (res) => {
        console.log('Player created:', res);
        // Optionally store res (player object)
        this.router.navigate(['/registration/event-preferences']);
      },
      error: (err) => {
        console.error('Error creating player:', err);
        alert('Failed to submit the form. Please try again.');
      }
    });
  } else {
    this.basicInfoForm.markAllAsTouched();
  }
  }
}
