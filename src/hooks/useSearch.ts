import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, QueryDefinition } from '@reduxjs/toolkit/dist/query'
import { LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { IFetchParams } from '../models/types'

export default function useSearch<FetchResponse>(
    initialParams: IFetchParams,
    trigger: LazyQueryTrigger<QueryDefinition<IFetchParams, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, FetchResponse>>,
    ) {
    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => { 
        trigger({
            ...initialParams,
            searchQuery: e.target.value,
        })
    }

    return searchHandler
}