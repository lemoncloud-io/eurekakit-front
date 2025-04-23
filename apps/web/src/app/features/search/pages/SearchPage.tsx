import { useForm, useWatch } from 'react-hook-form';

import { DevTool } from '@hookform/devtools';

import { useQueryState } from '@lemon/shared';
import { Form } from '@lemon/ui-kit/components/ui/form';

import { RecentKeywordList, SearchInput, SearchResultList } from '../components';

import type { SearchState } from '../types';

export const SearchPage = () => {
    const [urlKeyword] = useQueryState('keyword');

    const methods = useForm<SearchState>({ defaultValues: { keyword: '' }, values: { keyword: urlKeyword } });
    const inputKeywork = useWatch({ control: methods.control, name: 'keyword' });

    const isShowingRecentKeyword = inputKeywork.length === 0 || methods.formState.isDirty;

    return (
        <Form {...methods}>
            <DevTool control={methods.control} />
            <SearchInput />
            {isShowingRecentKeyword ? <RecentKeywordList /> : <SearchResultList />}
        </Form>
    );
};
