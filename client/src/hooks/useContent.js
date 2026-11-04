import { useEffect, useState } from 'react';
import { fetchPublicContent } from '../utils/api';

export default function useContent(key) {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchPublicContent(key)
      .then((data) => {
        if (!cancelled) {
          setContent(data.json || {});
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setContent({});
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [key]);

  return { content, loading };
}
