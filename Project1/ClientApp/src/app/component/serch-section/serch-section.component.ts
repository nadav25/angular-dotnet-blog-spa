import { Component } from '@angular/core';
import { BlogCarouselService } from '../blog-carousel/BlogCarouselService';

@Component({
  selector: 'app-serch-section',
  templateUrl: './serch-section.component.html',
  styleUrls: ['./serch-section.component.css']
})
export class SerchSectionComponent {

  searchValue = '';

  constructor(
    private blogCarouselService: BlogCarouselService
  ) {}


  searchByAuthor(): void {
    this.blogCarouselService.filterByAuthorSubject.next(this.searchValue);
  }

}