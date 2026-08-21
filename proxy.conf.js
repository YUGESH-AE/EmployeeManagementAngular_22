/**
 * Dev-server proxy. Target host comes only from proxy.json "activeEnv".
 * Change activeEnv (render, local, dev, …) and restart `ng serve`.
 */
const proxy = require('./proxy.json');

const env = proxy.activeEnv;
const config = proxy.envs[env];

if (!config) {
  throw new Error(`[proxy] Unknown activeEnv "${env}". Use one of: ${Object.keys(proxy.envs).join(', ')}`);
}

const target = String(config.host).replace(/\/+$/, '');

console.log(`[proxy] activeEnv=${env} -> ${target}`);

module.exports = {
  '/api': {
    target,
    secure: false,
    changeOrigin: true,
    timeout: 120000
  }
};
