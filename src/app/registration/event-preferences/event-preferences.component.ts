import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventService } from './eventService/event.service';

@Component({
  selector: 'app-event-preferences',
  templateUrl: './event-preferences.component.html',
  styleUrls: ['./event-preferences.component.scss']
})
export class EventPreferencesComponent implements OnInit {
  preferencesForm!: FormGroup;

  indoorEvents: string[] = [
    'Table Tennis', 'Carrom', 'Chess', 'Foosball', 'Quizzing',
    'Rubik’s Cube Challenge', 'Card Games (Poker, Bridge, etc.)',
    'Bar Games (Pictionary, etc.)', 'Word Games (Scrabble, Wordle-Off, etc.)',
    'Board Game Mix', 'E-sports (Valorant, etc.)'
  ];

  outdoorEvents: string[] = [
    'Cricket', 'Football', 'Volleyball', 'Badminton', 'Tug of War',
    'Race / Track events', 'Kho-Kho', 'Kabaddi', 'Basketball', 'Handball'
  ];

  indoorRatings: Record<string, number> = {};
  outdoorRatings: Record<string, number> = {};

  constructor(private fb: FormBuilder,private eventService: EventService) {}

  ngOnInit(): void {
    this.preferencesForm = this.fb.group({
      indoorEvents: [[]],
      outdoorEvents: [[]]
    });

    // Watch and sync ratings for indoor
    this.preferencesForm.get('indoorEvents')?.valueChanges.subscribe((selected: string[]) => {
      this.syncRatings(selected, this.indoorRatings);
    });

    // Watch and sync ratings for outdoor
    this.preferencesForm.get('outdoorEvents')?.valueChanges.subscribe((selected: string[]) => {
      this.syncRatings(selected, this.outdoorRatings);
    });
  }

  get selectedIndoor(): string[] {
    return this.preferencesForm.value.indoorEvents || [];
  }

  get selectedOutdoor(): string[] {
    return this.preferencesForm.value.outdoorEvents || [];
  }

  /**
   * Ensure selected events have default ratings
   */
  private syncRatings(selected: string[], ratings: Record<string, number>) {
    // Add default ratings (5) for newly selected items
    selected.forEach(event => {
      if (!ratings[event]) {
        ratings[event] = 5;
      }
    });

    // Remove unselected events
    Object.keys(ratings).forEach(event => {
      if (!selected.includes(event)) {
        delete ratings[event];
      }
    });
  }

  onSubmit(): void {
  if (this.selectedIndoor.length !== 3 || this.selectedOutdoor.length !== 3) {
    alert('⚠️ Please select exactly 3 events in both indoor and outdoor.');
    return;
  }

  const inEvents: any[] = this.selectedIndoor.map(name => ({
    type: 'INDOOR',
    nameOfEvent: name,
    rating: this.indoorRatings[name]
  }));

  let outEvents: any[] = this.selectedOutdoor.map(name => ({
    type: 'OUTDOOR',
    nameOfEvent: name,
    rating: this.outdoorRatings[name]
  }));

  const allEvents = [...outEvents, ...inEvents];

  // Save all events (you can also use forkJoin for concurrent saves)
  Promise.all(allEvents.map(e =>
    this.eventService.create(e).toPromise()
  ))
  .then(() => {
    alert('✅ Preferences submitted successfully!');
  })
  .catch(error => {
    console.error('❌ Error submitting preferences:', error);
    alert('Something went wrong while submitting preferences.');
  });
}


  goBack(): void {
    // Implement navigation back if needed
    window.history.back();
  }
}
