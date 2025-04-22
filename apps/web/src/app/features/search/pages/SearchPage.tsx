import { useForm } from 'react-hook-form';

import { DevTool } from '@hookform/devtools';

import { Form } from '@lemon/ui-kit/components/ui/form';

import { RecentKeywordList, SearchInput, SearchResultList } from '../components';

import type { SearchState } from '../types';

export const SearchPage = () => {
    const methods = useForm<SearchState>({ defaultValues: { keyword: '' } });

    return (
        <Form {...methods}>
            <DevTool control={methods.control} />
            <SearchInput />
            <RecentKeywordList />
            <SearchResultList />
        </Form>
    );
};
