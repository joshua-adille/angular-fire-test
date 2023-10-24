import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
    map,
    of,
    filter,
    combineLatest,
    concatMap,
    interval,
    take,
    concat,
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
        { id: '4', name: 'Robert', isActive: true },
        { id: '5', name: 'Jackson', isActive: false },
        { id: '6', name: 'Aaron', isActive: true },
    ];

    users$ = of(this.users);
    usernames$ = this.users$.pipe(
        map((users) => users.map((user) => user.name))
    );
    //Filter and check if all item on users$ isActive === true, if not dont save the items into filteredUsers$
    filteredUsers$ = this.users$.pipe(
        filter((users) => users.every((user) => user.isActive))
    );
    //Filter users$ and save the passed values into isActiveFilter$
    isActiveFilter$ = this.users$
        .pipe(map((users) => users.filter((user) => user.isActive === true)))
        .subscribe((response) => {
            console.log(response);
        });
    isActive2Filter$ = this.users$
        .pipe(
            concatMap((users) => users),
            filter((user) => user.isActive === true)
        )
        .subscribe((response) => {
            console.log(response);
        });

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

    // firstTimer = timer(0, 1000); // emit 0, 1, 2... after every second, starting from now
    // secondTimer = timer(500, 1000); // emit 0, 1, 2... after every second, starting 0,5s from now
    // combinedTimers = combineLatest([this.firstTimer, this.secondTimer]);

    timer1 = interval(1000).pipe(take(10));
    timer2 = interval(2000).pipe(take(6));
    timer3 = interval(500).pipe(take(10));

    result = concat(this.timer1, this.timer2, this.timer3);

    numbers$ = of(1, 2, 3);

    constructor() {
        this.numbers$.subscribe((x) => console.log(x));
        // this.result.subscribe((x) => console.log(x));
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
        // ~~~~~~~~~~~~Map Function
        // const example = (operator: any) => () => {
        //     from([0, 1, 2, 3, 4])
        //         .pipe(operator((x: any) => of(x).pipe(delay(2000))))
        //         .subscribe(
        //             console.log,
        //             () => {},
        //             () => console.log(`${operator.name} completed`)
        //         );
        // };
        // example(exhaustMap)();
    }

    // ngOnInit() {

    // }
}
