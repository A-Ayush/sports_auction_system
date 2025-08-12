import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../basic-info/playerservice/player.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  player: any;
  imageSrc: string | ArrayBuffer | null = null;
  disableProceed = false;
  selectedEvents: any[] = [];

  constructor(private playerService: PlayerService, public router: Router) {}

  ngOnInit(): void {
    this.player = this.playerService.getPlayer();

    if (!this.player) {
      alert('No player data found. Please complete basic info first.');
      this.router.navigate(['/registration/basic-info']);
      return;
    }

    this.selectedEvents = this.playerService.getSelectedEvents();

    // Check if already selected event (replace with actual event check API)
    this.playerService.hasSelectedEvents(this.player.id).subscribe(result => {
      this.disableProceed = result;
    });

    if (this.player.photoFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(this.player.photoFile);
    }
  }

  proceed(): void {
    this.router.navigate(['/registration/event-preferences']);
  }
}
