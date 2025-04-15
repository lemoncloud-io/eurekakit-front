import { useForm, useWatch } from 'react-hook-form';

import { DevTool } from '@hookform/devtools';

import { useCrerateFeed } from '@lemon/feeds';
import { cn } from '@lemon/ui-kit';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@lemon/ui-kit/components/ui/form';
import { Separator } from '@lemon/ui-kit/components/ui/separator';
import { Textarea } from '@lemon/ui-kit/components/ui/textarea';

import { PostEditorImageUploader } from './PostEditorImageUploader';
import { useNavigate } from '../../../../hooks';
import { isDev } from '../../../../utils';

import type { FeedBody } from '@lemoncloud/pets-socials-api';

export const PostEditor = () => {
    const navigate = useNavigate();
    const methods = useForm<FeedBody>({ mode: 'all' });
    const { mutate: createFeed } = useCrerateFeed();

    const postText = useWatch({ control: methods.control, name: 'text' });
    const isSubmitBtnDisabled = !postText?.length || !!methods.getFieldState('text').error;

    // TODO : 글쓰기 상세로 이동
    const submitPost = (feedBody: FeedBody) => {
        createFeed(feedBody, { onSuccess: () => navigate(-1) });
    };

    return (
        <div className="flex w-full flex-col gap-3 p-4">
            <Form {...methods}>
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
                                        className={cn(
                                            'text-secondary-foreground',
                                            fieldState.error && 'text-destructive'
                                        )}
                                    >
                                        20글자 이상 작성해주세요
                                    </span>
                                    <span className="text-muted-foreground">{field.value?.length}/1,500</span>
                                </div>
                            </div>
                        </FormItem>
                    )}
                />
                <PostEditorImageUploader />
                <Separator className="h-6 bg-transparent" />
                <Button disabled={isSubmitBtnDisabled} className="w-full" onClick={methods.handleSubmit(submitPost)}>
                    작성 완료
                </Button>
            </Form>
        </div>
    );
};
