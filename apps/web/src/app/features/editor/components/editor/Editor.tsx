import { useFormContext, useWatch } from 'react-hook-form';

import { DevTool } from '@hookform/devtools';

import { Button } from '@lemon/ui-kit/components/ui/button';

import { isDev } from '../../../../utils';
import { ImageUploader } from '../image-uploader';
import { TextField } from '../text-field';

import type { ContentView } from '../../types';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';

interface EditorProps {
    isSubmitting?: boolean;
    onValid: SubmitHandler<ContentView>;
    onInvalid?: SubmitErrorHandler<ContentView>;
}

export const Editor = ({ isSubmitting, onValid, onInvalid }: EditorProps) => {
    const methods = useFormContext<ContentView>();

    const watchedText = useWatch({ control: methods.control, name: 'text' });
    const isTextDirty = watchedText?.length !== 0;

    const isSubmitBtnDisabled = !(isTextDirty && !methods.getFieldState('text').error);

    return (
        <div className="flex h-full w-full flex-col gap-3">
            {isDev() && <DevTool control={methods.control} />}
            <TextField />
            <ImageUploader />
            <Button
                isLoading={isSubmitting}
                disabled={isSubmitBtnDisabled}
                className="mt-auto w-full"
                onClick={methods.handleSubmit(onValid, onInvalid)}
            >
                작성 완료
            </Button>
        </div>
    );
};
