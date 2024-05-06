"use client"
import { useState, useEffect } from 'react';

const useFetchSiteData = (tabUrl:string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSiteData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/metadata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: tabUrl }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const data = await response.json();
        setData(data);
      } catch (error:any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (tabUrl) {
      fetchSiteData();
    }
  }, [tabUrl]);

  return { data, loading, error };
};

export default useFetchSiteData;