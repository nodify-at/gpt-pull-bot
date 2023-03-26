import * as process from 'child_process';

process.execSync('npm install', { stdio: 'inherit' });
process.execSync('npm run build', { stdio: 'inherit' });