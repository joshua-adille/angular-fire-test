import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
    map,
    of,
    filter,
    BehaviorSubject,
    fromEvent,
    combineLatest,
    tap,
} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet, CommonModule],
})
export class AppComponent {
    users = [
        { id: '1', name: 'John', isActive: true },
        { id: '2', name: 'Jack', isActive: true },
        { id: '3', name: 'Mike', isActive: false },
    ];

    users$ = of(this.users);
    usernames$ = this.users$.pipe(
        map((users) => users.map((user) => user.name))
    );

    filteredUsers$ = this.users$.pipe(
        filter((users) => users.every((user) => user.isActive))
    );

    // documentClick$ = fromEvent(document, 'click');
    datas$ = combineLatest([
        this.users$,
        this.usernames$,
        this.filteredUsers$,
    ]).pipe(
        map(([users, usernames, filteredUsers]) => ({
            users,
            usernames,
            filteredUsers,
        }))
    );

    // data$ = combineLatest([
    //     this.users$,
    //     this.usernames$,
    //     this.filteredUsers$,
    // ]).pipe(
    //     tap(([users, usernames, filteredUsers]) => {
    //         debugger;
    //         console.log('Users:', users);
    //         console.log('Usernames:', usernames);
    //         console.log('Filtered Users:', filteredUsers);
    //     }),
    //     map(([users, usernames, filteredUsers]) => ({
    //         users,
    //         usernames,
    //         filteredUsers,
    //     }))
    // );
    ngOnInit() {
        // console.log('data$', this.data$);
        // this.documentClick$.subscribe((e) => {
        //     console.log('e', e);
        // });
        // setTimeout(() => {
        //     this.user$.next({ id: '1', name: 'John' });
        // }, 2000);
        // this.user$.subscribe((user) => {
        //     console.log('user', user);
        // });
        // this.users$.subscribe((users) => {
        //     console.log('users', users);
        // });
    }
}
