import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventService } from './eventService/event.service';
import { Player, PlayerService } from '../basic-info/playerservice/player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-preferences',
  templateUrl: './event-preferences.component.html',
  styleUrls: ['./event-preferences.component.scss']
})
export class EventPreferencesComponent implements OnInit {
  preferencesForm!: FormGroup;

  indoorEvents = [
    'Table Tennis', 'Carrom', 'Chess', 'Foosball', 'Quizzing',
    'Rubik’s Cube Challenge', 'Card Games (Poker, Bridge, etc.)',
    'Bar Games (Pictionary, etc.)', 'Word Games (Scrabble, Wordle-Off, etc.)',
    'Board Game Mix', 'E-sports (Valorant, etc.)'
  ];

  outdoorEvents = [
    'Cricket', 'Football', 'Volleyball', 'Badminton', 'Tug of War',
    'Race / Track events', 'Kho-Kho', 'Kabaddi', 'Basketball', 'Handball'
  ];

  socialEvents = [
    'Quizzing',
    'Rubik’s Cube Challenge',
    'Card Games (Poker, Bridge, etc.)',
    'Bar games (Pictionary, Dumb Charades, Jenga, Darts, Arm Wrestling, etc.)',
    'Word Games (Scrabble, Wordle-Off, Sudoku Challenge, Linkedin Games, etc.)',
    'Board Game Mix (Catan, Monopoly, Ludo, Uno, etc.)'
  ];

  culturalEvents = [
    'Singing',
    'Dancing',
    'Musical instrument',
    'Stand-up comedy',
    'Drama / Skit'
  ];

  indoorRatings: Record<string, number> = {};
  outdoorRatings: Record<string, number> = {};
  socialRatings: Record<string, number> = {};
  culturalRatings: Record<string, number> = {};

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private playerService: PlayerService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.preferencesForm = this.fb.group({
      indoorEvents: [[]],
      outdoorEvents: [[]],
      socialEvents: [[]],
      culturalEvents: [[]]
    });

    // Watch selections for ratings sync
    this.watchSelection('indoorEvents', this.indoorRatings);
    this.watchSelection('outdoorEvents', this.outdoorRatings);
    this.watchSelection('socialEvents', this.socialRatings);
    this.watchSelection('culturalEvents', this.culturalRatings);
  }

  get selectedIndoor() { return this.preferencesForm.value.indoorEvents || []; }
  get selectedOutdoor() { return this.preferencesForm.value.outdoorEvents || []; }
  get selectedSocial() { return this.preferencesForm.value.socialEvents || []; }
  get selectedCultural() { return this.preferencesForm.value.culturalEvents || []; }

  private watchSelection(controlName: string, ratings: Record<string, number>) {
    this.preferencesForm.get(controlName)?.valueChanges.subscribe((selected: string[]) => {
      // Add defaults
      selected.forEach(event => {
        if (!ratings[event]) ratings[event] = 5;
      });
      // Remove unselected
      Object.keys(ratings).forEach(event => {
        if (!selected.includes(event)) delete ratings[event];
      });
    });
  }

  onSubmit(): void {
    if (this.selectedIndoor.length !== 3 || this.selectedOutdoor.length !== 3 ||
        this.selectedSocial.length !== 2 || this.selectedCultural.length !== 2) {
      alert('⚠️ Please select required number of events in each category.');
      return;
    }

    let player:Player = this.playerService.getPlayer();

    const prepareEvents = (type: string, names: string[], ratings: Record<string, number>) =>
      names.map(name => ({
        type,
        nameOfEvent: name,
        rating: ratings[name],
        player
      }));

    const allEvents = [
      ...prepareEvents('INDOOR', this.selectedIndoor, this.indoorRatings),
      ...prepareEvents('OUTDOOR', this.selectedOutdoor, this.outdoorRatings),
      ...prepareEvents('SOCIAL', this.selectedSocial, this.socialRatings),
      ...prepareEvents('CULTURAL', this.selectedCultural, this.culturalRatings),
    ];

    Promise.all(allEvents.map(e => this.eventService.create(e).toPromise()))
      .then(() => alert('✅ Preferences submitted successfully!'))
      .catch(err => {
        console.error(err);
        this.playerService.setSelectedEvents(allEvents);
      // redirect to preview
      this.router.navigate(['/registration/preview']);
        alert('Something went wrong while submitting preferences.');
      });
  }

  goBack() { window.history.back(); }
}
