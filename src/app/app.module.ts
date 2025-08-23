import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { BasicInfoComponent } from './registration/basic-info/basic-info.component';
import { EventPreferencesComponent } from './registration/event-preferences/event-preferences.component';
import { AppRoutingModule } from './app-routing.module';
import { PlayerService } from './registration/basic-info/playerservice/player.service';
import { EventService } from './registration/event-preferences/eventService/event.service';
import { PreviewComponent } from './registration/preview/preview.component';
import { LoginComponent } from './login/login.component';
import { ThankYouComponent } from './registration/thank-you/thank-you.component';
import { DeletePlayerComponent } from './playersmutation/delete-player/delete-player.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    BasicInfoComponent,
    EventPreferencesComponent,
    PreviewComponent,
    LoginComponent,
    ThankYouComponent,
    DeletePlayerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,


    // Material modules
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSliderModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatRadioModule
  ],
  providers: [PlayerService,EventService],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
