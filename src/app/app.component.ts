import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
    Firestore,
    collection,
    collectionData,
    getDocs,
    query,
} from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

interface Item {
    name: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet, CommonModule],
})
export class AppComponent {
    constructor(private service: SharedService) {}
    notes: any = [];

    refreshNotes() {
        this.service.getNotes().subscribe((res) => {
            this.notes = res;
        });
    }

    ngOnInit() {
        this.refreshNotes();
    }

    addNotes(newNotes: string) {
        this.service.addNote(newNotes).then((res) => {
            console.log(res);
            this.refreshNotes();
        });
    }
    deleteNotes(id: string) {
        this.service.deleteNote(id).then((res) => {
            console.log(res);
            this.refreshNotes();
        });
    }
    updateNotes(editNotes: string, id: string) {
        // debugger;
        this.service.updateNote(editNotes, id).then((res) => {
            console.log(res);
            this.refreshNotes();
        });
    }
}
