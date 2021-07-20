
import { RedditPost } from "./redditPost"

export class ImageList {
  constructor (public images : RedditPost[]) {}


  get(index: number) : RedditPost {
    if (!this.images.length || this.images.length < index) {
      console.debug("Index '" + index + "'out of bounds")
      return RedditPost.empty();
    }

    if (index < 0) {
      console.error(`Received sub-zero index '${index}'`);
      return RedditPost.empty();
    }

    return this.images[index];
  }

}
