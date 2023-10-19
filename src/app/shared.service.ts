import { Injectable } from '@angular/core';
import {
    Firestore,
    addDoc,
    doc,
    collection,
    collectionData,
    deleteDoc,
} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    constructor(private fs: Firestore) {}
    getNotes() {
        let notesCollection = collection(this.fs, 'notes');
        return collectionData(notesCollection, { idField: 'id' });
    }
    addNote(desc: string) {
        let data = { description: desc };
        let notesCollection = collection(this.fs, 'notes');
        return addDoc(notesCollection, data);
    }
    deleteNote(id: string) {
        let docRef = doc(this.fs, 'notes/' + id);
        return deleteDoc(docRef);
    }
}
