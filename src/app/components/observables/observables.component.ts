import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, concat, filter, from, interval, map, merge, of, startWith, take, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.scss']
})
export class ObservablesComponent implements OnInit {

  observable1 = interval(1000); // Emits values every 1 second
  observable2 = interval(2000); // Emits values every 2 seconds
  mergedObservable = merge(this.observable1, this.observable2);

  array = [1, 2, 3, 4, 5];

  fromUsage = from(this.array);

  dataSource = of(1, 2, 3, 4, 5);

  observableFromArray = new Observable<number>((observer) => {
    for (let item of this.array) {
      observer.next(item);
    }
    observer.complete();
  });

  // timerOne emits first value at 1s, then once every 4s
  timerOne$ = timer(1000, 4000);
  // timerTwo emits first value at 2s, then once every 4s
  timerTwo$ = timer(2000, 4000);
  // timerThree emits first value at 3s, then once every 4s
  timerThree$ = timer(3000, 4000);

  numbersObservable = of(1, 2, 3, 4, 5);
  numbersWithInitial = this.numbersObservable.pipe(startWith(0));

  sourceObservable = interval(1000);

  // Create a notifier observable that emits a value after 5 seconds
  notifierObservable = timer(5000);

  sourceForMap = from([1, 2, 3, 4, 5]);

  sourceForMap2 = from([
    { name: 'Joe', age: 30 },
    { name: 'Frank', age: 20 },
    { name: 'Ryan', age: 50 }
  ]);

  constructor() { }

  ngOnInit(): void {
    this.observableFromArray.subscribe((value) => {
      console.log('Observable values: ', value);
    });

    this.dataSource
      .pipe(
        map(val => val + 7)
      )
      .subscribe((value) => {
        console.log('dataSource: ', value);
      })

    // when one timer emits, emit the latest values from each timer as an array
    combineLatest([this.timerOne$, this.timerTwo$, this.timerThree$]).pipe(take(5)).subscribe(
      ([timerValOne, timerValTwo, timerValThree]) => {
        console.log(
          `
          Timer One Latest: ${timerValOne},
          Timer Two Latest: ${timerValTwo},
          Timer Three Latest: ${timerValThree}
          `
        );
      }
    );

    concat(
      of(1, 2, 3),
      // subscribed after first completes
      of(4, 5, 6),
      // subscribed after second completes
      of(7, 8, 9)
    )
      // log: 1, 2, 3, 4, 5, 6, 7, 8, 9
      .subscribe((val) => {
        console.log('concat: ', val);
      });

    this.mergedObservable.pipe(take(5)).subscribe((value) => {
      console.log('Merged: ', value)
    });

    // Subscribe to the modified observable
    this.numbersWithInitial.pipe(startWith(-1)).subscribe((value) => {
      console.log('startWith: ', value);
    });

    this.fromUsage.pipe(
      filter(num => num % 2 === 0)).subscribe(
        val => console.log(`Even number: ${val}`));

    this.sourceObservable.pipe(
      takeUntil(this.notifierObservable)
    ).subscribe((value) => {
      console.log('TakeUntil: ', value); // Output: 0, 1, 2, 3, 4
    });

    //add 10 to each value
    this.sourceForMap.pipe(
      map(val => val + 10)
    ).subscribe(
      val => console.log('map val + 10: ', val)
    );

    //grab each persons name, could also use pluck for this scenario
    this.sourceForMap2.pipe(
      map(({ name }) => name)
    ).subscribe(
      val => console.log('map name only: ', val)
    );
    //output: "Joe","Frank","Ryan"

  }

}
