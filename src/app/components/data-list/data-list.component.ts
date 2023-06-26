import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface ApiResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {
  data$!: Observable<any[]>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.data$ = this.http.get<ApiResponse>('https://jsonplaceholder.typicode.com/posts')
      .pipe(
        map(response => {
          console.log(response); // Log the mapped response
          return [response];
        })
      );
  }

}
