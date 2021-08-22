import {Child} from "./schema/subredditListing";


let ERROR_STR = "<ERROR>"

export class RedditPost {
  constructor(readonly subreddit: string, readonly postHint: string,
              readonly postUrl: string, readonly title: string) {
    if ([subreddit, postHint, postUrl, title].find((s, _) => s == ERROR_STR) != null) {
      console.error(`Error loading subreddit data: '${JSON.stringify(this)}'`)
    }
  }

  static empty(): RedditPost {
    return new RedditPost("", "", "", "");
  }

  static fromPostData(child: Child): RedditPost {
    let data = child?.data;
    if (!data) {
      console.log(`Attempted to parse invalid post object ${child}`);
      return this.empty();
    }
    return new RedditPost(u(data.subreddit), u(data.post_hint), u(data.url), u(data.title));
  }
}

// "Unwrap" - for maybe-nulls.
function u(data?: string) {
  return data || ERROR_STR;
}
