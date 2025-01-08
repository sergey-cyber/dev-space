"use client";

import { useEffect, useState } from "react";

/**
 * Fetch data with useEffect.
 * Wrapper for preventing memory leaks.
 */

export function useFetch<T>(
  resource: () => Promise<T>,
  options: {
    onSuccess?: (res: T) => void;
    onFailure?: (err: any) => void;
    onFinally?: () => void;
    deps: any[];
  },
) {
  const { onSuccess, onFailure, onFinally, deps } = options;
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    let unmounted = false;

    resource()
      .then((res) => {
        if (!unmounted) {
          onSuccess?.(res);
        }
      })
      .catch((error) => {
        if (!unmounted) {
          onFailure?.(error);
        }
      })
      .finally(() => onFinally?.());

    return () => {
      unmounted = true;
    };

    return () => setTrigger(trigger + 1); // reload function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, ...deps]);
}
