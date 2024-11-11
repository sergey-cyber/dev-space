"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/shadcn/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
  totalPages?: number;
}

export function PostsPagination({ totalPages }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const allPages = generatePagination(currentPage, totalPages || 0);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const disabledClass = "pointer-events-none text-gray-300 dark:text-gray-500";

  if (!totalPages) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={currentPage <= 1 ? disabledClass : ""}
            href={createPageURL(currentPage - 1)}
          />
        </PaginationItem>

        {allPages.map((page) => {
          return (
            <PaginationItem key={page}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={currentPage === page}
                  href={createPageURL(page)}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            className={currentPage >= totalPages ? disabledClass : ""}
            href={createPageURL(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function generatePagination(currentPage: number, totalPages: number) {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}
