"use client"
import { Suspense, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { getJobData } from "./action";
import { JobCard, iJobProps } from "@/app/components/dev-jobs/JobCard";

function LoadMore({ search }: { search: string }) {
  const { ref, inView } = useInView();
  const [data, setData] = useState<iJobProps[]>([]);
  const [page, setPage] = useState(1); // Keep track of the current page

  useEffect(() => {
    if (inView) {
      // Fetch next page
      getJobData(search, page * 3, 3).then((res) => {
        setData((prevData) => [...prevData, ...res]); // Append new data
        setPage((prevPage) => prevPage + 1); // Increment the page number
      });
    }
  }, [inView, search]); // Trigger effect when inView, search, or page changes

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <Suspense fallback={<p>Loading feed...</p>}>
                    {data.map((item: iJobProps, index: number) => (
                        <JobCard key={item.id} job={item} index={index} />
                    ))}
                </Suspense>
            </div>
      <section className="flex justify-center items-center w-full h-20">
        <div ref={ref}>
          <FaSpinner className="animate-spin text-3xl text-primary" />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
