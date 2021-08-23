import {RedditPost} from "./redditPost";
import {environment} from "../environments/environment";

export class SubRedditPosts {


  private existingPosts: Set<string> = new Set();
  private posts: RedditPost[] = [];
  private index: number = 0;

  constructor(private subreddit: string) {
  }

  setIndex(newIndex: number) {
    if (newIndex >= this.posts.length || newIndex < 0) {
      throw new RangeError(`Index '${newIndex}' outside of expected bounds
      for ${this.posts.length} images in sub ${this.subreddit}`);
    }
    this.index = newIndex;
  }

  prev() {
    this.index -= 1;
    if (this.index < 0) {
      this.index = this.posts.length - 1;
    }
  }

  next() {
    this.index = (this.index + 1) % this.posts.length;
  }

  /** Adds input images idempotently based on title.
   *
   * @param newPosts the set of posts to add to the list
   * @returns the number of posts newly added.
   */
  addImages(newPosts: RedditPost[]): number {
    let curPosts = this.posts.length;
    newPosts.filter(p => !this.existingPosts.has(p.title)).map(p => {
      this.posts.push(p);
      this.existingPosts.add(p.title);
    });
    return this.posts.length - curPosts;
  }

  /**
   * Returns true if the imageList is within the "preload distance",  and thus
   * the parent should call "addImages" with new images.
   */
  needsImages(): boolean {
    return (this.posts.length - this.index - 1) <= environment.PRELOAD_DISTANCE;
  }

  curImage(): RedditPost {
    return this.posts[this.index]
  }
}
