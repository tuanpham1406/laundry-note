export const useLocalStorage = <T = any>(key: string) => {
    const isClient = typeof window !== "undefined";

    const getArray = (): T[] => {
        if (!isClient) return [];
        const raw = localStorage.getItem(key);
        try {
            const parsed = raw ? JSON.parse(raw) : [];
            return Array.isArray(parsed) ? parsed as T[] : [];
        } catch {
            return [];
        }
    };

    const saveArray = (arr: T[]) => {
        if (!isClient) return;
        localStorage.setItem(key, JSON.stringify(arr));
    };

    const addItem = (item: T) => {
        const arr = getArray();
        arr.push(item);
        saveArray(arr);
    };

    const removeItem = (compareFn: (item: T) => boolean) => {
        const arr = getArray();
        const newArr = arr.filter(item => !compareFn(item));
        saveArray(newArr);
    };

    /**
     * Update first matched item.
     * - updater can be a partial object to merge, or a function (old => new).
     * - returns true if something was updated.
     */
    const updateItem = (
        compareFn: (item: T) => boolean,
        updater: Partial<T> | ((oldItem: T) => T),
    ): boolean => {
        const arr = getArray();
        let updated = false;

        const newArr = arr.map(item => {
            if (!updated && compareFn(item)) {
                updated = true;
                if (typeof updater === "function") {
                    // @ts-ignore - TS can't easily infer here but runtime OK
                    return (updater as (old: T) => T)(item);
                } else {
                    // merge shallow (common case)
                    return { ...(item as any), ...(updater as any) } as T;
                }
            }
            return item;
        });

        if (updated) saveArray(newArr);
        return updated;
    };

    /**
     * Option: update all matched items (useful if compareFn may match many)
     * returns number of items updated
     */
    const updateAll = (
        compareFn: (item: T) => boolean,
        updater: Partial<T> | ((oldItem: T) => T),
    ): number => {
        const arr = getArray();
        let count = 0;
        const newArr = arr.map(item => {
            if (compareFn(item)) {
                count++;
                if (typeof updater === "function") {
                    // @ts-ignore
                    return (updater as (old: T) => T)(item);
                } else {
                    return { ...(item as any), ...(updater as any) } as T;
                }
            }
            return item;
        });
        if (count > 0) saveArray(newArr);
        return count;
    };

    return {
        getArray,
        addItem,
        removeItem,
        updateItem,
        updateAll,
    };
};
