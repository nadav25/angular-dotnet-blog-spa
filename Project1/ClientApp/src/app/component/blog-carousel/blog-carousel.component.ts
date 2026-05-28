

import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogCarouselService } from './BlogCarouselService';
import { BlogItem } from "src/app/entitys/blog-carousel/BlogItem";
import { Conditional } from '@angular/compiler';




@Component({
  selector: 'app-blog-carousel',
  templateUrl: './blog-carousel.component.html',
  styleUrls: ['./blog-carousel.component.css']
})
export class BlogCarouselComponent implements OnInit,OnDestroy {
  

  currentIndex : number = 0;

  isAddModalOpen : boolean = false;

  isEditModalOpen : boolean = false;

  selectedBlog?: BlogItem;

  constructor(private blogCarouselService: BlogCarouselService) {}
  

  items: BlogItem[] = [];

  originalItems: BlogItem[] = [];

  authorSearch = '';
  

  ngOnInit(): void {
    this.loadBlogs();

    this.initSubscribe();
  }

  initSubscribe () : void {
    this.blogCarouselService.getBlogsSubject.subscribe({
      next: () => {
        this.loadBlogs();
      }
    });

    this.blogCarouselService.filterByAuthorSubject.subscribe({
  
      next: (authorName) => {
  
        this.filterByAuthor(authorName);
      }
    });

  }

  get visibleItems(): BlogItem[] {

    return this.items.slice(this.currentIndex, this.currentIndex + 3);

    const duplicated = [...this.items, ...this.items];

    return duplicated.slice(this.currentIndex, this.currentIndex + 3);
  }



  private loadBlogs(): void {
    this.blogCarouselService.getBlogs().subscribe({
      next: (blogs : BlogItem[]) => {
        this.originalItems = blogs;
        this.items = blogs;
      },
      error: () => {
        this.items = [];
      }
    });
  }

  filterByAuthor(searchValue : string): void {
  
    if (!searchValue) {
      this.items = this.originalItems;
      return;
    }
  
    this.items = this.originalItems.filter(blog =>
      blog.author.toLowerCase().includes(searchValue)
    );
  }





  next(): void {

    this.currentIndex++;

    if (this.currentIndex >= this.items.length) {
      this.currentIndex = 0;
    }
  }

  prev(): void {

    this.currentIndex--;

    if (this.currentIndex < 0) {
      this.currentIndex = this.items.length - 1;
    }
  }

  openEditModal(blog: BlogItem) : void{
    this.selectedBlog = blog;

    this.isEditModalOpen = true;
  }

  deleteBlog(id : number) : void {
    this.blogCarouselService.DeleteBlog(id).subscribe({
      next: () => {
        this.loadBlogs();
      }
      
    });
  }

  

  openAddModal(): void {
    this.isAddModalOpen = true;
  }

  closeAddModal(): void {
    this.isAddModalOpen = false;
  }


  closeEditModal(): void {
    this.isEditModalOpen = false;
  }


  ngOnDestroy(): void {
    this.blogCarouselService.filterByAuthorSubject.unsubscribe();

    this.blogCarouselService.getBlogsSubject.unsubscribe();
  }



}



