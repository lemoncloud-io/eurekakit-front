import { Carousel, CarouselContent, CarouselItem } from '@lemon/ui-kit/components/ui/carousel';
import { Dialog, DialogContent } from '@lemon/ui-kit/components/ui/dialog';

import type { OverlayProps } from '@lemon/overlay';

interface GoodsReviewImageCarouselProps extends OverlayProps {
    images: { id?: string; url?: string }[];
    startIndex?: number;
}

export const ImageCarouselModal = ({ startIndex = 0, images, ...modalProps }: GoodsReviewImageCarouselProps) => {
    return (
        <Dialog {...modalProps}>
            <DialogContent className="border-none bg-transparent focus-visible:border-none focus-visible:outline-none">
                <Carousel opts={{ startIndex }}>
                    <CarouselContent>
                        {images.map(
                            image =>
                                image.url && (
                                    <CarouselItem key={image.id || image.url}>
                                        <img src={image.url} className="w-full rounded-md object-cover" />
                                    </CarouselItem>
                                )
                        )}
                    </CarouselContent>
                </Carousel>
            </DialogContent>
        </Dialog>
    );
};
