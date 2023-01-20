import { Operations, createClient } from '../generated-wundergraph/client';

import { createHooks } from '@wundergraph/react-query';

const getDeploymentUrl = () => {
  if (typeof window === 'undefined') {
    return 'Not available on server side';
  }
  return window.location.origin;
};

export const client = createClient({
  baseURL: getDeploymentUrl() + '/api/wg',
});

export const {
  useQuery,
  useMutation,
  useSubscription,
  useUser,
  useAuth,
  queryKey,
} = createHooks<Operations>(client);
