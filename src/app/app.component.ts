import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { switchMap, map } from 'rxjs';
import { SharedService } from './shared.service';

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

    getData() {
        const notes$ = this.service.getNotes();
        const categories$ = this.service.getCategory();
        notes$
            .pipe(
                switchMap((notes) => {
                    return categories$.pipe(
                        map((categories) => {
                            return {
                                notes: notes,
                                categories: categories,
                            };
                        })
                    );
                })
            )
            .subscribe(
                (res) => {
                    this.notes = res.notes;
                    this.category = res.categories;
                }

                // console.log(res)
            );
    }

    ngOnInit() {
        this.getData();
    }

    addNotes(newNotes: string) {
        this.service
            .addNote(newNotes)
            .then((res) => {
                console.log(res);
                this.getData();
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
                this.getData();
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
                this.getData();
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
                this.getData();
            })
            .catch((error) => {
                console.log(`There was an error! ${error}`);
            });
    }
}
