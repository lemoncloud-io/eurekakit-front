import { useFormContext } from 'react-hook-form';

import { cn } from '@lemon/ui-kit';
import { FormControl, FormField, FormItem, FormLabel } from '@lemon/ui-kit/components/ui/form';
import { Textarea } from '@lemon/ui-kit/components/ui/textarea';

import type { ContentView } from '../../types';

export const TextField = () => {
    const methods = useFormContext<ContentView>();

    return (
        <FormField
            control={methods.control}
            name="text"
            rules={{ minLength: 20, maxLength: 1500, required: true }}
            render={({ field, fieldState }) => (
                <FormItem>
                    <FormLabel>
                        내용
                        <span className="text-destructive ml-0.5">*</span>
                    </FormLabel>
                    <div
                        className={cn(
                            'focus-within:ring-secondary-foreground rounded-lg border focus-within:ring-1',
                            fieldState.error && '!ring-destructive ring-1'
                        )}
                    >
                        <FormControl>
                            <Textarea
                                className={'h-72 resize-none rounded-b-none border-none text-sm focus-visible:ring-0'}
                                placeholder="내용을 입력해주세요"
                                {...field}
                            />
                        </FormControl>
                        <div className="flex justify-between px-3 py-4 text-xs">
                            <span className={cn('text-secondary-foreground', fieldState.error && 'text-destructive')}>
                                20글자 이상 작성해주세요
                            </span>
                            <span className="text-muted-foreground">{field.value?.length}/1,500</span>
                        </div>
                    </div>
                </FormItem>
            )}
        />
    );
};
