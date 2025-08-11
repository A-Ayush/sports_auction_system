import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../registration/basic-info/playerservice/player.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  empId = '';
  name = '';
  errorMessage = '';

  constructor(private playerService: PlayerService, private router: Router) {}

  login() {
    if (!this.empId || !this.name) {
      this.errorMessage = 'Please enter both Employee ID and Name';
      return;
    }

    this.playerService.login(this.empId, this.name).subscribe({
      next: (player: any) => {
        // Store player in a service or localStorage
        this.playerService.setLoggedInPlayer(player);
        this.router.navigate(['/preview']);
      },
      error: () => {
        this.errorMessage = 'Invalid Employee ID or Name';
      }
    });
  }
}
