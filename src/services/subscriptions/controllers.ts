import { NextFunction, Request, Response } from 'express';

import { responseBody } from '../../helpers/utils';
import * as subscriptionRepository from './repository';

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, data, error } = await subscriptionRepository.create(req.body);

    if (status) {
      const response = responseBody(true, 'Subscription successfully', data);
      res.json(response);
    } else {
      const response = responseBody(false, 'Subscription failed', error.message || '');
      res.status(400).json(response);
    }

  } catch (e) {
    next(e);
  }
};
