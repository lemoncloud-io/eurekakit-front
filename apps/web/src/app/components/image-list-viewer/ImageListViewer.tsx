import { useState } from 'react';

import { Carousel, CarouselContent, CarouselItem } from '@lemon/ui-kit/components/ui/carousel';

import { Image } from '../image/Image';
import { ImageCarouselModal } from '../image-carousel-modal';

import type { ImageView } from '@lemoncloud/pets-socials-api';

interface ImageListViewerProps {
    images?: ImageView[];
}

export const ImageListViewer = ({ images }: ImageListViewerProps) => {
    const [clickedImageIdx, setClickedImageIdx] = useState<number | undefined>(undefined);

    const onClickImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        const imageIdx = (e.currentTarget as HTMLElement).dataset.imageIdx;

        if (!imageIdx) {
            return;
        }

        setClickedImageIdx(Number(imageIdx));
    };

    return (
        images && (
            <>
                <Carousel opts={{ dragFree: true }}>
                    <CarouselContent className="-ml-2 overflow-visible" containerClassName="overflow-visible">
                        {images?.map(
                            (image, idx) =>
                                image?.url && (
                                    <CarouselItem
                                        key={image?.id}
                                        className="basis-1/3 pl-2"
                                        onClick={onClickImage}
                                        data-image-idx={idx}
                                    >
                                        <div className="aspect-square overflow-hidden rounded-lg">
                                            <Image src={image?.url} />
                                        </div>
                                    </CarouselItem>
                                )
                        )}
                    </CarouselContent>
                </Carousel>
                <ImageCarouselModal
                    open={clickedImageIdx !== undefined}
                    onOpenChange={() => setClickedImageIdx(undefined)}
                    close={() => setClickedImageIdx(undefined)}
                    startIndex={clickedImageIdx}
                    images={images}
                    aria-describedby="image viewer modal"
                />
            </>
        )
    );
};
