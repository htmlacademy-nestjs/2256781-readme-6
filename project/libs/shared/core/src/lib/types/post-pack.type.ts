import { LinkPost } from '../interfaces/post-link.interface';
import { PhotoPost } from '../interfaces/post-photo.interface';
import { QuotePost } from '../interfaces/post-quote.interface';
import { TextPost } from '../interfaces/post-text.interface';
import { VideoPost } from '../interfaces/post-video.interface';

export type TGenericPost = LinkPost | PhotoPost | QuotePost | TextPost | VideoPost
