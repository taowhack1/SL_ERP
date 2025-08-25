import { useCallback, useEffect, useRef, useState } from "react";
import axios from 'axios'
import { useSelector } from "react-redux";

export default function useSearch({
    endpoint,
    initialParams = {},
    debounceMs = 700,
    mapResult = (r) => r,
    storageKey,
}) {
    const auth = useSelector((state) => state.auth.authData);
    const [params, setParams] = useState(() => {
        try {
            if (storageKey) {
                const saved = localStorage.getItem(storageKey);
                if (saved) return JSON.parse(saved);
            }
        } catch (_) { }
        return { ...initialParams };
    });
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const debounceRef = useRef(null);
    const abortRef = useRef(null);
    const lastCallId = useRef(0);

    const persistParams = (p) => {
        if (storageKey) {
            try {
                localStorage.setItem(storageKey, JSON.stringify(p));
            } catch (_) { }
        }
    };

    const doFetch = useCallback(
        async (p) => {
            if (abortRef.current) abortRef.current.abort();
            const controller = new AbortController();
            abortRef.current = controller;
            const callId = ++lastCallId.current;
            setLoading(true);
            setError(null);

            try {
                const res = await axios.get(endpoint, {
                    params: p,
                    signal: controller.signal,
                });

                if (callId === lastCallId.current) {
                    setData(mapResult(res.data));
                }
            } catch (err) {
                if (callId === lastCallId.current && err.name !== "CanceledError" && err.name !== "AbortError") {
                    setError(err);
                }
            } finally {
                if (callId === lastCallId.current) setLoading(false);
            }
        },
        [endpoint, mapResult]
    );

    const setFilter = useCallback(
        (next) => {
            setParams((prev) => {
                const merged = { ...prev, ...next, filter: { ...(prev.filter || {}), ...(next.filter || {}) } };
                persistParams(merged);
                return merged;
            });
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
                debounceRef.current = null;
                setParams((latest) => {
                    doFetch(latest);
                    return latest;
                });
            }, debounceMs);
        },
        [debounceMs, doFetch]
    );

    const searchNow = useCallback(
        (next) => {
            setParams((prev) => {
                const merged = { ...prev, ...next, filter: { ...(prev.filter || {}), ...(next && next.filter ? next.filter : {}) } };
                persistParams(merged);
                Promise.resolve().then(() => doFetch(merged));
                return merged;
            });
        },
        [doFetch]
    );

    const clear = useCallback(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        setParams({ ...initialParams });
        persistParams({ ...initialParams });
        doFetch({ ...initialParams });
    }, [doFetch, initialParams]);

    useEffect(() => () => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (abortRef.current) abortRef.current.abort();
    }, []);

    return { data, loading, error, params, setFilter, searchNow, clear };
}