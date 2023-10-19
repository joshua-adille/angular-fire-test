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
export class AppComponent implements OnInit {
    private firestore: Firestore = inject(Firestore);
    notes$: Observable<DocumentData[]>;
    xs: Array<number>;
    // notes$: Observable<DocumentData[]>;
    // notes$: DocumentData = [];

    /**
     * Constructor
     */
    constructor() {
        const itemCollection = collection(this.firestore, 'items');
        // // console.log(collectionData(itemCollection));
        collectionData(itemCollection).subscribe((xs) => {
            console.log(
                '[debug] this is the xs observable: ',
                xs,
                '[of type]: ',
                typeof xs
            );
        });
        this.notes$ = collectionData(itemCollection);

        // this.notes$.subscribe((data) => {
        //     console.log(data);
        // });
        //  console.log(this.notes$, 'this is notes');
        // this.notes$.subscribe((data) => {
        //     console.log(data);
        // });
        // // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // const collectionRef = collection(this.firestore, 'items');
        // const collectionQuery = query(
        //     collectionRef
        //     //   where('profileId', '==', profileId),
        //     //   where('status', 'in', orderStatuses)
        // );
        // this.notes = collectionData(collectionQuery, { idField: 'id' });
        // collectionData(collectionQuery).subscribe((xs) => {
        //     console.log(
        //         '[debug] this is the xs observable: ',
        //         xs,
        //         '[of type]: ',
        //         typeof xs
        //     );
        //     this.notes = xs;
        //     // this.notes = xs;
        // });
    }
    ngOnInit() {
        // console.log(
        //     '[debug] this is the notes array: ',
        //     this.notes,
        //     '[of type]: ',
        //     typeof this.notes
        // );
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // const collectionRef = collection(this.firestore, 'notes');
        // // this.notes$ = collectionData(collectionRef);
        // // // const collectionQuery = query(
        // // //     collectionRef
        // // //     //   where('profileId', '==', profileId),
        // // //     //   where('status', 'in', orderStatuses)
        // // // );
        // // return console.log((this.notes$ = data));
        // collectionData(collectionRef).subscribe((xs) => {
        //     console.log(
        //         '[debug] this is the xs observable: ',
        //         xs,
        //         '[of type]: ',
        //         typeof xs
        //     );
        //     this.notes$ = xs;
        // });
        // console.log(
        //     '[debug] this is the notes array: ',
        //     this.notes$,
        //     '[of type]: ',
        //     typeof this.notes$
        // );
    }
}
