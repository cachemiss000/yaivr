import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RedditPost} from "./redditPost";
import {Child, Convert} from "./schema/subredditListing"


let SUPPORTED_POST_TYPES = ["image"]; // TODO: rich:video

@Injectable({
  providedIn: "root",
})
export class SubRedditFetcher {
  private subreddits: Map<string, Subreddit> = new Map();

  constructor(private http: HttpClient) {
  }

  async getPosts(name: string): Promise<RedditPost[]> {
    let posts = await this.getSubreddit(name).getPosts(this.http);
    return posts.filter(SubRedditFetcher.supported).map(RedditPost.fromPostData);
  }

  private static supported(child: Child) {
    return child.data?.post_hint || "" in SUPPORTED_POST_TYPES;
  }

  private getSubreddit(name: string): Subreddit {
    let s = this.subreddits.get(name);
    if (s == null) {
      s = new Subreddit(name);
      this.subreddits.set(name, s);
    }
    return s;
  }
}


class Subreddit {
  constructor(private subredditName: string, private after?: string, private count = 0, private limit = 10) {
  }

  async getPosts(http: HttpClient): Promise<Child[]> {
    let url = new URL(`https://www.reddit.com/r/${this.subredditName}.json`);
    if (this.after != null) {
      url.searchParams.append('after', this.after);
    }
    if (this.count) {
      url.searchParams.append('count', String(this.count));
    }
    if (this.limit) {
      url.searchParams.append('limit', String(this.limit));
    }
    let response = await Promise.resolve(http.get(url.toString(), {responseType: "text"}).toPromise());
    let listing = Convert.toSubredditListing(response);
    if (listing == null || listing.data == null || listing.data.children == null) {
      throw new TypeError(`Listing missing expected data: ${listing}`)
    }
    this.after = listing.data?.after || undefined;
    this.count += listing.data?.dist || 0;
    return listing.data.children;
  }
}
