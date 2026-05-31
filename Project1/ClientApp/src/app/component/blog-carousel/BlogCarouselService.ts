import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { BlogFilter } from "src/app/entitys/blog-carousel/BlogFilter";
import { BlogItem } from "src/app/entitys/blog-carousel/BlogItem";






@Injectable({
    providedIn: 'root'
  })
  export class BlogCarouselService {
    
    // private readonly getBlogsUrl = '/api/BlogCarousel/GetBlogs';

    private readonly getBlogsUrl = 'https://localhost:7190/api/BlogCarousel/GetBlogs';

    private readonly createBlogUrl = 'https://localhost:7190/api/BlogCarousel/CreateBlog';

    private readonly EditBlogUrl = 'https://localhost:7190/api/BlogCarousel/EditBlog';

    private readonly DeleteBlogUrl = 'https://localhost:7190/api/BlogCarousel/DeleteBlog';
    
    public getBlogsSubject = new Subject<void>();

    public filterByAuthorSubject = new Subject<BlogFilter>();
    

    constructor(private http: HttpClient) {}
  
    getBlogs(): Observable<BlogItem[]> {
      return this.http.get<BlogItem[]>(this.getBlogsUrl);
    }

    createBlog(newBlogItem : BlogItem): Observable<boolean> {
      return this.http.post<boolean>(this.createBlogUrl,newBlogItem);
    }

    EditBlog(newBlogItem : BlogItem): Observable<boolean> {
      return this.http.put<boolean>(this.EditBlogUrl,newBlogItem);
    }

    DeleteBlog(id : number): Observable<boolean> {
      return this.http.delete<boolean>(`${this.DeleteBlogUrl}/?id=${id}`);
    }
    


  }