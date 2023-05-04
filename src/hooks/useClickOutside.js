import { useEffect, useCallback } from 'react';

export const useClickOutside = (ref, callback) => {
    const handleClickOutside = useCallback(
        (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        },
        [ref, callback]
    );

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);
};
