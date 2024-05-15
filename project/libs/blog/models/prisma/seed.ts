import { PrismaClient } from '@prisma/client';
import { PostContent } from '../../../shared/core/src';

const FIRST_POST_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_POST_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';
const THIRD_POST_UUID = 'cc38c0dc-750f-4015-8d2e-28f132fc861a';

const FIRST_USER_ID = '41d7e142-c8e5-44d3-806e-1d7d1f71fbb9';
const SECOND_USER_ID = 'b39c84dd-9dc5-49c6-8d82-55f86510b1c5 ';

function getLikes() {
  return [
    { userId: FIRST_USER_ID },
    { userId: SECOND_USER_ID },
  ];
}

function getComments() {
  return [
    {
      message: 'Это действительно отличное видео!',
      userId: SECOND_USER_ID,
    },
    {
      message: 'Надо будет обязательно пересмотреть. Слишком много информации.',
      userId: FIRST_USER_ID,
    }
  ];
}

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      title: 'Моя рецензия на книгу «Худеющий»',
      userId: FIRST_USER_ID,
      type: PostContent.text,
      excerpt: 'Недавно прочитал страшный роман «Худеющий».',
      description: 'На мой взгляд, это один из самых страшных романов Стивена Кинга.',
      likes: [
        getLikes()[1]
      ],
    },
    {
      id: SECOND_POST_UUID,
      title: 'Криптография в Node js - Хеширование и шифрование',
      type: PostContent.video,
      link: 'https://www.youtube.com/watch?v=86npYplqO5Q',
      userId: SECOND_USER_ID,
      description: 'В этом видео мы рассмотрим криптографию в Node.js: хеширование, шифрование, модуль crypto, а также его методы: createCipher, createCipherIv, createDecipherIv, createHash, randomBytes, scrypt и другие.',
      tags: ['JS, programming'],
      likes: [
        getLikes()[0]
      ],
      comments: [
        ...getComments()
      ]
    },
    {
      id: THIRD_POST_UUID,
      userId: SECOND_USER_ID,
      type: PostContent.quote,
      quoteAuthor: 'Герман Гессе',
      description: 'В основном свободу человек проявляет только в выборе зависимости',
      tags: ['quotes'],
    },
  ]
}

async function seedDb(prismaClient: PrismaClient) {
  const mockPosts = getPosts();

  for (const post of mockPosts) {
    await prismaClient.post.create({
      data: {
        id: post.id,
        userId: post.userId,
        type: post.type,
        tags: post.tags,
        likes: post.likes ? {
          create: post.likes
        } : undefined,
        comments: post.comments ? {
          create: post.comments
        } : undefined,
        title: post.title,
        description: post.description,
        link: post.link,
        quoteAuthor: post.quoteAuthor,

      }
    })
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
