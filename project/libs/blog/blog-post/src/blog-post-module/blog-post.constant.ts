import { SortBy, SortDirection } from '@project/shared/core';

export const POST_DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const POST_DEFAULT_PAGE_COUNT = 1;
export const POST_DEFAULT_COUNT_LIMIT = 25;
export const POST_DEFAULT_SEARCH_COUNT_LIMIT = 20;
export const POST_DEFAULT_SORT_BY = SortBy.CreatedAt;

export const PostTitleLength = {
  Min: 20,
  Max: 50,
};
export const PostExcerptLength = {
  Min: 50,
  Max: 225,
};
export const PostTextLength = {
  Min: 100,
  Max: 1024,
};
export const PostQuoteLength = {
  Min: 20,
  Max: 300,
};
export const PostAuthorLength = {
  Min: 3,
  Max: 50,
};
export const PostTagDefaultParam = {
  MinLength: 3,
  MaxLength: 10,
  Amount: 8,
};

export const POST_LINK_DESCRIPTION_LENGTH = 300;

export const PostRegExpPattern = {
  Video: /((http(s)?:\/\/)?)(www\.)?((youtube\.com\/)|(youtu.be\/))[\S]+/,
  Tag: /^[A-Za-zА-Яа-я]([A-Za-zА-Яа-я0-9_.])+$/g,
};

export const PostError = {
  WrongSource: 'Video link must be from Youtube',
  WrongTagStart: 'Tags should not start with a digit',
  SpacesInTag: 'Tags should not contain spaces',
  AlreadyReposted: 'The post has already been republished',
  Delete: 'The post is not deleted',
  PostNotFound: 'The post is not found',
  WrongType: 'Wrong post type',
  NotUserAuthor: 'User is not an author of this Post',
  EmptyList: 'Posts list is empty',
} as const;

export enum PostInfo {
  Search = 'Search result by title',
  Add = 'Post is added',
  Remove = 'Post removed',
  Repost = 'Reposted',
  Update = 'Post updated',
  ShowAll = 'All posts',
  ShowAllUserDrafts = 'Show all user draft posts',
  ShowUserPostCount = 'User all posts count',
  Show = 'Post by id',
  SendNews = 'News',
}
