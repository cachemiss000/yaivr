import {RedditPost} from "./redditPost"

export class ImageList {
  private imageMap: Map<string, RedditPost>
  private cachedImages?: RedditPost[]

  constructor(images: RedditPost[]) {
    this.imageMap = new Map()
    for (let image of images) {
      this.imageMap.set(image.postUrl, image);
    }
  }

  public get images(): readonly RedditPost[] {
    if (this.cachedImages == null) {
      this.cachedImages = [...this.imageMap.values()];
    }
    return this.cachedImages;
  }

  public put(image: RedditPost | RedditPost[]) {
    if (Array.isArray(image)) {
      image.forEach(i => this.put(i));
      return
    }
    this.imageMap.set(image.postUrl, image);
    this.cachedImages = undefined;
  }


  get(index: number): RedditPost {
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
