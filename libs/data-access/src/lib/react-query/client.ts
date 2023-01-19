import { createClient, Operations } from '../generated-wundergraph/client';

import { createHooks } from '@wundergraph/react-query';

export const client = createClient({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_VERCEL_URL + '/api/wg'
      : 'http://localhost:4200/api/wg',
});

export const {
  useQuery,
  useMutation,
  useSubscription,
  useUser,
  useAuth,
  queryKey,
} = createHooks<Operations>(client);
