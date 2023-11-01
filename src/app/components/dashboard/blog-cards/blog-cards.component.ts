import { Component } from '@angular/core';
import { BlogServiceService } from '../../../../Services/Blog/blog-service.service';

@Component({
  selector: 'app-blog-cards',
  templateUrl: './blog-cards.component.html',
  styleUrls: ['./blog-cards.component.scss'],
})
export class BlogCardsComponent {
  blogData: any;

  constructor(private blogService: BlogServiceService) {
    this.blogService.getLatestBlog().subscribe(
      (data: any) => {
        data.forEach((blog: any) => {
          blog.timeRead = this.blogService.calculateTimeRead(blog.content);
          blog.createdOn = this.blogService.formatBlogTime(blog.createdOn);
          blog.description = this.blogService.removeSpecialCharacters(
            blog.description
          );
          blog.content = this.blogService.convertMdToHtml(blog.content);
          this.blogData = data;
          console.log(this.blogData);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
