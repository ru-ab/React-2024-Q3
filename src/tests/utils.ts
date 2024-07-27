import { HttpResponse, delay, http } from 'msw';
import { server } from './server';

export const simulateDelay = (endpoint: string) => {
  server.use(
    http.get(endpoint, async () => {
      await delay();
      return HttpResponse.json([]);
    })
  );
};
