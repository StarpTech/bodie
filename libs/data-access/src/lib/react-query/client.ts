import { Operations, createClient } from '../generated-wundergraph/client';

import { createHooks } from '@wundergraph/react-query';

const getDeploymentUrl = () => {
  if (typeof window === 'undefined') {
    return 'http://localhost:4200';
  }
  return window.location.origin;
};

export const client = createClient({
  baseURL: getDeploymentUrl() + '/api/wq',
});

console.log(getDeploymentUrl() + '/api/wq');

export const {
  useQuery,
  useMutation,
  useSubscription,
  useUser,
  useAuth,
  queryKey,
} = createHooks<Operations>(client);
