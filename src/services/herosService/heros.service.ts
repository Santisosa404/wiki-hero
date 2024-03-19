import { Injectable, inject } from '@angular/core';
import {
  DocumentData,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Firestore,
  collection,
  setDoc,
  doc,
  QuerySnapshot,
  deleteDoc,
  onSnapshot,
  DocumentReference,
} from '@angular/fire/firestore';
import { Hero } from 'src/models/Hero';
import { StorageService } from '../storageService/storage.service';

@Injectable({
  providedIn: 'root',
})
export class HerosService {
  private herosList: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);
  constructor(private firestore: Firestore, private storageService: StorageService) {}

  get herosListGet(): Observable<Hero[]> {
    return this.herosList.asObservable();
  }

  getHeroList() {
    const collectionRef = collection(this.firestore, 'heros');
    onSnapshot(collectionRef, (querySnapshot: QuerySnapshot<DocumentData>) => {
      const heroes: Hero[] = [];
      querySnapshot.forEach((doc) => {
        const hero: Hero = { ...(doc.data() as Hero) };
        //Seteo de nuevo el id debedo a que los datos no son mios propios
        hero.id = doc.id;
        heroes.push(hero);
      });
      this.herosList.next(heroes);
    });
  }

  getHeroById(id: string) : DocumentReference<DocumentData, DocumentData> {
    const heroDoc = doc(this.firestore, 'heros', id);
    return heroDoc;
  }

  async handleDeleteRequest(id: string) {
    const heroById = this.getHeroById(id);
    await this.deleteHero(heroById.id);
    this.getHeroList();
  }

  async deleteHero(id: string) {
    await deleteDoc(this.getHeroById(id)).catch((error) => {
      throw error;
    });
  }

  async editHero(heroToEdit: Hero) {
    await setDoc(this.getHeroById(heroToEdit.id), heroToEdit, {merge: true});
  }

  async handleEdit(heroToEdit : Hero){
    await this.editHero(heroToEdit).catch((error)=>{
      console.log(error,'error');
    });
    this.getHeroList();
  }

  async handleCreateHeroWithImage(imageAsBlob: Blob, imageName: string, newHero : Hero){
    const imageUrl = await this.storageService.handleUploadImageAndUrl(imageAsBlob, imageName);
    newHero = {...newHero, image:{url: imageUrl}};
    this.createHero(newHero);
  }

  async createHero(newHero : Hero){
    await setDoc(doc(this.firestore, 'heros',newHero.id), newHero );
  }
}
