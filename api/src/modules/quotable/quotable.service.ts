import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import * as Quote from 'src/DTO/quotable';


@Injectable()
export class QuotableService {

  async getQuotes(endpoint: Quote.QuoteBody): Promise<Quote.QuotableResponse | null> {
    try {
      const resp = await axios.get<Quote.QuotableResponse>(
        `https://api.quotable.io${endpoint.endpoint}`
      );

      return resp.data;

    } catch (err: any) {

      if (err.response?.status === 404) {
        console.warn(`Rota inexistente: ${endpoint.endpoint}`);
        return null;
      }

      console.error("Erro ao consultar quotable:", err.message);
      return null;
    }
  }


}
