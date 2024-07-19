import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { db } from './db';

export const baseUrl: string = import.meta.env.VITE_BASE_URL;

const handlers = [
  http.get(`${baseUrl}/cards`, ({ request }) => {
    const url = new URL(request.url);

    const pageParam = url.searchParams.get('page');
    const pageSizeParam = url.searchParams.get('pageSize');
    const searchParam = url.searchParams.get('search');

    const condition = searchParam
      ? {
          where: {
            name: {
              contains: searchParam,
            },
          },
        }
      : {};

    const page = pageParam ? Number(pageParam) : 1;
    const pageSize = pageSizeParam ? Number(pageSizeParam) : 250;

    const cards = db.card.findMany({
      ...condition,
      skip: Number((page - 1) * pageSize),
    });

    return HttpResponse.json({
      data: cards,
      page,
      pageSize,
      count: cards.length,
      totalCount: db.card.count(),
    });
  }),
];

export const server = setupServer(...handlers);
