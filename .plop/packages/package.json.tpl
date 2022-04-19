{
  "name": "{{name}}",
  "version": "0.0.0",
  "description": "{{name}} generated by create-plop",
  "main": "dist/index.js",
  "module": "dist/index.ts",
  "typings": "dist/types.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "test:ava": "nyc ava",
    "test": "pnpm build && pnpm test:ava",
    "lint": "eslint src/ --ext .js,.jsx,.ts,.tsx",
    "build:tsc": "tsc -p tsconfig.json",
    "ts:check": "tsc -noEmit",
    "docs": "typedoc --entryPoints src/main.ts",
    "ts": "node -r esbuild-register",
    "prepare:types": "cp ./src/types.d.ts ./index.d.ts && cp ./src/types.d.ts ./dist/types.d.ts",
    "update:version": "node ../../update-deps.js {{projectName}}",
    "clean:dist": "rimraf ./dist",
    "build": "pnpm clean:dist && pnpm build:tsc",
    "prepublishOnly": "pnpm build && pnpm test",
    "patch": "npm version patch",
    "minor": "npm version minor",
    "major": "npm version major"
  },
  "author": "{{author}}",
  "license": "{{license}}",
  "homepage": "{{homepage}}",
  "dependencies": {

  },
  "devDependencies": {
    "@ava/typescript": "^3.0.1",
    "@types/node": "^17.0.23",
    "@typescript-eslint/eslint-plugin": "^5.17.0",
    "@typescript-eslint/parser": "^5.17.0",
    "ava": "^4.1.0",
    "esbuild": "^0.14.30",
    "esbuild-register": "^3.3.2",
    "eslint": "^8.12.0",
    "nyc": "^15.1.0",
    "rimraf": "^3.0.2",
    "typescript": "^4.6.3"
  },
  "ava": {
    "verbose": true,
    "files": [
      "tests/**/*.test.ts"
    ],
    "extensions": [
      "ts"
    ],
    "require": [
      "esbuild-register"
    ]
  }
}
