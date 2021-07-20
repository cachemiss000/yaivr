import {Injectable} from "@angular/core";
import {ImageList} from "./imageList";
import {HttpClient} from "@angular/common/http";
import {RedditPost} from "./redditPost";

@Injectable()
export class SubRedditFetcher {
  constructor(private http: HttpClient) {
  }

  getPosts(name: string): Promise<ImageList> {
    let url = `https://www.reddit.com/r/${name}.json`;
    return this.http.get(url, {responseType: "json"}).toPromise().then((response: any) => {
      return new ImageList(
        response.data.children.map((o: any): RedditPost => RedditPost.fromPostData(o))
          .filter((o: RedditPost) => o.postHint == "image"));
    });
  }
}

