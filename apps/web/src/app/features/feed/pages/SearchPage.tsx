import { FormProvider, useForm, useWatch } from 'react-hook-form';

import { DevTool } from '@hookform/devtools';

import { useQueryState } from '@lemon/shared';

import { RecentKeywordList } from '../components/recent-keyword-list';
import { SearchInput } from '../components/search-input';
import { SearchResultList } from '../components/search-result-list';

import type { SearchState } from '../types';

export const SearchPage = () => {
    const [urlKeyword] = useQueryState('keyword');

    const methods = useForm<SearchState>({ defaultValues: { keyword: '' }, values: { keyword: urlKeyword } });
    const inputKeywork = useWatch({ control: methods.control, name: 'keyword' });

    const isShowingRecentKeyword = inputKeywork.length === 0 || methods.formState.isDirty;

    return (
        <div className="flex h-full flex-col">
            <FormProvider {...methods}>
                <DevTool control={methods.control} />
                <SearchInput />
                {isShowingRecentKeyword ? <RecentKeywordList /> : <SearchResultList />}
            </FormProvider>
        </div>
    );
};
