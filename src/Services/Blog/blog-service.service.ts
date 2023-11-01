import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as showdown from 'showdown';

@Injectable({
  providedIn: 'root',
})
export class BlogServiceService {
  constructor(private http: HttpClient) {}

  private url = environment.baseApiURL;
  public blogData: any;

  getLatestBlog(): Observable<any> {
    this.blogData = this.http.get(`${this.url}/blog/latest`);
    return this.blogData;
  }

  formatBlogTime(time: string): string {
    const dateArray = time.split('-');
    const year = dateArray[0];
    const month = dateArray[1];
    const returnDate = new Date(parseInt(year), parseInt(month) - 1);
    console.log(returnDate.toDateString());
    return returnDate.toDateString();
  }

  calculateTimeRead(content: string): number {
    const wordsPerMinute = 200;
    const noOfWords = content.split(' ').length;
    const timeRead = Math.ceil(noOfWords / wordsPerMinute);
    return timeRead;
  }

  removeSpecialCharacters(description: string): string {
    const regex = /[*]/g;
    const result = description.replace(regex, '');
    const words = result.split(' ');
    const finalRes = words.slice(0, 25).join(' ');
    const finalResWithDots = finalRes + '...';
    return finalResWithDots;
  }

  convertMdToHtml(md: string): string {
    const converter = new showdown.Converter();
    const html = converter.makeHtml(md);
    return html;
  }
}
