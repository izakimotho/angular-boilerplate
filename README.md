# AcrresinsightBoilerplate

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.
<p align="center">
     <img src="public/icons/icon-512x512.png" alt="angular" width="90">     
</p>

---

[![Netlify Status](https://api.netlify.com/api/v1/badges/3f3d0969-3549-4300-863d-06a1d6785cd0/deploy-status)](https://app.netlify.com/sites/angular-boiler-palte/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()


## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.
## SSL

In order to run either application locally using SSL, install the SSL certificate found in the ssl folder.  And then pass the ssl flag when starting the application.  For example, run `ng serve --ssl` or `ng serve --open --ssl` for a https dev server of the default application. Then navigate to `https://localhost:4210/`.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
