import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { Firestore, collection, getDocs, setDoc, collectionData, doc, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Hero } from 'src/models/Hero';
import { HerosService } from 'src/services/heros-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'wiki-hero';

  firestore = inject(Firestore);
  heroList : Hero[] = [];
  constructor(private heroService: HerosService){

  }
  ngOnChanges(changes: SimpleChanges): void {
   console.log(this.heroList, 'OnChanges');
   
  }
  ngOnInit(): void {
   this.heroService.getHeroList().subscribe((heroList)=>{
    console.log(heroList, 'heros from service');
    
    this.heroList = heroList;
    console.log(this.heroList);
    
   })
  }

}
