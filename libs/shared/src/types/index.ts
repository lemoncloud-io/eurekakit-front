export interface ListResult<T, R = any> {
    /**
     * total searched count
     */
    total?: number;
    /**
     * max items count in the page
     */
    limit?: number;
    /**
     * current page number.
     */
    page?: number;
    /**
     * (optional) time took in sec
     */
    took?: number;
    /**
     * items searched
     */
    list: T[];
    /**
     * (optional) aggr list
     */
    aggr?: R[];
}

export interface PaginationType<T> {
    page: number | undefined;
    total: number | undefined;
    data: T;
}

export declare type Params = {
    [key: string]: any;
};

export type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type NonNullableObject<T extends Record<string, any>> = { [K in keyof T]: NonNullable<T[K]> };

export type TrackedPromise<T> = {
    id: string;
    status: 'pending' | 'fulfilled' | 'rejected';
    value?: T;
    error?: any;
};

export type PromiseStatus = TrackedPromise<any>['status'];
