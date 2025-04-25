import { useFormContext } from 'react-hook-form';

import { cn } from '@lemon/ui-kit';
import { FormControl, FormField, FormItem, FormLabel } from '@lemon/ui-kit/components/ui/form';
import { Input } from '@lemon/ui-kit/components/ui/input';

import type { UserBody } from '@lemoncloud/codes-backend-api';

export const ProfileNickNameField = () => {
    const methods = useFormContext<UserBody>();

    return (
        <FormField
            control={methods.control}
            name="nick"
            rules={{ required: true, minLength: 3, maxLength: 10 }}
            render={({ field, fieldState }) => (
                <FormItem>
                    <FormLabel>닉네임</FormLabel>
                    <FormControl>
                        <Input
                            className={cn(
                                'focus-visible:border-primary rounded-none border-l-0 border-r-0 border-t-0 pl-0 text-sm shadow-none ring-0 focus-visible:ring-0',
                                fieldState.error && '!border-b-destructive text-destructive'
                            )}
                            placeholder="닉네임을 입력해주세요"
                            {...field}
                        />
                    </FormControl>
                    <span className={cn('text-muted-foreground text-xs', fieldState.error && 'text-destructive')}>
                        3~10글자 이내로 입력해 주세요.
                    </span>
                </FormItem>
            )}
        />
    );
};
