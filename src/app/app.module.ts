import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment'
import { AppComponent } from './app.component';
import { HeroListComponent } from 'src/components/hero-list/hero-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HerosService } from 'src/services/heros-service.service';
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
        NgbModule
    ]
})
export class AppModule { }
