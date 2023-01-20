import {
  EnvironmentVariable,
  configureWunderGraphApplication,
  cors,
  introspect,
  templates,
} from '@wundergraph/sdk';
import operations from './wundergraph.operations';
import server from './wundergraph.server';

const countries = introspect.graphql({
  apiNamespace: 'countries',
  url: 'https://countries.trevorblades.com/',
});

// configureWunderGraph emits the configuration
configureWunderGraphApplication({
  apis: [countries],
  server,
  operations,
  codeGenerators: [
    {
      templates: [
        // use all the typescript react templates to generate a client
        ...templates.typescript.all,
        templates.typescript.operations,
        templates.typescript.linkBuilder,
      ],
    },
    {
      templates: [templates.typescript.client],
      path: '../../libs/data-access/src/lib/generated-wundergraph',
    },
  ],
  cors: {
    ...cors.allowAll,
    allowedOrigins:
      process.env.NODE_ENV === 'production'
        ? [
            // change this before deploying to production to the actual domain where you're deploying your app
            new EnvironmentVariable(
              `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
            ),
            'https://bodie.vercel.app/',
          ]
        : [
            'http://localhost:4200',
            'http://127.0.0.1:4200',
            'http://localhost:9991',
            'http://127.0.0.1:9991',
          ],
  },
  dotGraphQLConfig: {
    hasDotWunderGraphDirectory: false,
  },
  authentication: {
    tokenBased: {
      providers: [
        {
          userInfoEndpoint:
            process.env.NODE_ENV === 'production'
              ? new EnvironmentVariable(NEXTAUTH_URL) + '/api/auth/session'
              : 'http://localhost:4200/api/auth/session',
        },
      ],
    },
  },
  security: {
    enableGraphQLEndpoint:
      process.env.NODE_ENV !== 'production' ||
      process.env.GITPOD_WORKSPACE_ID !== undefined,
  },
});
