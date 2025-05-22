import { useState } from 'react';

import { Carousel, CarouselContent, CarouselItem } from '@lemon/ui-kit/components/ui/carousel';

import { Image } from '../image/Image';
import { ImageCarouselModal } from '../image-carousel-modal';

import type { ImageView } from '@lemoncloud/pets-socials-api';

interface ImageListViewerProps {
    images?: ImageView[];
}

export const ImageCarouselViewer = ({ images }: ImageListViewerProps) => {
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
        !!images?.length && (
            <>
                <Carousel opts={{ dragFree: true }} className="h-28 w-full">
                    <CarouselContent
                        className="-ml-2 h-full overflow-visible"
                        containerClassName="overflow-visible h-full"
                    >
                        {images?.map(
                            (image, idx) =>
                                image?.url && (
                                    <CarouselItem
                                        key={image?.id}
                                        className="aspect-square basis-[fit-content] pl-2"
                                        onClick={onClickImage}
                                        data-image-idx={idx}
                                    >
                                        <div className="aspect-square max-h-28 overflow-hidden rounded-lg">
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
