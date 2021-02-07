import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {}
  getSpotiLogo() {
    this.db;
  }
  uploadLogoC(rutaImg: any) {
    const key = this.db.createId();
    const doc = this.db.collection('images').doc(key);
    const data = {
      rutaImg: rutaImg,
    };
    return doc.set({ ...data });
  }
  uploadLogo(filePath: string, file: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.storage.upload(filePath, file);
        resolve({ ok: true });
      } catch (error) {
        reject(error);
      }
    });
  }
  obtainImg(rutaImg: string) {
    return new Promise((resolve, reject) => {
      const ref = this.storage.ref(rutaImg);
      try {
        ref.getDownloadURL().subscribe((res) => {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getRutaImLogo(): Observable<any>{
     return this.db.collection('images').snapshotChanges().pipe(
      map( actions => actions.filter( a => {
        return a.payload.doc.data();
      }).map(a => {
        return a.payload.doc.data();
      }))
    )
  }
}
