import {Component} from '@angular/core';
import {ImageList} from "./imageList";
import {SubRedditFetcher} from "./subRedditFetcher";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SubRedditFetcher]
})
export class AppComponent {

  private imageList: ImageList = new ImageList([]);

  constructor(private srf: SubRedditFetcher) {
    srf.getPosts("photos").then((imageList: ImageList) => {
      this.imageList = imageList
    });
  }

  private imageIndex: number = 0;

  get imageUrl(): string {
    return this.imageList.get(this.imageIndex).postUrl;
  }

  get imageDescription(): string {
    return this.imageList.get(this.imageIndex).title;
  }

  nextImage() {
    this.imageIndex += 1;
    this.imageIndex %= this.imageList.images.length;
  }

}
