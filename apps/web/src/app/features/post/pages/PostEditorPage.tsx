import { Image, X } from 'lucide-react';

import { Button } from '@lemon/ui-kit/components/ui/button';
import List from '@lemon/ui-kit/components/ui/list';
import { Separator } from '@lemon/ui-kit/components/ui/separator';
import { Textarea } from '@lemon/ui-kit/components/ui/textarea';

export const PostEditorPage = () => {
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
                <span>
                    내용
                    <span className="text-destructive ml-0.5">*</span>
                </span>
                <div className="focus-within:ring-secondary-foreground rounded-lg border focus-within:ring-1">
                    <Textarea
                        className="h-72 resize-none rounded-b-none border-none focus-visible:ring-0"
                        placeholder="내용을 입력해주세요"
                    />
                    <div className="flex justify-between px-3 py-4 text-xs">
                        <span className="text-secondary-foreground">20글자 이상 작성해주세요</span>
                        <span className="text-muted-foreground">0/1,500</span>
                    </div>
                </div>
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
                <Button className="w-full">작성 완료</Button>
            </div>
        </div>
    );
};
