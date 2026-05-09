const { spawn } = require('child_process');
const path = require('path');

const cypressBin = path.join(path.dirname(require.resolve('cypress/package.json')), 'bin', 'cypress');
const env = { ...process.env };

delete env.ELECTRON_RUN_AS_NODE;

for (const key of ['HTTP_PROXY', 'HTTPS_PROXY', 'ALL_PROXY', 'GIT_HTTP_PROXY', 'GIT_HTTPS_PROXY']) {
  if (env[key] === 'http://127.0.0.1:9') {
    delete env[key];
  }
}

const child = spawn(process.execPath, [cypressBin, ...process.argv.slice(2)], {
  env,
  stdio: 'inherit',
  shell: false,
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
