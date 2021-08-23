import {Injectable} from "@angular/core";
import {SubRedditFetcher} from "./subRedditFetcher";
import {environment} from "../environments/environment";
import {SubRedditPosts} from "./subRedditPosts";
import {RedditPost} from "./redditPost";

@Injectable({
  providedIn: 'root',
})
export class ImageSelector {
  private subPostLists: Map<string, SubRedditPosts> = new Map<string, SubRedditPosts>();
  private curSubreddit: string = environment.DEFAULT_SUBREDDIT;

  private subLoadingSemaphore: SubLoadingSemaphore = new SubLoadingSemaphore();

  constructor(private srf: SubRedditFetcher) {
  }

  public async setSubreddit(name: string) {
    this.curSubreddit = name;
    if (!this.subPostLists.has(name)) {
      await this.addNewSubreddit(name);
    }
  }

  private async addNewSubreddit(name: string) {
    console.log(`Adding new subreddit '${name}'`)
    let newPosts = new SubRedditPosts(name);
    this.subPostLists.set(name, newPosts);
    let added = newPosts.addImages(await this.subLoadingSemaphore.loadImages(this.srf, name))
    console.log(`added '${added}' images to ${name}`)
  }

  private async loadMoreImages(name: string) {
    console.log(`Adding images for subreddit ${name}`)
    let subPosts = this.subPostLists.get(name);
    if (!subPosts) {
      return this.addNewSubreddit(name);
    }
    let added = subPosts.addImages(await this.subLoadingSemaphore.loadImages(this.srf, name))
    console.log(`added '${added}' more images to ${name}`)
  }

  public prevImage() {
    let posts = this.subPostLists.get(this.curSubreddit);
    if (!posts) {
      return this.handleMissingSub()
    }

    posts.prev();
    if (posts.needsImages()) {
      this.loadMoreImages(this.curSubreddit).then()
    }
  }

  public nextImage() {
    let posts = this.subPostLists.get(this.curSubreddit);
    if (!posts) {
      return this.handleMissingSub()
    }

    posts.next();
    if (posts.needsImages()) {
      this.loadMoreImages(this.curSubreddit).then();
    }
  }

  public curImage(): RedditPost {
    let posts = this.subPostLists.get(this.curSubreddit);
    if (!posts) {
      this.handleMissingSub();
      return RedditPost.empty();
    }
    return posts.curImage()
  }

  private handleMissingSub() {
    console.error(`Current sub not loaded! sub=${this.curSubreddit}`);
    this.addNewSubreddit(this.curSubreddit).then(() => console.log(`sub '${this.curSubreddit}' has been loaded`));
  }
}

/**
 * Because loading can take a while, and it's something we only want to do once,
 * we wrap the loading portion in a semaphore.
 *
 * This might make more sense in the SRF class as a global loading gate,
 * but we'll see.
 */
class SubLoadingSemaphore {

  private stillLoading: Set<string> = new Set<string>();

  public async loadImages(srf: SubRedditFetcher, name: string):  Promise<RedditPost[]> {
    if (this.stillLoading.has(name)) {
      console.log(`tried loading '${name}', but still loading ${this.stillLoading}`)
      return [];
    }
    this.stillLoading.add(name);
    console.log(`beginning loading of ${name}`)
    let posts = await srf.getPosts(name);
    this.stillLoading.delete(name);
    console.log(`ending loading of ${name}`)
    return posts;
  }
}
