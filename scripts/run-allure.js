const { spawn } = require('child_process');
const path = require('path');

const allureHome = path.join(
  path.dirname(require.resolve('allure-commandline/package.json')),
  'dist'
);
const allureBin = path.join(
  allureHome,
  'bin',
  process.platform === 'win32' ? 'allure.bat' : 'allure'
);

const javaBin = process.env.JAVA_HOME
  ? path.join(process.env.JAVA_HOME, 'bin', process.platform === 'win32' ? 'java.exe' : 'java')
  : process.platform === 'win32'
    ? 'java.exe'
    : 'java';
const javaArgs = [
  '-classpath',
  [path.join(allureHome, 'lib', '*'), path.join(allureHome, 'lib', 'config')].join(path.delimiter),
  'io.qameta.allure.CommandLine',
  ...process.argv.slice(2),
];

const child = spawn(process.platform === 'win32' ? javaBin : allureBin, process.platform === 'win32' ? javaArgs : process.argv.slice(2), {
  env: process.env,
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
