export interface UploadView {
    list: {
        id: string;
        createdAt: number;
        updatedAt: number;
        deletedAt: number;
        contentLength: number;
        contentType: string;
        hash: string;
        height: number;
        name: string;
        ns: string;
        origin: string;
        type: string;
        width: number;
        location: string;
        url: string;
    }[];
    isMultipart: boolean;
    error?: string;
}
