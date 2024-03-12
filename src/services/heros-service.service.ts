import { Injectable, inject } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentData,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  Firestore,
  collection,
  getDocs,
  setDoc,
  collectionData,
  doc,
  addDoc,
  query,
  QuerySnapshot,
  deleteDoc,
  onSnapshot,
} from '@angular/fire/firestore';
import { Hero } from 'src/models/Hero';

@Injectable({
  providedIn: 'root',
})
export class HerosService {
  // private heroCollection: AngularFirestoreCollection<any>;
  // heroList: Observable<Hero[]>;
  private herosList : BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);
  constructor(private firestore: Firestore) {}

  get herosListGet() : Observable<Hero[]>{
    return this.herosList.asObservable();
  }

  getHeroList(){
    const collectionRef = collection(this.firestore, 'heros');
    onSnapshot(collectionRef, (querySnapshot: QuerySnapshot<DocumentData>) => {
      const heroes: Hero[] = [];
      querySnapshot.forEach((doc) => {
        const hero: Hero = { ...doc.data() as Hero };
        //Seteo de nuevo el id debedo a que los datos no son mios propios
        hero.id = doc.id;
        heroes.push(hero);
      });
      this.herosList.next(heroes);
    });
  }

  getHeroById(id: string) {
    const collectionRef = collection(this.firestore, 'heros');

    const heroDoc = doc(this.firestore, 'heros', id);
    return heroDoc;
  }

  async handleDeleteRequest(id: string) {
    const heroById = this.getHeroById(id);
    await this.deleteHero(heroById.id);
    this.getHeroList();

  }

  async deleteHero(id: string) {
    await deleteDoc(doc(this.firestore, 'heros', id));

  }
}
