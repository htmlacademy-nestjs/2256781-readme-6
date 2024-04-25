export interface File {
  id?: string;
  title: string;
  hash: string;
  size: number;
  link: string;
  mimetype: string;
  createdAt?: Date;
  updatedAt?: Date;
}
