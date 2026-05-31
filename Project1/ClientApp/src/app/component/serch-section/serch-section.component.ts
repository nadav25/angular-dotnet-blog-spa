import { Component } from '@angular/core';
import { BlogCarouselService } from '../blog-carousel/BlogCarouselService';
import { BlogFilter , eBlogFilterType } from 'src/app/entitys/blog-carousel/BlogFilter';

@Component({
  selector: 'app-serch-section',
  templateUrl: './serch-section.component.html',
  styleUrls: ['./serch-section.component.css']
})
export class SerchSectionComponent {

  searchValue = '';

  eBlogFilterType = eBlogFilterType

  constructor(
    private blogCarouselService: BlogCarouselService
  ) {}


  searchByAuthor(eBlogFilterType : eBlogFilterType): void {
    const blogFilter : BlogFilter = {
      filterType : eBlogFilterType ,
      value : this.searchValue
    };
    
    this.blogCarouselService.filterByAuthorSubject.next(blogFilter);
    if(eBlogFilterType == this.eBlogFilterType.Clear) {
      this.searchValue = '';
    }
  }

}