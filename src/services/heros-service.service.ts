import { Injectable, inject } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentData,
} from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
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
} from '@angular/fire/firestore';
import { Hero } from 'src/models/Hero';

@Injectable({
  providedIn: 'root',
})
export class HerosService {
  // private heroCollection: AngularFirestoreCollection<any>;
  // heroList: Observable<Hero[]>;

  constructor(private firestore: Firestore) {
  }

  // async getHeroList() : Promise<Observable<Hero[]>> {
  //   const collectionRef = collection(this.firestore, 'heros');
  //   return from(getDocs(collectionRef)).pipe(
  //     map((queryListFromFire: QuerySnapshot<DocumentData>) => {
  //       const heroList: Hero[] = [];
  //       queryListFromFire.forEach((hero) => {
  //         heroList.push(hero.data() as Hero);
  //       });
  //       return heroList;
  //     })
  //   );
   
  // }
  getHeroList(): Observable<Hero[]> {
    const collectionRef = collection(this.firestore, 'heros');

    return from(getDocs(collectionRef)).pipe(
      // Mapea el QuerySnapshot a un array de DocumentData
      map((querySnapshot: QuerySnapshot<DocumentData>) => {
        const heroes: Hero[] = [];
        querySnapshot.forEach((doc) => {
          heroes.push(doc.data() as Hero);
        });
        return heroes;
      }),
      catchError((error) => {
        console.error('Error al obtener la lista de héroes:', error);
        throw error;
      })
    );
  }

}
