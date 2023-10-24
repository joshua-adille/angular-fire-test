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
    interval,
    take,
    concatMap,
    switchMap,
    delay,
    startWith,
    timer,
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

    // intervalCount = interval(1000);
    // takeFive = this.intervalCount.pipe(take(5));

    // clicks = fromEvent<PointerEvent>(document, 'click');
    // positions = this.clicks.pipe(map((ev) => ev.clientX));

    // clicks = fromEvent(document, 'click');
    // result = this.clicks.pipe(switchMap(() => interval(1000)));

    // observables = {
    //     a: of(1).pipe(delay(1000), startWith(0)),
    //     b: of(5).pipe(delay(5000), startWith(0)),
    //     c: of(10).pipe(delay(10000), startWith(0)),
    // };

    // combined = combineLatest(this.observables);

    firstTimer = timer(0, 1000); // emit 0, 1, 2... after every second, starting from now
    secondTimer = timer(500, 1000); // emit 0, 1, 2... after every second, starting 0,5s from now
    combinedTimers = combineLatest([this.firstTimer, this.secondTimer]);

    constructor() {
        // this.takeFive.subscribe((x) => console.log(x));
        // this.positions.subscribe((x) => console.log(x));
        // this.result.subscribe((x) => console.log(x));
        // this.combined.subscribe((value) => console.log(value));
        // this.combinedTimers.subscribe((value) => console.log(value));
        // this.datas$.subscribe((datas) => console.log('test', datas));
        // this.datas$.subscribe(([users, usernames, filteredUsers]) => {
        //     // Here, you can access and work with the combined data
        //     console.log('Users:', users);
        //     console.log('Usernames:', usernames);
        //     console.log('Filtered Users:', filteredUsers);
        // });
    }

    // ngOnInit() {

    // }
}
