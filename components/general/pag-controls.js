"use client";

import { useRouter, useSearchParams } from "next/navigation";

const PaginationControls = ({ hasNextPage, hasPrevPage }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "10";

  return (
    <div className="flex gap-2">
      <button
        className="bg-blue-500 text-white disabled:opacity-50 rounded-md p-1 font-bold"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/admin/?page=${Number(page) - 1}&per_page=${per_page}`);
        }}
      >
        prev page
      </button>

      <div>
        {page} / {Math.ceil(10 / Number(per_page))}
      </div>

      <button
        className="bg-blue-500 text-white disabled:opacity-50 rounded-md p-1 font-bold"
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/admin/?page=${Number(page) + 1}&per_page=${per_page}`);
        }}
      >
        next page
      </button>
    </div>
  );
};

export default PaginationControls;
