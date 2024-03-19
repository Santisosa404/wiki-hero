import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  imageRef: any;
  private imageUrlPriv = new BehaviorSubject<any>(null);
  lastImageUrl2: string = '';
  lastImageUrl = this.imageUrlPriv.asObservable();

  constructor() {}
  async uploadImage(imageAsBlob: Blob, imageName: string) {
    const storage = getStorage();
    const storageRef = ref(storage, imageName);
    this.imageRef = storageRef;
    await uploadBytes(storageRef, imageAsBlob).catch((error) => {
      console.log(error, 'error');
    });
  }

  async handleUploadImageAndUrl(imageAsBlob: Blob, imageName: string) {
    const storage = getStorage();
    const storageRef = ref(storage, imageName);
    await this.uploadImage(imageAsBlob, imageName);
    return await getDownloadURL(storageRef);
  }

}
