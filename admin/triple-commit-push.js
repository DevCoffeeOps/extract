// Only run this if you make change to admin/save-build.js
// This script pushes 3 commits to history to ensure latest admin/save-build.js change spans the three latest commits.

import { execSync } from 'child_process';

function runCommand(command) {
    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Failed to run command "${command}":`, error.message);
        process.exit(1);
    }
}

function commitAndPush() {
    runCommand('git add --all');

    for (let i = 1; i <= 3; i++) {
        const commitMessage = `Empty commit ${i}`;
        runCommand(`git commit --allow-empty -m '${commitMessage}'`);
    }

    runCommand('git push');
}

commitAndPush();
