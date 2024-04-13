"use client";

import { useRouter, useSearchParams } from "next/navigation";

const PaginationControls = ({
  hasNextPage,
  hasPrevPage,
  totalRecords,
  pageSize,
  route,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? pageSize;
  const total_pages = Math.ceil(totalRecords / per_page);
  const pages = Array.from({ length: total_pages }, (_, index) => index + 1);

  return (
    <nav className="bg-[#3A378C]">
      <ul class="flex items-center -space-x-px h-8 text-sm">
        <li key="prev">
          <button
            disabled={!hasPrevPage}
            onClick={() => {
              router.push(
                `/${route}/?page=${Number(page) - 1}&per_page=${per_page}`
              );
            }}
            class="flex items-center justify-center px-3 h-8 leading-tight text-white border border-gray-300 hover:bg-[#7A72DE]"
          >
            <span class="sr-only">Previous</span>
            <svg
              class="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>
        {pages.length <= 20 ? (
          pages.map((p) => (
            <li key={p}>
              <button
                onClick={() => {
                  router.push(`/${route}/?page=${p}&per_page=${per_page}`);
                }}
                className={`${
                  page == p.toString() ? "bg-[#7A72DE]" : ""
                } flex items-center justify-center px-3 h-8 leading-tight text-white border border-gray-300 hover:bg-[#7A72DE]`}
              >
                {p}
              </button>
            </li>
          ))
        ) : (
          <div class="flex items-center -space-x-px h-8 text-sm">
            {parseInt(page) <= 5 && (
              <div class="flex items-center -space-x-px h-8 text-sm">
                {pages.slice(0, 7).map((p) => (
                  <li key={p}>
                    <button
                      onClick={() => {
                        router.push(
                          `/${route}/?page=${p}&per_page=${per_page}`
                        );
                      }}
                      className={`${
                        page == p.toString() ? "bg-[#7A72DE]" : ""
                      } flex items-center justify-center px-3 h-8 leading-tight text-white border border-gray-300 hover:bg-[#7A72DE]`}
                    >
                      {p}
                    </button>
                  </li>
                ))}
                <li key="dots1">
                  <button className=" flex items-center justify-center px-3 h-8 leading-tight text-white border border-gray-300">
                    ...
                  </button>
                </li>
                {pages.slice(total_pages - 3, total_pages).map((p) => (
                  <li key={p}>
                    <button
                      onClick={() => {
                        router.push(
                          `/${route}/?page=${p}&per_page=${per_page}`
                        );
                      }}
                      className={`${
                        page == p.toString() ? "bg-[#7A72DE]" : ""
                      } flex items-center justify-center px-3 h-8 leading-tight text-white border border-gray-300 hover:bg-[#7A72DE]`}
                    >
                      {p}
                    </button>
                  </li>
                ))}
              </div>
            )}
            {parseInt(page) > 5 && parseInt(page) < total_pages - 5 && (
              <div class="flex items-center -space-x-px h-8 text-sm">
                {pages.slice(0, 3).map((p) => (
                  <li key={p}>
                    <button
                      onClick={() => {
                        router.push(
                          `/${route}/?page=${p}&per_page=${per_page}`
                        );
                      }}
                      className={`${
                        page == p.toString() ? "bg-[#7A72DE]" : ""
                      } flex items-center justify-center px-3 h-8 leading-tight text-white border border-gray-300 hover:bg-[#7A72DE]`}
                    >
                      {p}
                    </button>
                  </li>
                ))}
                <li key="dots2">
                  <button className=" flex items-center justify-center px-3 h-8 leading-tight text-white border border-gray-300">
                    ...
                  </button>
                </li>
                {pages
                  .slice(parseInt(page) - 2, parseInt(page) + 2)
                  .map((p) => (
                    <li key={p}>
                      <button
                        onClick={() => {
                          router.push(
                            `/${route}/?page=${p}&per_page=${per_page}`
                          );
                        }}
                        className={`${
                          page == p.toString() ? "bg-[#7A72DE]" : ""
                        } flex items-center justify-center px-3 h-8 leading-tight text-white border border-gray-300 hover:bg-[#7A72DE]`}
                      >
                        {p}
                      </button>
                    </li>
                  ))}
                <li key="dots3">
                  <button className=" flex items-center justify-center px-3 h-8 leading-tight text-white border border-gray-300">
                    ...
                  </button>
                </li>
                {pages.slice(total_pages - 3, total_pages).map((p) => (
                  <li key={p}>
                    <button
                      onClick={() => {
                        router.push(
                          `/${route}/?page=${p}&per_page=${per_page}`
                        );
                      }}
                      className={`${
                        page == p.toString() ? "bg-[#7A72DE]" : ""
                      } flex items-center justify-center px-3 h-8 leading-tight text-white border border-gray-300 hover:bg-[#7A72DE]`}
                    >
                      {p}
                    </button>
                  </li>
                ))}
              </div>
            )}
            {parseInt(page) >= total_pages - 5 && (
              <div class="flex items-center -space-x-px h-8 text-sm">
                {pages.slice(0, 3).map((p) => (
                  <li key={p}>
                    <button
                      onClick={() => {
                        router.push(
                          `/${route}/?page=${p}&per_page=${per_page}`
                        );
                      }}
                      className={`${
                        page == p.toString() ? "bg-[#7A72DE]" : ""
                      } flex items-center justify-center px-3 h-8 leading-tight text-white border border-gray-300 hover:bg-[#7A72DE]`}
                    >
                      {p}
                    </button>
                  </li>
                ))}
                <li key="dots4">
                  <button className=" flex items-center justify-center px-3 h-8 leading-tight text-white border border-gray-300">
                    ...
                  </button>
                </li>
                {pages.slice(total_pages - 7, total_pages).map((p) => (
                  <li key={p}>
                    <button
                      onClick={() => {
                        router.push(
                          `/${route}/?page=${p}&per_page=${per_page}`
                        );
                      }}
                      className={`${
                        page == p.toString() ? "bg-[#7A72DE]" : ""
                      } flex items-center justify-center px-3 h-8 leading-tight text-white border border-gray-300 hover:bg-[#7A72DE]`}
                    >
                      {p}
                    </button>
                  </li>
                ))}
              </div>
            )}
          </div>
        )}
        <li key="next">
          <button
            disabled={!hasNextPage}
            onClick={() => {
              router.push(
                `/${route}/?page=${Number(page) + 1}&per_page=${per_page}`
              );
            }}
            class="flex items-center justify-center px-3 h-8 leading-tight text-white border border-gray-300 hover:bg-[#7A72DE]"
          >
            <span class="sr-only">Next</span>
            <svg
              class="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationControls;
