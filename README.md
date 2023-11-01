# EnergyMarketplaceUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Docker

To build the image, run this command (where <APP_NAME> is your application name):
`docker build -t <APP_NAME>`

To get the docker image running, run this command:
`docker run -p 5100:80 <DOCKER_IMAGE>`
To view the application, go to this address:

http://localhost:5100

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Create Docker Container

docker build -t energymarketplace/energymarketplace_ui:v1.0.0 .

## Run Docker Container

docker run -d -p 5100:80 energymarketplace/energymarketplace_ui:v1.0.0