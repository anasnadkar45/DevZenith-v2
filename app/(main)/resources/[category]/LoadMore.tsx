"use client"

import { ResourceCard, iResourceProps } from "@/app/components/ResourceCard";
import { Suspense, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { getResourceData } from "./action";

function LoadMore({ category, initialData }: { category: string, initialData: iResourceProps[] }) {
    const { ref, inView } = useInView();
    const [data, setData] = useState<iResourceProps[]>(initialData);
    const [page, setPage] = useState(1); // Keep track of the current page
    const [hasMore, setHasMore] = useState(initialData.length > 0);
    const pageSize = 3;

    useEffect(() => {
        if (inView && hasMore) {
            // Fetch next page
            getResourceData(category, page * pageSize, pageSize).then((res) => {
                if (res.length > 0) {
                    setData((prevData) => [...prevData, ...res]); // Append new data
                    setPage((prevPage) => prevPage + 1); // Increment the page number
                } else {
                    setHasMore(false); // No more data to load
                }
            });
        }
    }, [inView, category, hasMore, page]); // Trigger effect when inView, search, or page changes

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-2 mt-4">

                {data.map((item: iResourceProps, index: number) => (
                    <ResourceCard key={item.id} resource={item} index={index} />
                ))}

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
