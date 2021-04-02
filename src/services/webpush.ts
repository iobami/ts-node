import webpush from 'web-push';

export default (): void => {
  webpush.setVapidDetails(
    'mailto:test@test.com',
    process.env.WEB_PUSH_PUBLIC_KEY || '',
    process.env.WEB_PUSH_PRIVATE_KEY || '',
  );
};
