import { X } from 'lucide-react';

import { Button } from '@lemon/ui-kit/components/ui/button';

import { useNavigate } from '../../../../hooks';

export const PostEditorHeader = () => {
    const navigate = useNavigate();

    return (
        <header className="flex h-12 w-full items-center justify-between border-b px-2">
            <div className="w-9" />
            <span className="font-medium">새로운 글쓰기</span>
            <Button size={'icon'} variant={'ghost'} onClick={() => navigate(-1)}>
                <X />
            </Button>
        </header>
    );
};
