import { getDeploymentUrl } from '@bodie/utils';
import { Operations, createClient } from '../generated-wundergraph/client';

import { createHooks } from '@wundergraph/react-query';

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
