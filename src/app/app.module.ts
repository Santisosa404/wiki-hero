import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment'
import { AppComponent } from './app.component';
import { HeroListComponent } from 'src/components/hero-list/hero-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HerosService } from 'src/services/heros-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeroCardComponent } from 'src/components/hero-card/hero-card.component';
import { HeroDetailsComponent } from 'src/components/hero-details/hero-details.component';
@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [HerosService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()),
        HeroListComponent,
        HeroCardComponent,
        HeroDetailsComponent,
        NgbModule,
        BrowserAnimationsModule
    ],
})
export class AppModule { }
