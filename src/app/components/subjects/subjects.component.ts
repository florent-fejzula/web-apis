import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  asyncSubject = new AsyncSubject<number>();
  behaviorSubject = new BehaviorSubject<number>(0);
  replaySubject = new ReplaySubject<number>(2);

  constructor() { }

  ngOnInit(): void {

    this.asyncSubject.next(1);
    this.asyncSubject.next(2);
    this.asyncSubject.next(3);
    this.asyncSubject.complete();

    this.behaviorSubject.subscribe((value) => console.log(`Behavior Subscriber 1: ${value}`));
    this.behaviorSubject.next(1);
    this.behaviorSubject.subscribe((value) => console.log(`Behavior Subscriber 2: ${value}`));
    this.behaviorSubject.next(2);

    this.replaySubject.next(1);
    this.replaySubject.next(2);
    this.replaySubject.next(3);

    this.asyncSubject.subscribe({
      next: (value) => console.log(`asyncSub Received value: ${value}`),
      complete: () => console.log('asyncSub Complete event'),
    });

    this.replaySubject.subscribe((value) => console.log(`Replay Subscriber: ${value}`));

  }

}
