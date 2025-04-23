import { useForm, useFormState, useWatch } from 'react-hook-form';

import { DevTool } from '@hookform/devtools';

import { Form } from '@lemon/ui-kit/components/ui/form';

import { RecentKeywordList, SearchInput, SearchResultList } from '../components';

import type { SearchState } from '../types';

export const SearchPage = () => {
    const methods = useForm<SearchState>({ defaultValues: { keyword: '' } });
    const inputKeywork = useWatch({ control: methods.control, name: 'keyword' });
    const inputFormState = useFormState({ control: methods.control, name: 'keyword' });

    const isShowingRecentKeyword =
        inputKeywork.length === 0 || inputFormState.isDirty || inputFormState.dirtyFields.keyword;

    return (
        <Form {...methods}>
            <DevTool control={methods.control} />
            <SearchInput />
            {isShowingRecentKeyword ? <RecentKeywordList /> : <SearchResultList />}
        </Form>
    );
};
