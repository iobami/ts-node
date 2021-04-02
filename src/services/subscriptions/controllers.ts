import { NextFunction, Request, Response } from 'express';
import webpush from 'web-push';

import { responseBody } from '../../helpers/utils';
import * as subscriptionRepository from './repository';

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, data, error } = await subscriptionRepository.create(req.body);

    if (status) {
      const response = responseBody(true, 'Subscription successful', data);
      res.json(response);
    } else {
      const response = responseBody(false, 'Subscription failed', error.message || '');
      res.status(400).json(response);
    }

  } catch (e) {
    next(e);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const endpoint: string = req.query.endpoint ? req.query.endpoint.toString() : '';

    if (!endpoint) {
      const response = responseBody(false, 'Failed to unsubscribe', `${endpoint} invalid`);
      res.status(400).json(response);
      return;
    }

    const { status, error } = await subscriptionRepository.remove(endpoint);

    if (status) {
      const response = responseBody(true, 'Subscription cancelled', {});
      res.json(response);
    } else {
      const response = responseBody(false, 'Unable to cancel subscription', error.message || '');
      res.status(500).json(response);
    }
  } catch (e) {
    next(e);
  }
};

export const broadcast = async ({}, res: Response, next: NextFunction): Promise<void> => {
  try {
    const notification = { title: 'Hey, this is a push notification!' };

    const subscriptions = await subscriptionRepository.read();

    const notifications: Promise<any>[] = [];

    subscriptions.forEach((subscription: any) => {
      notifications.push(
        webpush.sendNotification(subscription, JSON.stringify(notification))
      );
    });

    await Promise.all(notifications);

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};