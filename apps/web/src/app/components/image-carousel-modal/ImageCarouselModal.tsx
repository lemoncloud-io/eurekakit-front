import { Carousel, CarouselContent, CarouselItem } from '@lemon/ui-kit/components/ui/carousel';
import { Dialog, DialogContent } from '@lemon/ui-kit/components/ui/dialog';

import type { OverlayProps } from '@lemon/overlay';

interface GoodsReviewImageCarouselProps extends OverlayProps {
    images: string[];
    startIndex: number;
}

export const ImageCarouselModal = ({ startIndex, images, ...modalProps }: GoodsReviewImageCarouselProps) => {
    return (
        <Dialog {...modalProps}>
            <DialogContent className="border-none bg-transparent focus-visible:border-none focus-visible:outline-none">
                <Carousel opts={{ startIndex }}>
                    <CarouselContent>
                        {images.map(image => (
                            <CarouselItem>
                                <img src={image} className="w-full rounded-md object-cover" />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </DialogContent>
        </Dialog>
    );
};
