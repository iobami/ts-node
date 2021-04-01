import { Express } from 'express';

import subscriptions from './subscriptions/routes';

const BASE_URL = '/api/v1';

export const routes = (app: Express) => {
  app.use(BASE_URL + '/subscriptions', subscriptions),

  // catch 404 and forward to error handler
  app.use(function ({ }, res) {
    const err = new Error('Not Found');
    const errorResponse = { ...err, error: true, message: err.message };
    res.status(404).send(errorResponse);
  })
};