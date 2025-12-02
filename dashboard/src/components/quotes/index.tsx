import { api } from "@/lib/api"
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableRow } from "../ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const Quotes = () => {
    const limit = 10

    const [quotes, setQuotes] = useState<any>(null)
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(0)

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const responseQuotes = await api.post(`/quotable`, {
                    endpoint: `/quotes?page=${page}&limit=${limit}`
                })

                setTotalPages(responseQuotes.data.totalPages)
                setQuotes(responseQuotes.data.results)
            } catch (error) {
                console.log(error)
            }
        }

        fetchQuotes()
    }, [page])

    return (
        <>
            <div className="min-h-screen to-violet-900 text-slate-100 p-6">
                <div className="w-full flex justify-center">
                    <div className="border border-[#F5D10D]/40 rounded-md overflow-hidden w-full max-w-[1000px] min-w-[500px]">
                        <div className="h-[320px] overflow-y-auto">

                            <Table className="w-full table-fixed">

                                <TableBody>
                                    {quotes?.map((quote: any) => (
                                        <TableRow
                                            key={quote.content}
                                            className="hover:bg-[#F5D10D]/20 border-b border-[#F5D10D]/30 transition-colors"
                                        >
                                            <TableCell
                                                className="font-bold text-white whitespace-nowrap w-[150px] text-left"
                                            >
                                                {quote.author}
                                            </TableCell>

                                            <TableCell
                                                className="text-xl whitespace-normal break-words text-left"
                                            >
                                                {quote.content}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>



                        </div>
                    </div>
                </div>


                <Pagination>
                    <PaginationContent className="flex gap-2 pt-2">

                        <PaginationItem>
                            <PaginationPrevious
                                className={`
          bg-[#F5D10D] text-red-50 hover:bg-[#F5D10D]/80 transition-colors 
          px-4 py-2 rounded-md font-semibold
          ${page === 1 ? "pointer-events-none opacity-40" : ""}
        `}
                                onClick={() => {
                                    setPage(page - 1);
                                }}
                            />
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationNext
                                className={`
          bg-[#F5D10D] text-red-50 hover:bg-[#F5D10D]/80 transition-colors
          px-4 py-2 rounded-md font-semibold
          ${page === totalPages ? "pointer-events-none opacity-40" : ""}
        `}
                                onClick={() => {
                                    if (page < totalPages) setPage(page + 1)

                                }}
                            />
                        </PaginationItem>

                    </PaginationContent>
                </Pagination>
            </div>




        </>
    )

}

export default Quotes