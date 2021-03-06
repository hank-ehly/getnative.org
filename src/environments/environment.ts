// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    staging: false,
    development: true,
    name: 'development',
    apiBaseUrl: 'http://localhost:3000',
    facebookLoginUrl: 'http://localhost:3000/oauth/facebook',
    twitterLoginUrl: 'http://localhost:3000/oauth/twitter',
    googleLoginUrl: 'http://localhost:3000/oauth/google',
    facebookAppId: '215586025582003',
    googleStorageUrl: 'https://storage.googleapis.com/stg.getnative.org'
};
