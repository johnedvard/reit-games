# ReitGames

This is the front-end code for my personal web site.

## Prepare

We need to prepare out enviroment before we can build.
Create these two files:

- `src/environments/environment.prod.ts`
- `src/environments/environment.ts`

And replace the content based on the template: `src/environments/environment.template.ts`.
It contains the following variables

- nftStorageApiKey (see <a href="#nftStorageApiKey">nftStorageApiKey</a> for details)
- production
- home

### nftStorageApiKey

Get an API-key from https://nft.storage/

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
