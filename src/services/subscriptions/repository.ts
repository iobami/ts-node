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

export const remove = async (endpoint: string): Promise<IResponse> => {
  try {
    const data = await Subscription.deleteOne({ endpoint });

    return { status: data.ok === 1 && data.deletedCount ? true : false };
  } catch (error) {
    return { status: false, error };
  }
};

export const read = async (): Promise<ISubscription[]> => {
  try {
    const subscriptions = await Subscription.find();

    return subscriptions;
  } catch (error) {
    return [];
  }
};
