import proxy from '../../../proxy.json';

const activeEnvironment = proxy.envs[proxy.activeEnv as keyof typeof proxy.envs];

if (!activeEnvironment) {
  throw new Error(`Unknown activeEnv "${proxy.activeEnv}" in proxy.json`);
}

const isLocalDevelopment =
  typeof window !== 'undefined' &&
  ['localhost', '127.0.0.1'].includes(window.location.hostname);

/**
 * Local `ng serve` requests use the proxy. Hosted builds call the API host
 * selected by `activeEnv` in proxy.json directly.
 */
export const apiUrl = (path: string): string => {
  const apiPath = path.startsWith('/') ? path : `/${path}`;
  return isLocalDevelopment
    ? apiPath
    : `${activeEnvironment.host.replace(/\/+$/, '')}${apiPath}`;
};
