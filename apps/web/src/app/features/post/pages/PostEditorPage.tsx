import { useForm } from 'react-hook-form';

import { DevTool } from '@hookform/devtools';
import { Image, X } from 'lucide-react';

import { useCrerateFeed } from '@lemon/feeds';
import { cn } from '@lemon/ui-kit';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@lemon/ui-kit/components/ui/form';
import List from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';
import { Textarea } from '@lemon/ui-kit/components/ui/textarea';

import { isDev } from '../../../utils';

import type { FeedBody } from '@lemoncloud/pets-socials-api';

export const PostEditorPage = () => {
    const methods = useForm<FeedBody>();
    const { mutate: createFeed } = useCrerateFeed();

    const submitPost = (feedBody: FeedBody) => {
        createFeed(feedBody);
    };

    return (
        <div className="w-full">
            <header className="flex h-12 w-full items-center justify-between border-b px-2">
                <div className="w-9" />
                <span className="font-medium">새로운 글쓰기</span>
                <Button size={'icon'} variant={'ghost'}>
                    <X />
                </Button>
            </header>
            <div className="flex w-full flex-col gap-3 p-4">
                <Form {...methods}>
                    {isDev() && <DevTool control={methods.control} />}
                    <FormField
                        control={methods.control}
                        name="text"
                        rules={{ minLength: 20, maxLength: 1500 }}
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
                                                'h-72 resize-none rounded-b-none border-none focus-visible:ring-0'
                                            }
                                            placeholder="내용을 입력해주세요"
                                            {...field}
                                        />
                                    </FormControl>
                                    <div className="flex justify-between px-3 py-4 text-xs">
                                        <span className="text-secondary-foreground">20글자 이상 작성해주세요</span>
                                        <span className="text-muted-foreground">{field.value?.length}/1,500</span>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />
                    <List horizontal>
                        <Button
                            variant={'outline'}
                            size={'icon'}
                            className="h-[72px] w-[72px] flex-col gap-1 border-dashed"
                        >
                            <Image size={24} className="text-secondary-foreground !h-7 !w-7" />
                            <span className="text-muted-foreground text-xs">0/5</span>
                        </Button>
                    </List>
                    <Separator className="h-6 bg-transparent" />
                    <Button className="w-full" onClick={methods.handleSubmit(submitPost)}>
                        작성 완료
                    </Button>
                </Form>
            </div>
        </div>
    );
};
