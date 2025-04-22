import { useTranslation } from 'react-i18next';


import { formatDate } from '@lemon/shared';
import { Badge } from '@lemon/ui-kit/components/ui/badge';




import type { FeedView} from '@lemon/feeds';

interface FeedBasicInfoProps {
    feed: FeedView;
}

export const FeedBasicInfo = ({ feed }: FeedBasicInfoProps) => {
    const { t } = useTranslation();

    return (
        <div className="bg-card/50 rounded-lg border p-5">
            <h3 className="mb-4 text-base font-medium">{t('feeds.form.basicInfo', '기본 정보')}</h3>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-muted-foreground text-xs font-medium">{t('feeds.form.id', 'ID')}</label>
                        <div className="bg-muted/30 mt-1 overflow-hidden overflow-ellipsis rounded px-3 py-2 font-mono text-sm">
                            {feed.id}
                        </div>
                    </div>
                    <div>
                        <label className="text-muted-foreground text-xs font-medium">
                            {t('feeds.form.feedNo', '피드 번호')}
                        </label>
                        <div className="bg-muted/30 mt-1 rounded px-3 py-2 text-sm">{feed.feedNo}</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-muted-foreground text-xs font-medium">
                            {t('feeds.form.createdAt', '생성일')}
                        </label>
                        <div className="bg-muted/30 mt-1 rounded px-3 py-2 text-sm">{formatDate(feed.createdAt)}</div>
                    </div>
                    <div>
                        <label className="text-muted-foreground text-xs font-medium">
                            {t('feeds.form.updatedAt', '수정일')}
                        </label>
                        <div className="bg-muted/30 mt-1 rounded px-3 py-2 text-sm">{formatDate(feed.updatedAt)}</div>
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-muted-foreground text-xs font-medium">
                        {t('feeds.form.author', '작성자')}
                    </label>
                    <div className="bg-muted/30 flex items-center space-x-2 rounded p-2">
                        {feed.user$?.nick ? (
                            <div className="flex-1">
                                <p className="font-medium">{feed.user$.nick}</p>
                                {feed.user$?.name && <p className="text-muted-foreground text-xs">{feed.user$.name}</p>}
                            </div>
                        ) : (
                            <div className="text-muted-foreground text-sm">-</div>
                        )}
                        {feed.userId && (
                            <Badge variant="outline" className="ml-auto">
                                {feed.userId}
                            </Badge>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                    <div className="flex items-center">
                        <span className="text-muted-foreground mr-2 text-xs font-medium">
                            {t('feeds.form.comments', '답글')}
                        </span>
                        <Badge variant="secondary">{feed.childNo || 0}</Badge>
                    </div>

                    <div className="flex items-center">
                        <span className="text-muted-foreground mr-2 text-xs font-medium">
                            {t('feeds.form.likes', '좋아요')}
                        </span>
                        <Badge variant="secondary">{feed.likeCount || 0}</Badge>
                    </div>

                    <div className="flex items-center">
                        <span className="text-muted-foreground mr-2 text-xs font-medium">
                            {t('feeds.form.images', '이미지')}
                        </span>
                        <Badge variant="secondary">{feed.image$$?.length || 0}</Badge>
                    </div>
                </div>
            </div>
        </div>
    );
};
