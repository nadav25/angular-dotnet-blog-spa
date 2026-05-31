

import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogCarouselService } from './BlogCarouselService';
import { BlogItem } from "src/app/entitys/blog-carousel/BlogItem";
import { Conditional } from '@angular/compiler';
import { BlogFilter, eBlogFilterType } from 'src/app/entitys/blog-carousel/BlogFilter';
import { LocationService } from 'src/app/common-Service/LocationService';




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

  isFilterActive : boolean = false;

  constructor(private blogCarouselService: BlogCarouselService,private locationService: LocationService) {}
  

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

      next: (blogFilter : BlogFilter) => {
        this.setFilterInfo(blogFilter);
      }

    });
  }

  get visibleItems(): BlogItem[] {

    if(this.isFilterActive && !(this.items.length > 2) ) {
      return this.items.slice(this.currentIndex, this.currentIndex + 3);
    } else {
      const duplicated = [...this.items, ...this.items];

      return duplicated.slice(this.currentIndex, this.currentIndex + 3);
    }    
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

  setFilterInfo(blogFilter : BlogFilter): void {
  
    if ( blogFilter.filterType != eBlogFilterType.Location && !blogFilter.value  ) {
      this.isFilterActive = false;
      this.items = this.originalItems;
    } else {
      this.currentIndex = 0;
      this.isFilterActive = true;
      this.filterByType(blogFilter) 
    }
  }

  async filterByType(blogFilter: BlogFilter): Promise<void> {
    switch (blogFilter.filterType) {
      case 'author':
        this.items = this.originalItems.filter(blog =>
          blog.author.toLowerCase().includes(blogFilter.value.toLowerCase()));
        break;
      case 'title':
        this.items = this.originalItems.filter(blog =>
          blog.title.toLowerCase().includes(blogFilter.value.toLowerCase()));
        break;
      case 'date':
        this.items = this.originalItems.filter(blog =>
          blog.createdAt.toLowerCase().includes(blogFilter.value.toLowerCase()));
        break;
        case 'location':
          const city = await this.tryGetLocation();
          this.items = this.originalItems.filter(blog =>
            blog.city === city);
          break;
      case 'clear':
        this.items = this.originalItems;
        break;


      default:
        break;
    }
  }

  async tryGetLocation() : Promise<string> {
    let city = '';
    try{
      const location = await this.locationService.getCurrentLocation();
      const latitude = location.latitude;
      const longitude = location.longitude;

      const cityInfo = await this.locationService.getCity(latitude,longitude);
      city = cityInfo.address.town;
    } catch {

    }

    return city;
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



