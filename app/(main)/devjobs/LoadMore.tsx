"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { FaSpinner } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { getJobData } from "./action";
import { JobCard, iJobProps } from "@/app/components/dev-jobs/JobCard";

function LoadMore({ search }: { search: string }) {
  const { ref, inView } = useInView();
  const [data, setData] = useState<iJobProps[]>([]);
  const [page, setPage] = useState(1); // Keep track of the current page
  const [hasMore, setHasMore] = useState(true); // Track if more data is available
  const [loading, setLoading] = useState(false); // Track loading state

  const loadMoreData = useCallback(() => {
    setLoading(true);
    getJobData(search, page * 3, 3).then((res) => {
      setData((prevData) => [...prevData, ...res]); // Append new data
      setPage((prevPage) => prevPage + 1); // Increment the page number
      setLoading(false);
      if (res.length < 3) {
        setHasMore(false); // No more data to load if fewer than expected items are fetched
      }
    });
  }, [page, search]); // Include page and search in dependency array

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMoreData();
    }
  }, [inView, hasMore, loadMoreData, loading]); // Include dependencies and callback

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <Suspense fallback={<p>Loading feed...</p>}>
          {data.map((item: iJobProps, index: number) => (
            <JobCard key={item.id} job={item} index={index} />
          ))}
        </Suspense>
      </div>
      <section className="flex justify-center items-center w-full h-20">
        {hasMore ? (
          <div ref={ref}>
            <FaSpinner className="animate-spin text-3xl text-primary" />
          </div>
        ) : (
          <p>Nothing to load</p>
        )}
      </section>
    </>
  );
}

export default LoadMore;
