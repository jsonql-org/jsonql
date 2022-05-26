{
  "name": "{{name}}",
  "version": "0.0.0",
  "description": "{{name}} generated by create-plop",
  "main": "dist/index.js",
  "module": "dist/index.ts",
  "files": [
    "dist",
    "src",
    'index.d.ts'
  ],
  "scripts": {
    "test:ava": "ava",
    "test": "pnpm build && nyc ava",
    "lint": "eslint src/ --ext .js,.jsx,.ts,.tsx",
    "build:tsc": "tsc -p tsconfig.json",
    "ts:check": "tsc -noEmit",
    "docs": "typedoc --entryPoints src/main.ts",
    "ts": "node -r esbuild-register",
    "prepare:types": "cp ./src/types.d.ts ./dist/types.d.ts",
    "update:version": "node ../../update-deps.js {{projectName}}",
    "make:module": "node ../../make-module.js {{projectName}} {{name}}/src/types.d.ts {{name}}",
    "clean:dist": "rimraf ./dist",
    "build": "pnpm clean:dist && pnpm build:tsc && pnpm prepare:types",
    "prepublishOnly": "pnpm test",
    "postpublish": "pnpm update:version",
    "patch": "npm version patch",
    "minor": "npm version minor",
    "major": "npm version major"
  },
  "author": "{{{author}}}",
  "license": "{{license}}",
  "homepage": "https://jsonql.org",
  "dependencies": {

  },
  "devDependencies": {
    "@ava/typescript": "^3.0.1",
    "@types/node": "^17.0.35",
    "@typescript-eslint/eslint-plugin": "^5.26.0",
    "@typescript-eslint/parser": "^5.26.0",
    "@swc/cli": "^0.1.57",
    "@swc/core": "^1.2.194",
    "@types/debug": "^4.1.7",
    "@types/fs-extra": "^9.0.13",
    "ava": "^4.2.0",
    "esbuild": "^0.14.39",
    "esbuild-register": "^3.3.2",
    "eslint": "^8.16.0",
    "nyc": "^15.1.0",
    "rimraf": "^3.0.2",
    "typescript": "^4.7.2",
    "debug": "^4.3.4",
    "fs-extra": "^10.1.0"
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
