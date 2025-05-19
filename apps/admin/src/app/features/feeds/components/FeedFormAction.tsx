import { useTranslation } from 'react-i18next';

import { Trash } from 'lucide-react';

import { Loader } from '@lemon/shared';
import { Button } from '@lemon/ui-kit/components/ui/button';

interface FeedFormActionsProps {
    id?: string;
    handleDeleteFeed: () => void;
    navigate: (path: string) => void;
    isLoading: boolean;
    isFeedUpdating: boolean;
    isFeedCreating: boolean;
}

export const FeedFormActions = ({
    id,
    handleDeleteFeed,
    navigate,
    isLoading,
    isFeedUpdating,
    isFeedCreating,
}: FeedFormActionsProps) => {
    const { t } = useTranslation();

    return (
        <div className="flex justify-between border-t pt-6">
            <div>
                {id && (
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDeleteFeed}
                        disabled={isLoading || isFeedUpdating || isFeedCreating}
                        className="gap-1"
                    >
                        <Trash className="h-4 w-4" />
                        {t('feeds.form.deleteFeed', '피드 삭제')}
                    </Button>
                )}
            </div>
            <div className="flex space-x-3">
                <Button type="button" variant="outline" onClick={() => navigate('/feeds')}>
                    {t('common.cancel', '취소')}
                </Button>
                <Button type="submit" disabled={isFeedCreating || isFeedUpdating} className="min-w-24 px-6">
                    {isFeedCreating || isFeedUpdating ? (
                        <div className="flex items-center gap-2">
                            <Loader size="sm" className="text-white" />
                        </div>
                    ) : id ? (
                        t('common.update', '수정')
                    ) : (
                        t('common.create', '작성')
                    )}
                </Button>
            </div>
        </div>
    );
};
