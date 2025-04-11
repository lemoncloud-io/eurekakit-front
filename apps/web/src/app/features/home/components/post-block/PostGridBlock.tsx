import { Heart, MessageSquareMore, User2Icon } from 'lucide-react';

export const PostGridBlock = () => {
    return (
        <div className="flex w-full flex-col gap-2">
            <div className="relative z-0 flex aspect-square w-full items-end">
                <img
                    src={
                        'https://media.istockphoto.com/id/2172310466/ko/%EC%82%AC%EC%A7%84/%EC%B9%B4%ED%8E%98%ED%85%8C%EB%A6%AC%EC%95%84%EC%97%90%EC%84%9C-%EA%B1%B4%EA%B0%95%ED%95%9C-%EC%A0%90%EC%8B%AC%EC%9D%84-%EB%A8%B9%EB%8A%94-%EC%8B%9D%ED%83%81%EC%97%90-%EC%95%89%EC%9D%80-%EC%95%84%EC%9D%B4%EB%93%A4%EC%9D%98-%ED%8F%89%EB%A9%B4%EB%8F%84.jpg?s=1024x1024&w=is&k=20&c=81Dq0bQOs3yNt4GexgNgNZAMHzU8emK9DmL-nSWrYjQ='
                    }
                    className="absolute -z-10 h-full w-full rounded-lg object-cover"
                />
                <div className="bg-foreground/40 text-background flex w-full items-center gap-2 rounded-lg p-2 backdrop-blur-sm">
                    <div className="text-background bg-foreground flex aspect-square h-8 w-8 items-center justify-center rounded-full">
                        <User2Icon size={16} />
                    </div>
                    <div className="flex flex-col text-xs">
                        <span className="line-clamp-1">닉네임 최대 10글자</span>
                        <span>1초</span>
                    </div>
                    <div className="ml-auto flex gap-2">
                        <Heart size={16} />
                        <MessageSquareMore size={16} />
                    </div>
                </div>
            </div>
            <p className="line-clamp-2 w-full break-all">
                sadjasdjksakdjadladahdgaskjfgahglkjfhdlkfjshfdskjfdhsfgldskjfahdkjflhafdkjfhsdfajkhfksfjhdglfkdjsgflskfjshdgflksdfjgsdlfksjfgaskjdahgflkjadg
            </p>
        </div>
    );
};
