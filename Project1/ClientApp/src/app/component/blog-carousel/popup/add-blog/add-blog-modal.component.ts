import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlogCarouselService } from '../../BlogCarouselService';
import { BlogItem } from 'src/app/entitys/blog-carousel/BlogItem';
import { LocationService } from 'src/app/common-Service/LocationService';

@Component({
  selector: 'app-add-blog-modal',
  templateUrl: './add-blog-modal.component.html',
  styleUrls: ['./add-blog-modal.component.css']
})
export class AddBlogModalComponent implements OnInit {

  @Input() blogToEdit?: BlogItem;

  isEditMode : boolean = false;

  // public title : string = 'Add New Blog'

  @Output()
  close = new EventEmitter<void>();

  constructor(
    private blogCarouselService: BlogCarouselService, private locationService: LocationService
  ) {}
  
  
  ngOnInit(): void {
    if (this.blogToEdit) {
      this.isEditMode = true;
      this.newBlog = { ...this.blogToEdit };
    }
  }

  newBlog = {
    id : 0,
    title: '',
    author: '',
    imageUrl: '',
    body: '',
    createdAt : '',
    latitude: 0,
    longitude: 0,
    city : ''
  };

  async saveModal() : Promise<void> {
    if (!this.blogToEdit) {

      
      this.newBlog.createdAt = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });

      await this.tryGetLocation();

      this.blogCarouselService.createBlog(this.newBlog).subscribe({
          next: () => {
            this.closeModal();
    
            this.blogCarouselService.getBlogsSubject.next();
          }
        });
    } else {
      this.blogCarouselService.EditBlog(this.newBlog).subscribe({
        next: () => {
          this.closeModal();
          this.blogCarouselService.getBlogsSubject.next();
        }
      });
    }
  }

  async tryGetLocation() : Promise<void> {
    try{
      const location = await this.locationService.getCurrentLocation();
      this.newBlog.latitude = location.latitude;
      this.newBlog.longitude = location.longitude;

      const city = await this.locationService.getCity(this.newBlog.latitude,this.newBlog.longitude)
      this.newBlog.city = city.address.town;
    } catch {

    }
  }

  closeModal(): void {
    this.close.emit();
  }
}