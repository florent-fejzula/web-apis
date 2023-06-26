import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  items$!: Observable<any[]>;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.items$ = this.apiService.getItems();
  }

  createPost(): void {
    const newPostData = {
      title: 'New Post Title',
      body: 'New Post Body',
      userId: 1
    };
  
    this.apiService.createPost(newPostData)
      .pipe(
        tap((createdPost) => {
          console.log('New post created:', createdPost);
          this.apiService.getItems();
        })
      )
      .subscribe({
        error: (error) => {
          console.error('Error creating post:', error);
        }
      });
  }
  

}
