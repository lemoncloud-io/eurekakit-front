import { Heart, MessageSquareMore } from 'lucide-react';

import { cn } from '@lemon/ui-kit';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { List } from '@lemon/ui-kit/components/ui/list';

export const PostListBlock = () => {
    return (
        <div className="flex gap-2">
            <div className="flex w-full flex-col gap-1">
                <p className="line-clamp-2 break-all">
                    sadjasdjksakdjadladahdgaskjfgahglkjfhdlkfjshfdskjfdhsfgldskjfahdkjflhafdkjfhsdfajkhfksfjhdglfkdjsgflskfjshdgflksdfjgsdlfksjfgaskjdahgflkjadg
                    sadjasdjksakdjadladahdgaskjfgahglkjfhdlkfjshfdskjfdhsfgldskjfahdkjflhafdkjfhsdfajkhfksfjhdglfkdjsgflskfjshdgflksdfjgsdlfksjfgaskjdahgflkjadg
                    sadjasdjksakdjadladahdgaskjfgahglkjfhdlkfjshfdskjfdhsfgldskjfahdkjflhafdkjfhsdfajkhfksfjhdglfkdjsgflskfjshdgflksdfjgsdlfksjfgaskjdahgflkjadg
                    sadjasdjksakdjadladahdgaskjfgahglkjfhdlkfjshfdskjfdhsfgldskjfahdkjflhafdkjfhsdfajkhfksfjhdglfkdjsgflskfjshdgflksdfjgsdlfksjfgaskjdahgflkjadg
                </p>
                <div className="text-muted-foreground flex w-full flex-col gap-2 rounded-lg text-sm">
                    <List hotizontal seperator={<span>·</span>} className="gap-1">
                        <span className="line-clamp-1">닉네임 최대 10글자</span>

                        <span>1초</span>
                    </List>
                    <div className="flex gap-2">
                        <Heart size={14} />
                        <MessageSquareMore size={14} />
                    </div>
                </div>
            </div>
            <div className="relative ml-auto aspect-square h-24 w-24 flex-none overflow-hidden rounded-lg">
                <img
                    src={
                        'https://media.istockphoto.com/id/2172310466/ko/%EC%82%AC%EC%A7%84/%EC%B9%B4%ED%8E%98%ED%85%8C%EB%A6%AC%EC%95%84%EC%97%90%EC%84%9C-%EA%B1%B4%EA%B0%95%ED%95%9C-%EC%A0%90%EC%8B%AC%EC%9D%84-%EB%A8%B9%EB%8A%94-%EC%8B%9D%ED%83%81%EC%97%90-%EC%95%89%EC%9D%80-%EC%95%84%EC%9D%B4%EB%93%A4%EC%9D%98-%ED%8F%89%EB%A9%B4%EB%8F%84.jpg?s=1024x1024&w=is&k=20&c=81Dq0bQOs3yNt4GexgNgNZAMHzU8emK9DmL-nSWrYjQ='
                    }
                    className="h-full w-full"
                />
                <Button
                    className="bg-foreground/40 absolute bottom-2 right-2 flex items-center justify-center rounded-full text-lg backdrop-blur-sm"
                    size={'icon'}
                >
                    <Heart className={cn('!h-5 !w-5 flex-none stroke-white', 'fill-red-600')} />
                </Button>
            </div>
        </div>
    );
};
