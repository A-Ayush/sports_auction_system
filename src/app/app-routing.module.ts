import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';
import { BasicInfoComponent } from './registration/basic-info/basic-info.component';
import { EventPreferencesComponent } from './registration/event-preferences/event-preferences.component';
import { PreviewComponent } from './registration/preview/preview.component';
import { ThankYouComponent } from './registration/thank-you/thank-you.component';
import { DeletePlayerComponent } from './playersmutation/delete-player/delete-player.component';

const routes: Routes = [
  // Redirect empty path to the first step of registration
  
  { path: 'delete', component: DeletePlayerComponent },
  { path: 'registration/thank-you', component: ThankYouComponent },
  { path: '', redirectTo: 'registration/basic-info', pathMatch: 'full' },

  // Parent route for registration steps
  {
    path: 'registration',
    component: RegistrationComponent,
    children: [
      { path: 'basic-info', component: BasicInfoComponent },
      { path: 'event-preferences', component: EventPreferencesComponent },
      { path: 'preview', component: PreviewComponent },
    

      // Redirect /registration to basic-info step
      { path: '', redirectTo: 'basic-info', pathMatch: 'full' }
    ]
  },

  // Wildcard route for any unknown paths, redirect to registration start
  { path: '**', redirectTo: 'registration/basic-info' },

  // { path: 'registration/preview', component: PreviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
