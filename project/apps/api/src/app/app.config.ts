export enum ApplicationServiceURL {
  Users = 'http://localhost:4000/api/auth',
  Blog = 'http://localhost:4001/api/posts',
  Likes = 'http://localhost:4001/api/likes',
  Comments = 'http://localhost:4001/api/comments',
  Files = 'http://localhost:4002/api/files',
  Notification = 'http://localhost:4003/api/notification',
  Api = 'http://localhost:4004/*',
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 3000;
