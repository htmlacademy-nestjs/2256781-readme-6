import { LinkPost } from './post-link.interface';
import { PhotoPost } from './post-photo.interface';
import { QuotePost } from './post-quote.interface';
import { TextPost } from './post-text.interface';
import { VideoPost } from './post-video.interface';

export type CommonPost = LinkPost | PhotoPost | QuotePost | TextPost | VideoPost
