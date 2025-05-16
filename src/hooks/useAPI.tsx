import { useCallback, useEffect, useState } from "react";
import httpClient from "../helpers/httpClient";

type ApiResponse = {
    data: any;
    loading: boolean;
    error: any;
}

interface ApiProps<T> {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    payload?: any;
    autoTrigger?: boolean;
    disableCheck?: boolean;
    dataAccessor?: string;
    deps?: any[];
    onLoad?: () => void;
    onSuccess?: (data: T) => void;
    onError?: (error: any) => void;

}

export const useApiInstance = <T = any>(props: ApiProps<T>) => {
    const {
        url,
        method = 'GET',
        payload,
        autoTrigger = false,
        dataAccessor = '',
        deps = [],
        onSuccess,
        onError
    } = props;

    const [response, setResponse] = useState<ApiResponse>({
        data: null,
        error: null,
        loading: false,
    })

    const fetch = useCallback(async () => {
        setResponse({ ...response, loading: true })

        try {
            const { data } = await httpClient({
                url, method, data: payload
            })
            const finalData = dataAccessor ? data?.[dataAccessor] : data
            setResponse({ loading: false, error: null, data: finalData })

            if (onSuccess) onSuccess(finalData);

        } catch (error) {

            setResponse({ loading: false, error: error, data: null })
            if (onError) onError(error);
        }
    }, [url, method, JSON.stringify(payload), onSuccess, onError])

    useEffect(() => {
        autoTrigger && fetch();
    }, [...deps])

    const { data, error, loading } = response;
    return [data, error, loading, fetch];
}