import Twitter from 'twitter';
import { Application, Response } from 'express';

/* eslint-disable @typescript-eslint/camelcase */
export default (server: Application) => {
  const twitterClient: Twitter = new Twitter({
    consumer_key: '[KEY]',
    consumer_secret: '[KEY]',
    access_token_key: '325789526-[KEY]',
    access_token_secret: '[KEY]',
  });

  server.get('/twitter-feed', async (_, res: Response) => {
    const tweets = await twitterClient.get('statuses/user_timeline', {
      screen_name: '[SITE NAME]',
      count: 3,
    });
    res.json(tweets);
  });
};
/* eslint-enable @typescript-eslint/camelcase */
