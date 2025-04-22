import { useTranslation } from 'react-i18next';

import { Textarea } from '@lemon/ui-kit/components/ui/textarea';

import { ImageUploader } from '../components';

import type { FeedBody } from '@lemoncloud/pets-socials-api';
import type { useForm } from 'react-hook-form';

interface FeedContentEditorProps {
    methods: ReturnType<typeof useForm<FeedBody>>;
}

export const FeedContentEditor = ({ methods }: FeedContentEditorProps) => {
    const { t } = useTranslation();
    const {
        register,
        formState: { errors },
    } = methods;

    return (
        <div className="space-y-5">
            <div>
                <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium">
                        {t('feeds.form.content', '내용')}
                        <span className="ml-1 text-red-500">*</span>
                    </label>
                    <span className="text-muted-foreground text-xs">{methods.watch('text')?.length || 0}/2000</span>
                </div>
                <Textarea
                    {...register('text', {
                        required: t('feeds.form.validation.contentRequired', '내용을 입력해주세요') as string,
                        maxLength: {
                            value: 2000,
                            message: t('feeds.form.validation.contentLength', '내용은 2000자 이내로 입력해주세요'),
                        },
                    })}
                    rows={8}
                    className="min-h-[120px] resize-y"
                    placeholder={t('feeds.form.contentPlaceholder', '피드 내용을 입력하세요...')}
                />
                {errors.text && (
                    <p className="mt-1.5 flex items-center text-sm text-red-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="mr-1 h-4 w-4"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                                clipRule="evenodd"
                            />
                        </svg>
                        {errors.text.message}
                    </p>
                )}
            </div>

            <div className="rounded-lg border border-dashed p-4">
                <ImageUploader methods={methods} />
            </div>
        </div>
    );
};
