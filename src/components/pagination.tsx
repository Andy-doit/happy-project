
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination";
import { Button } from "./ui/button";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export function PaginationDemo({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
        <Pagination className="text-black mt-3 ">
            <PaginationContent >
                <PaginationItem>
                    <Button variant="outline"
                        className={`px-3 py-1  ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                    >
                        <PaginationPrevious />
                    </Button>
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                        <PaginationLink
                            className=""
                            isActive={i + 1 === currentPage}
                            onClick={() => onPageChange(i + 1)}
                        >
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <Button variant="outline"
                        className={`px-3 py-1 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                    >
                        <PaginationNext />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
