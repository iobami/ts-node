import Subscription, { ISubscription } from './model';

interface IResponse {
  status: boolean;
  error?: any;
  data?: ISubscription;
}

export const create = async (subscription: ISubscription): Promise<IResponse> => {
  try {
    const newSubscription = new Subscription(subscription);
    const data = await newSubscription.save();
    return { status: true, data };
  } catch (error) {
    return { status: false, error };
  }
};
