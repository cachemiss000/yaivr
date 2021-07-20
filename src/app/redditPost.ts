

export class RedditPost {
  constructor(readonly subreddit: string, readonly postHint: string,
              readonly postUrl: string, readonly title: string) {}

  static empty() : RedditPost {
    return new RedditPost("", "", "", "");
  }

  static fromPostData(child: any) : RedditPost {
    let data = child?.data;
    if (!data) {
      console.log(`Attempted to parse invalid post object ${child}`);
      return this.empty();
    }
    return new RedditPost(data.subreddit, data.post_hint, data.url, data.title);
  }
}
