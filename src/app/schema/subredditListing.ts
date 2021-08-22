// To parse this data:
//
//   import { Convert, SubredditListing } from "./file";
//
//   const subredditListing = Convert.toSubredditListing(json);

export interface SubredditListing {
  kind?: string;
  data?: SubredditListingData;
}

export interface SubredditListingData {
  after?:      string;
  dist?:       number;
  modhash?:    string;
  geo_filter?: null;
  children?:   Child[];
  before?:     null;
}

export interface Child {
  kind?: Kind;
  data?: ChildData;
}

export interface ChildData {
  approved_at_utc?:               null;
  subreddit?:                     Subreddit;
  selftext?:                      string;
  author_fullname?:               string;
  saved?:                         boolean;
  mod_reason_title?:              null;
  gilded?:                        number;
  clicked?:                       boolean;
  is_gallery?:                    boolean;
  title?:                         string;
  link_flair_richtext?:           any[];
  subreddit_name_prefixed?:       SubredditNamePrefixed;
  hidden?:                        boolean;
  pwls?:                          number;
  link_flair_css_class?:          null;
  downs?:                         number;
  thumbnail_height?:              number | null;
  top_awarded_type?:              null;
  hide_score?:                    boolean;
  media_metadata?:                { [key: string]: MediaMetadatum };
  name?:                          string;
  quarantine?:                    boolean;
  link_flair_text_color?:         LinkFlairTextColor;
  upvote_ratio?:                  number;
  author_flair_background_color?: null;
  ups?:                           number;
  domain?:                        Domain;
  media_embed?:                   Gildings;
  thumbnail_width?:               number | null;
  author_flair_template_id?:      null;
  is_original_content?:           boolean;
  user_reports?:                  any[];
  secure_media?:                  null;
  is_reddit_media_domain?:        boolean;
  is_meta?:                       boolean;
  category?:                      null;
  secure_media_embed?:            Gildings;
  gallery_data?:                  GalleryData;
  link_flair_text?:               null;
  can_mod_post?:                  boolean;
  score?:                         number;
  approved_by?:                   null;
  is_created_from_ads_ui?:        boolean;
  author_premium?:                boolean;
  thumbnail?:                     string;
  edited?:                        boolean;
  author_flair_css_class?:        null;
  author_flair_richtext?:         any[];
  gildings?:                      Gildings;
  content_categories?:            null;
  is_self?:                       boolean;
  subreddit_type?:                SubredditType;
  created?:                       number;
  link_flair_type?:               FlairType;
  wls?:                           number;
  removed_by_category?:           null;
  banned_by?:                     null;
  author_flair_type?:             FlairType;
  total_awards_received?:         number;
  allow_live_comments?:           boolean;
  selftext_html?:                 null | string;
  likes?:                         null;
  suggested_sort?:                null;
  banned_at_utc?:                 null;
  url_overridden_by_dest?:        string;
  view_count?:                    null;
  archived?:                      boolean;
  no_follow?:                     boolean;
  is_crosspostable?:              boolean;
  pinned?:                        boolean;
  over_18?:                       boolean;
  all_awardings?:                 AllAwarding[];
  awarders?:                      any[];
  media_only?:                    boolean;
  can_gild?:                      boolean;
  spoiler?:                       boolean;
  locked?:                        boolean;
  author_flair_text?:             null;
  treatment_tags?:                any[];
  visited?:                       boolean;
  removed_by?:                    null;
  mod_note?:                      null;
  distinguished?:                 null;
  subreddit_id?:                  SubredditID;
  author_is_blocked?:             boolean;
  mod_reason_by?:                 null;
  num_reports?:                   null;
  removal_reason?:                null;
  link_flair_background_color?:   string;
  id?:                            string;
  is_robot_indexable?:            boolean;
  report_reasons?:                null;
  author?:                        string;
  discussion_type?:               null;
  num_comments?:                  number;
  send_replies?:                  boolean;
  whitelist_status?:              WhitelistStatus;
  contest_mode?:                  boolean;
  mod_reports?:                   any[];
  author_patreon_flair?:          boolean;
  author_flair_text_color?:       null;
  permalink?:                     string;
  parent_whitelist_status?:       WhitelistStatus;
  stickied?:                      boolean;
  url?:                           string;
  subreddit_subscribers?:         number;
  created_utc?:                   number;
  num_crossposts?:                number;
  media?:                         null;
  is_video?:                      boolean;
  post_hint?:                     string;
  preview?:                       Preview;
}

export interface AllAwarding {
  giver_coin_reward?:                    number;
  subreddit_id?:                         null;
  is_new?:                               boolean;
  days_of_drip_extension?:               number;
  coin_price?:                           number;
  id?:                                   string;
  penny_donate?:                         number;
  award_sub_type?:                       string;
  coin_reward?:                          number;
  icon_url?:                             string;
  days_of_premium?:                      number;
  tiers_by_required_awardings?:          null;
  resized_icons?:                        ResizedIcon[];
  icon_width?:                           number;
  static_icon_width?:                    number;
  start_date?:                           null;
  is_enabled?:                           boolean;
  awardings_required_to_grant_benefits?: null;
  description?:                          string;
  end_date?:                             null;
  subreddit_coin_reward?:                number;
  count?:                                number;
  static_icon_height?:                   number;
  name?:                                 string;
  resized_static_icons?:                 ResizedIcon[];
  icon_format?:                          string;
  icon_height?:                          number;
  penny_price?:                          number;
  award_type?:                           string;
  static_icon_url?:                      string;
}

export interface ResizedIcon {
  url?:    string;
  width?:  number;
  height?: number;
}

export enum FlairType {
  Text = "text",
}

export enum Domain {
  IReddIt = "i.redd.it",
  RedditCOM = "reddit.com",
  SelfPhotos = "self.photos",
}

export interface GalleryData {
  items?: Item[];
}

export interface Item {
  media_id?: string;
  id?:       number;
}

export interface Gildings {
}

export enum LinkFlairTextColor {
  Dark = "dark",
}

export interface MediaMetadatum {
  status?: string;
  e?:      string;
  m?:      string;
  p?:      S[];
  s?:      S;
  id?:     string;
}

export interface S {
  y?: number;
  x?: number;
  u?: string;
}

export enum WhitelistStatus {
  AllAds = "all_ads",
}

export interface Preview {
  images?:  Image[];
  enabled?: boolean;
}

export interface Image {
  source?:      ResizedIcon;
  resolutions?: ResizedIcon[];
  variants?:    Gildings;
  id?:          string;
}

export enum Subreddit {
  Photos = "photos",
}

export enum SubredditID {
  T52Qh42 = "t5_2qh42",
}

export enum SubredditNamePrefixed {
  RPhotos = "r/photos",
}

export enum SubredditType {
  Public = "public",
}

export enum Kind {
  T3 = "t3",
}

// Converts JSON strings to/from your types
export class Convert {
  public static toSubredditListing(json: string): SubredditListing {
    return JSON.parse(json);
  }

  public static subredditListingToJson(value: SubredditListing): string {
    return JSON.stringify(value);
  }
}
