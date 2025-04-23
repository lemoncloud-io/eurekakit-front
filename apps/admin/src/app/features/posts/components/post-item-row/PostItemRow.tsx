import { PopoverClose } from '@radix-ui/react-popover';
import { EllipsisVertical, Trash2 } from 'lucide-react';

import { formatDate } from '@lemon/shared';
import { Badge } from '@lemon/ui-kit/components/ui/badge';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@lemon/ui-kit/components/ui/popover';
import { TableCell, TableRow } from '@lemon/ui-kit/components/ui/table';

import type { PostView } from '@lemoncloud/lemon-boards-api';

interface PostItemRowProps {
    post: PostView;
    onClickRow: (postId: string | undefined) => void;
    onDeleteRow: (postId: string | undefined) => void;
}

export const PostItemRow = ({ post, onClickRow, onDeleteRow }: PostItemRowProps) => {
    if (!post) {
        return null;
    }

    return (
        <TableRow className="cursor-pointer" onClick={() => onClickRow(post.id)}>
            <TableCell className="truncate px-8 py-4">{post.id}</TableCell>
            <TableCell className="max-w-[300px] truncate font-bold">{post.subject || '-'}</TableCell>
            <TableCell className="truncate">{post.author?.name}</TableCell>
            <TableCell className="truncate">{post?.['category'] || '-'}</TableCell>
            <TableCell className="truncate">
                <Badge variant={post.isHidden ? 'outline' : 'secondary'}>{post.isHidden ? '숨김' : '노출'}</Badge>
            </TableCell>
            <TableCell className="truncate">{formatDate(post.postedAt, 'yyyy.MM.dd')}</TableCell>
            <TableCell>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            onClick={e => {
                                e.stopPropagation();
                            }}
                        >
                            <EllipsisVertical size={15} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-25 p-2" onClick={e => e.stopPropagation()}>
                        <PopoverClose>
                            <Button
                                onClick={() => onDeleteRow(post.id)}
                                variant="destructive"
                                className="flex items-center justify-between"
                            >
                                <Trash2 size={15} />
                                삭제
                            </Button>
                        </PopoverClose>
                    </PopoverContent>
                </Popover>
            </TableCell>
        </TableRow>
    );
};
