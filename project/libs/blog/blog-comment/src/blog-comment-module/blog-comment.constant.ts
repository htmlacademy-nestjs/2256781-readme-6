import { SortDirection } from '@project/shared/core';

export const COMMENT_MAX_COMMENTS_COUNT = 50;

export const COMMENT_DEFAULT_SORT_DIRECTION = SortDirection.Desc;

export const CommentTextLength = {
  Min: 10,
  Max: 300,
};

export const CommentValidateMessage = {
  MessageIsEmpty: 'The message is empty',
  InvalidPostId: 'Invalid post id',
} as const;

export enum CommentInfo {
  Add = 'Comment added',
  Remove = 'Comment removed',
  Update = 'Comment updated',
  ShowAll = 'All comments',
  Show = 'Comment by id'
}
