'use client';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IProps{
  totalPages:number;
  currentPage:number; // initially passed from parent
}

const CustomPagination = ({ totalPages, currentPage: initialPage }: IProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    const pageParam = searchParams.get('page');
    const page = pageParam ? parseInt(pageParam) : 1;
    setCurrentPage(page);
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.replace(`${pathname}?${params.toString()}`,{scroll:false});
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {currentPage > 1 && (
            <PaginationPrevious 
              href="#" 
              onClick={() => handlePageChange(currentPage - 1)} 
            />
          )}
        </PaginationItem>
        
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          return (
            <PaginationItem key={page}>
              <PaginationLink 
                href="#" 
                className={`${currentPage === page ? 'bg-primary text-white' : ''}`}
                onClick={() => handlePageChange(page)} 
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {totalPages > 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          {currentPage < totalPages && (
            <PaginationNext 
              href="#" 
              onClick={() => handlePageChange(currentPage + 1)} 
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default CustomPagination;