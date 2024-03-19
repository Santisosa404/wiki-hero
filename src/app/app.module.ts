import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HeroListComponent } from 'src/components/hero-list/hero-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HerosService } from 'src/services/herosService/heros.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeroCardComponent } from 'src/components/hero-card/hero-card.component';
import { HeroDetailsComponent } from 'src/components/hero-details/hero-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateButtonComponent } from 'src/components/create-button/create-button.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
@NgModule({
  declarations: [AppComponent],
  providers: [HerosService],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    HeroListComponent,
    HeroCardComponent,
    HeroDetailsComponent,
    CreateButtonComponent,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    NgxUiLoaderModule,
  ],
})
export class AppModule {}
