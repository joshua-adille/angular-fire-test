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
import { json } from 'stream/consumers';

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
    category: any = [];
    selectedCategory: string;

    refreshNotes() {
        this.service.getNotes().subscribe((res) => {
            this.notes = res;
        });
    }

    getCategories() {
        this.service.getCategory().subscribe((res) => {
            this.category = res;
        });
    }

    ngOnInit() {
        this.refreshNotes();
        this.getCategories();
    }

    addNotes(newNotes: string) {
        this.service
            .addNote(newNotes)
            .then((res) => {
                console.log(res);
                this.refreshNotes();
            })
            .catch((error) => {
                console.log(`There was an error! ${error}`);
            });
    }
    deleteNotes(id: string) {
        this.service
            .deleteNote(id)
            .then((res) => {
                console.log(res);
                this.refreshNotes();
            })
            .catch((error) => {
                console.log(`There was an error! ${error}`);
            });
    }
    updateNotes(editNotes: string, id: string) {
        // debugger;
        this.service
            .updateNote(editNotes, id)
            .then((res) => {
                console.log(res);
                this.refreshNotes();
            })
            .catch((error) => {
                console.log(`There was an error! ${error}`);
            });
    }
    updateCategories(choice: string, id: string) {
        // debugger;
        // console.log('Clicked!', choice, id);
        this.service
            .updateCategory(choice, id)
            .then((res) => {
                console.log(res);
                this.refreshNotes();
            })
            .catch((error) => {
                console.log(`There was an error! ${error}`);
            });
    }
}
