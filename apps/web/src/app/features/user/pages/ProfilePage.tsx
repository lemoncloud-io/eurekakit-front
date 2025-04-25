import { Camera, ChevronLeft } from 'lucide-react';

import { Button } from '@lemon/ui-kit/components/ui/button';
import { Input } from '@lemon/ui-kit/components/ui/input';
import { Label } from '@lemon/ui-kit/components/ui/label';

import { Image } from '../../../components';
import { useNavigate } from '../../../hooks';

export const ProfilePage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex h-full flex-1 flex-col">
            <header className="flex h-12 flex-none items-center justify-between px-4">
                <button onClick={() => navigate(-1)}>
                    <ChevronLeft size={20} />
                </button>
                <span>프로필 수정</span>
                <div className="h-5 w-5" />
            </header>
            <div className="text-secondary-foreground flex flex-col items-center gap-2 pb-2 pt-4 text-sm">
                <button className="bg-muted text-muted-foreground h-16 w-16 overflow-hidden rounded-full">
                    <Image
                        fallback={
                            <div className="bg-muted flex h-full w-full items-center justify-center">
                                <Camera />
                            </div>
                        }
                    />
                </button>
                <span>프로필 사진 변경</span>
            </div>
            <div className="flex flex-col gap-10 p-4">
                <div>
                    <Label>닉네임</Label>
                    <Input
                        className="focus-visible:border-primary rounded-none border-l-0 border-r-0 border-t-0 pl-0 text-sm shadow-none ring-0 focus-visible:ring-0"
                        placeholder="닉네임을 입력해주세요"
                    />
                    <span className="text-muted-foreground text-xs">3~10글자 이내로 입력해 주세요.</span>
                </div>
                <div className="flex gap-2">
                    <Button size={'lg'} className="flex-1" variant={'outline'}>
                        취소
                    </Button>
                    <Button size={'lg'} className="flex-1">
                        작성 완료
                    </Button>
                </div>
            </div>
        </div>
    );
};
