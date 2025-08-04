import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPreferencesComponent } from './event-preferences.component';

describe('EventPreferencesComponent', () => {
  let component: EventPreferencesComponent;
  let fixture: ComponentFixture<EventPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventPreferencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
