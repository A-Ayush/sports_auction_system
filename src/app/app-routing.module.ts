import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';
import { BasicInfoComponent } from './registration/basic-info/basic-info.component';
import { EventPreferencesComponent } from './registration/event-preferences/event-preferences.component';

const routes: Routes = [
  // Redirect empty path to the first step of registration
  { path: '', redirectTo: 'registration/basic-info', pathMatch: 'full' },

  // Parent route for registration steps
  {
    path: 'registration',
    component: RegistrationComponent,
    children: [
      { path: 'basic-info', component: BasicInfoComponent },
      { path: 'event-preferences', component: EventPreferencesComponent },

      // Redirect /registration to basic-info step
      { path: '', redirectTo: 'basic-info', pathMatch: 'full' }
    ]
  },

  // Wildcard route for any unknown paths, redirect to registration start
  { path: '**', redirectTo: 'registration/basic-info' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
