import { useFormContext, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ChevronLeft, Search, XCircle } from 'lucide-react';

import { useLocalStorage, useQueryState } from '@lemon/shared';
import { cn } from '@lemon/ui-kit';
import { FormControl, FormField } from '@lemon/ui-kit/components/ui/form';
import { Input } from '@lemon/ui-kit/components/ui/input';

import { RECENT_KEYWORD_STORAGE_KEY } from '../../consts';

import type { RecentKeyword, SearchState } from '../../types';

export const SearchInput = () => {
    const navigate = useNavigate();
    const methods = useFormContext<SearchState>();
    const inputText = useWatch({ control: methods.control, name: 'keyword' });

    const [, setKeyword] = useQueryState('keyword');
    const [, setResentKeywordList] = useLocalStorage<RecentKeyword[]>(RECENT_KEYWORD_STORAGE_KEY, []);

    const clearInput = () => {
        methods.reset({ keyword: '' });
    };

    const submitSearch = (data: SearchState) => {
        if (!data.keyword) {
            return;
        }

        setResentKeywordList(prev => [
            { keyword: data.keyword, timestamp: Date.now() },
            ...prev.filter(keyword => keyword.keyword !== data.keyword),
        ]);
        setKeyword(data.keyword, { replace: true });
        methods.reset({ keyword: data.keyword });
    };

    return (
        <FormField
            control={methods.control}
            name="keyword"
            render={({ field: { value, onChange } }) => (
                <div className="flex items-center gap-1 border-b p-4">
                    <button onClick={() => navigate(-1)}>
                        <ChevronLeft />
                    </button>
                    <div
                        className={cn(
                            'flex w-full items-center overflow-hidden rounded-full border border-[#53555B] bg-[#fbfbfb] pl-2 pr-4 focus-within:ring-1',
                            'has-[input:autofill]:bg-blue-50 [&_input:autofill]:shadow-[inset_0_0_0_1000px] [&_input:autofill]:shadow-blue-50'
                        )}
                    >
                        <FormControl>
                            <Input
                                className="border-none text-sm shadow-none focus-visible:border-none focus-visible:ring-0"
                                placeholder="검색"
                                onKeyUp={e => e.key === 'Enter' && methods.handleSubmit(submitSearch)()}
                                value={value}
                                onChange={onChange}
                                autoFocus
                            />
                        </FormControl>
                        <div className="flex items-center gap-2">
                            {!!inputText.length && (
                                <button onClick={clearInput}>
                                    <XCircle className="fill-[#84888F] stroke-white" size={20} />
                                </button>
                            )}
                            <button onClick={methods.handleSubmit(submitSearch)}>
                                <Search className="text-[#84888F]" size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        />
    );
};
