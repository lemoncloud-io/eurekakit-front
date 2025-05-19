export type TrackedPromise<T> = {
    id: string;
    status: 'pending' | 'fulfilled' | 'rejected';
    value?: T;
    error?: any;
};

export type PromiseStatus = TrackedPromise<any>['status'];
