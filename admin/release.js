import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { config } from '../setConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Paths
const buildsDir = path.join(__dirname, '..', 'builds');
const releaseDir = path.join(__dirname, '..', 'releases');

// Helper function to replace environment variable references
function replaceEnvVars(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [key, value] of Object.entries(config)) {
        const regex = new RegExp(`process\\.env\\.${key}`, 'g');
        content = content.replace(regex, JSON.stringify(value));
    }
    fs.writeFileSync(filePath, content, 'utf8');
}

// Function to find the latest build directory matching a pattern
function findLatestBuildDir(pattern) {
    const dirs = fs.readdirSync(buildsDir).filter(file => {
        const fullPath = path.join(buildsDir, file);
        return fs.statSync(fullPath).isDirectory() && file.startsWith(pattern);
    });
    if (dirs.length === 0) {
        throw new Error(`No build directory matching pattern "${pattern}" found.`);
    }
    // Sort directories by modification time, descending
    dirs.sort((a, b) => fs.statSync(path.join(buildsDir, b)).mtimeMs - fs.statSync(path.join(buildsDir, a)).mtimeMs);
    return path.join(buildsDir, dirs[0], 'dist');
}

// Get the latest build directory based on pattern
const pattern = '01-';  // Adjust pattern as needed
const buildDir = findLatestBuildDir(pattern);

// Ensure release directory exists
if (fs.existsSync(releaseDir)) {
    fs.rmdirSync(releaseDir, { recursive: true });
}
fs.mkdirSync(releaseDir, { recursive: true });

// Copy dist directory from buildDir to releaseDir
function copyDir(srcDir, destDir) {
    fs.readdirSync(srcDir).forEach(file => {
        const srcPath = path.join(srcDir, file);
        const destPath = path.join(destDir, file);
        if (fs.statSync(srcPath).isDirectory()) {
            fs.mkdirSync(destPath, { recursive: true });
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}

// Copy the entire dist directory to releases
copyDir(buildDir, path.join(releaseDir, 'dist'));

// Replace environment variables in the release directory
function processDirectory(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (path.extname(fullPath) === '.js') { // Adjust file types if necessary
            replaceEnvVars(fullPath);
        }
    });
}

processDirectory(releaseDir);

console.log('Release created successfully in:', releaseDir);
