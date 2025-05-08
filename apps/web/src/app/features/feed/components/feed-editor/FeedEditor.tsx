import { useFormContext, useWatch } from 'react-hook-form';

import { DevTool } from '@hookform/devtools';

import { cn } from '@lemon/ui-kit';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel } from '@lemon/ui-kit/components/ui/form';
import { Textarea } from '@lemon/ui-kit/components/ui/textarea';

import { FeedEditorImageUploader } from './FeedEditorImageUploader';
import { isDev } from '../../../../utils';

import type { FeedBody } from '@lemoncloud/pets-socials-api';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';

interface FeedEditorProps {
    isSubmitting?: boolean;
    onValid: SubmitHandler<FeedBody>;
    onInvalid?: SubmitErrorHandler<FeedBody>;
}

export const FeedEditor = ({ isSubmitting, onValid, onInvalid }: FeedEditorProps) => {
    const methods = useFormContext<FeedBody>();

    const watchedText = useWatch({ control: methods.control, name: 'text' });
    const isTextDirty = watchedText?.length !== 0;

    const isSubmitBtnDisabled = !(isTextDirty && !methods.getFieldState('text').error);

    return (
        <div className="flex h-full w-full flex-col gap-3">
            {isDev() && <DevTool control={methods.control} />}
            <FormField
                control={methods.control}
                name="text"
                rules={{ minLength: 20, maxLength: 1500, required: true }}
                render={({ field, fieldState }) => (
                    <FormItem>
                        <FormLabel>
                            내용
                            <span className="text-destructive ml-0.5">*</span>
                        </FormLabel>
                        <div
                            className={cn(
                                'focus-within:ring-secondary-foreground rounded-lg border focus-within:ring-1',
                                fieldState.error && '!ring-destructive ring-1'
                            )}
                        >
                            <FormControl>
                                <Textarea
                                    className={
                                        'h-72 resize-none rounded-b-none border-none text-sm focus-visible:ring-0'
                                    }
                                    placeholder="내용을 입력해주세요"
                                    {...field}
                                />
                            </FormControl>
                            <div className="flex justify-between px-3 py-4 text-xs">
                                <span
                                    className={cn('text-secondary-foreground', fieldState.error && 'text-destructive')}
                                >
                                    20글자 이상 작성해주세요
                                </span>
                                <span className="text-muted-foreground">{field.value?.length}/1,500</span>
                            </div>
                        </div>
                    </FormItem>
                )}
            />
            <FeedEditorImageUploader />
            <Button
                isLoading={isSubmitting}
                disabled={isSubmitBtnDisabled}
                className="mt-auto w-full"
                onClick={methods.handleSubmit(onValid, onInvalid)}
            >
                작성 완료
            </Button>
        </div>
    );
};
