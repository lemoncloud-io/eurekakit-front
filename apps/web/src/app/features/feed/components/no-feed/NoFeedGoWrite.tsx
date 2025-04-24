import { ChevronRight } from 'lucide-react';

import { Button } from '@lemon/ui-kit/components/ui/button';

import { useNavigate } from '../../../../hooks';

export const NoPostGoWrite = () => {
    const navigate = useNavigate();

    return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center">
                <span>아직 등록된 게시물이 없습니다.</span>
                <span>{`다양한 이야기로 다른 사용자들과 소통해 보세요 :)`}</span>
            </div>
            <Button
                className="gap-1 pl-6 pr-4"
                variant={'secondary'}
                size={'lg'}
                onClick={() => navigate('/post/create')}
            >
                글 작성하러 가기 <ChevronRight />
            </Button>
        </div>
    );
};
