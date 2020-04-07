// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = { 
  production: false,
  /*API_URL: 'http://arcasoftwares.com.br:8383/exception-service',
  API_AUTH: 'http://arcasoftwares.com.br:8080/user-management',
  SOFTWARE_PUBLIC_KEY: '6a753834-7b33-4610-8657-724118ccfdae'*/

  API_URL: 'http://localhost:8383/exception-service',
  API_AUTH: 'http://localhost:8080/user-management',
  SOFTWARE_PUBLIC_KEY: 'be9a2bd9-6475-4dcf-b06d-67758af5bce5'
};
