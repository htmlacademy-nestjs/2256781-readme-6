import dayjs from 'dayjs';

import { Subscriber } from '@project/shared/core';

import { SubmitNewsDto } from '@project/email-subscriber';

export const getNewPosts = ({ posts, userId }: SubmitNewsDto, { dateOfNotification }: Subscriber) => {
  return posts.filter((post) => {
    return post.userId !== userId && dayjs(post.createdAt).isAfter(dateOfNotification ?? dayjs().subtract(1, 'day'));
  });
};
