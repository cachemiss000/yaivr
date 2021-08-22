import {Component} from '@angular/core';
import {ImageList} from "./imageList";
import {SubRedditFetcher} from "./subRedditFetcher";
import {RedditPost} from "./redditPost";
import * as Promise from "bluebird"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SubRedditFetcher]
})
export class AppComponent {

  private imageList: ImageList = new ImageList([]);
  private imageIndex: number = 0;

  private imageTimerId: NodeJS.Timeout | null = null;
  private imageTimerMilliseconds: number = 300_000

  private curSubreddit: string = "photos";
  private docHasFocus: boolean = false;

  public title: string = "YAIVR"

  constructor(private srf: SubRedditFetcher) {
    Promise.longStackTraces();
    srf.getPosts(this.curSubreddit).then((imageList: ImageList) => {
      this.imageList = imageList
    }).catch(error => console.error(error));
    window.addEventListener("keydown", (event) => this.processKey(event))
    window.addEventListener("blur", (_) => this.loseFocus());
    window.addEventListener("blur", (_) => this.loseFocus());
  }

  get curPost(): RedditPost {
    return this.imageList.get(this.imageIndex);
  }

  updateSubreddit(sub: string) {
    console.log(`Updated sub to ${sub}`)
    this.curSubreddit = sub
    this.srf.getPosts(this.curSubreddit).then((imageList: ImageList) => {
      this.imageList = imageList;
    })
    this.imageIndex = 0;
    this.resetImageTimer();
  }

  nextImage() {
    this.imageIndex += 1;
    this.imageIndex %= this.imageList.images.length;
    this.resetImageTimer();
    if (this.needsImages()) {
      this.loadMoreImages().finally();
    }
  }

  prevImage() {
    if (this.imageIndex == 0) {
      this.imageIndex = this.imageList.images.length;
    }
    this.imageIndex -= 1;
    this.resetImageTimer()
  }

  doClick() {
    if (!this.docHasFocus) {
      this.docHasFocus = true;
      return;
    }
    this.nextImage();
  }

  /** Resets the timer that controls flipping to the next image. */
  resetImageTimer() {
    if (this.imageTimerId) {
      clearTimeout(this.imageTimerId)
      this.imageTimerId = null;
    }
    this.imageTimerId = setTimeout(() => {
      this.imageTimerId = null;
      this.nextImage()
    }, this.imageTimerMilliseconds)
  }

  processKey(event: KeyboardEvent): any {
    console.log("Key event: ")
    console.log(event)
    if (event.key == 'ArrowLeft') {
      this.prevImage();
    }
    if (event.key == 'ArrowRight') {
      this.nextImage();
    }
  }

  loseFocus() {
    this.docHasFocus = false;
  }

  private needsImages(): boolean {
    return this.imageIndex + 1 >= this.imageList.images.length;
  }

  private async loadMoreImages() {
    console.log(`adding more images from ${this.curSubreddit}`)
    await this.srf.addPosts(this.curSubreddit, this.imageList)
      .then(() => console.log(`Now have '${this.imageList.images.length}' images!`));
  }
}
