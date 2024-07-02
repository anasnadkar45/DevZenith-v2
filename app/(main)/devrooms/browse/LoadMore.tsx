"use client"
import { Suspense, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { getRoomData } from "./action";
import { DevRoomCard, iRoomProps } from "@/app/components/dev-rooms/DevRoomCard";

function LoadMore({ search }: { search: string }) {
  const { ref, inView } = useInView();
  const [data, setData] = useState<iRoomProps[]>([]);
  const [page, setPage] = useState(1); // Keep track of the current page
  const [hasMore, setHasMore] = useState(true); // Track if more data is available

  useEffect(() => {
    if (inView && hasMore) {
      // Fetch next page
      getRoomData(search, page * 3, 3).then((res) => {
        setData((prevData) => [...prevData, ...res]); // Append new data
        setPage((prevPage) => prevPage + 1); // Increment the page number
        if (res.length < 3) {
          setHasMore(false); // No more data to load if fewer than expected items are fetched
        }
      });
    }
  }, [inView, search, hasMore, page]); // Trigger effect when inView, search, hasMore, or page changes

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <Suspense fallback={<p>Loading feed...</p>}>
          {data.map((item: iRoomProps, index: number) => (
            <DevRoomCard key={item.id} room={item} index={index} />
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
