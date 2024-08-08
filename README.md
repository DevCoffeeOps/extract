## extract

#### Getting Started

You must set the following:
```js
process.env.EXTRACT__GOOGLE_MAPS_API_KEY = "Your api key";
process.env.EXTRACT__KEYWORD = "Your search keyword";
process.env.EXTRACT__CITY_STATE = "City, State";
process.env.EXTRACT__OUTPUT_DIR = "path-to-output-dir";
```

```sh
npm run build-all # build current src and previous 2 commits, save to builds/

npm run release   # create a release that combines the current build with all process.env.VARS used
# WARNING: releases/dist/* files will contain all process.env variable values used, including sensitive keys.

npm run go        # run the local release in releases/dist

# You can copy releases/dist to any system that has Node.js installed and run it with:
`node releases/dist/index.js`
```

Notes:
- `releases/` is `.gitignored`
- `builds/` is not `.gitignored`, `builds/**/node_modules` is `.gitignored`, however I think `git` automatically tries to `.gitignore` folders named `builds/` so those files aren't showing up in github. They should be OK to commit since they don't include evaluated process.env.VARIABLE values.