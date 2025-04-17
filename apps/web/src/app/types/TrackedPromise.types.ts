export type TrackedPromise<T> =
    | {
          id: string;
          status: 'pending';
      }
    | {
          id: string;
          status: 'fulfilled';
          value: T;
      }
    | {
          id: string;
          status: 'rejected';
          error: any;
      };

export type PromiseStatus = TrackedPromise<any>['status'];
