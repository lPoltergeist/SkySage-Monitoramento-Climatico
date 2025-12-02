export interface QuoteBody {
    endpoint: string,
}

export interface Quote {
    _id: string
    content: string
    author: string
}

export interface QuotableResponse {
    page: number
    totalCount: number
    totalPages: number
    results: Quote[]
}
