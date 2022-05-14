import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, QueryDefinition } from '@reduxjs/toolkit/dist/query'
import { LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { useEffect, useState } from 'react'
import { IFetchParams } from '../models/types'

export default function useLazyLoading<Obj, FetchResponse>(
    initialParams: IFetchParams,
    response: Obj[] | undefined, 
    trigger: LazyQueryTrigger<QueryDefinition<IFetchParams, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, FetchResponse>>,
    wrapper: HTMLDivElement | null,
    isFetching: boolean,
    lastArg: IFetchParams,
    amount: number,
    limit: number
    ) {
    const [objects, setObjects] = useState<Obj[]>([])

    useEffect(() => {
        trigger(initialParams)
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [trigger])
    
    useEffect(() => {
        const newObjects = (response ?? [])
        if(lastArg.offset !== 0) setObjects(prev => [...prev, ...newObjects])
        else setObjects(newObjects)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [response])

      useEffect(() => {
        
        const scrollHandler = () => {
          const scrollEnd = (wrapper?.scrollHeight ?? 0) - (wrapper?.clientHeight ?? 0)
          const currentScroll = (wrapper?.scrollTop ?? 0)
    
          if(
            scrollEnd === currentScroll
            && !isFetching 
            && response 
            && amount > (lastArg.offset ?? 0)
          ){
            trigger({...lastArg, offset: (lastArg.offset ?? 0)+limit})
          }
        }
        setTimeout(scrollHandler, 0)
    
        wrapper?.addEventListener('scroll', scrollHandler)
        return () => {
          wrapper?.removeEventListener('scroll', scrollHandler)
        }
      }, [isFetching, response, lastArg, trigger, wrapper, amount, lastArg.offset, limit])

    return objects
}