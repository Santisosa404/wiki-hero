import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  setDoc,
  collectionData,
  doc,
  addDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Hero } from 'src/models/Hero';
import { HerosService } from 'src/services/heros-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'wiki-hero';

  firestore = inject(Firestore);
  constructor(private heroService: HerosService) {}
  heroList = this.heroService.herosListGet;

  ngOnInit(): void {
    console.log(this.heroService.herosListGet);
    this.heroService.getHeroList();
    this.getData();
  }

  getData() {
    this.heroList = this.heroService.herosListGet;
  }
  
}
