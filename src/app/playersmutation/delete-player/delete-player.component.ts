import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-player',
  templateUrl: './delete-player.component.html',
  styleUrls: ['./delete-player.component.scss']
})
export class DeletePlayerComponent {
  email: string = '';
  player: any = null;

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    if (this.email) {
      const url = `${environment.apiUrl}/players/getdetails?email=${encodeURIComponent(this.email)}`;
      this.http.get(url).subscribe({
        next: (res) => {
          this.player = res;
        },
        error: (err) => {
          this.player = null;
          if (err.status === 404) {
            alert('No player found with this email.');
          } else {
            alert('Failed to fetch details.');
          }
        }
      });
    } else {
      alert('Please enter a valid email address.');
    }
  }

  onDelete(): void {
    if (this.player?.email) {
      const url = `${environment.apiUrl}/players/delete?email=${encodeURIComponent(this.player.email)}`;
      this.http.delete(url).subscribe({
        next: () => {
          alert('Player deleted successfully.');
          this.player = null;
          this.email = '';
        },
        error: (err) => {
          if (err.status === 404) {
            alert('Player not found.');
          } else {
            alert('Failed to delete player.');
          }
        }
      });
    } else {
      alert('No valid player email to delete.');
    }
  }
}
