# Monthly Premium Calculator - TAL TEST

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Run application in local](#run-application-in-local)
* [Prod Build](#prod-build)
* [Application deployed in Azure for DEMO](#application-deployed-in-azure-for-demo)
* [Application Purpose](#application-purpose)
* [Assumptions](#assumptions)
* [Highlights](#highlights)

## General info
This is the TAL Test project to have the ability to choose various options on the screen so that I can view the monthly premiums calculated (based on the custom logic) and displayed on the screen based on Name,Date of Birth,,Occupation and Sum Insured.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.1.
	
## Technologies
Project is created with:
* Angular : 15.2.1
* Node : v18.14.2
* Npm : 9.1.1
* Bootstrap : 5.2.3
* VS Code : 1.74.3
	
## Setup
To run this project, install it locally using npm:

```
    1. Node and NPM
	
        Node is required by the Angular CLI. You can download from the official node website for your system

        We can check node and npm versions after installation using the below commands:
            node --version
            npm --version

	2. Angular CLI
        Install the latest version of Angular CLI using the below command :
        npm install -g @angular/cli
```

## Run application in local
```
Run `npm install` to prepare your environment
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
```
## Prod Build
```
Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
```

## Application deployed in Azure for DEMO
```
https://tal-app.azurewebsites.net/
```
## Application Purpose

As a User, I would like to have the ability to choose various options on the screen so that I can view the monthly premiums calculated (based on the custom logic) and displayed on the screen based on Name,Date of Birth,,Occupation and Sum Insured.

Develop a UI that accepts the below data and returns a monthly premium amount to be calculated.

## Assumptions

* Age will be calcualted based on Date of Birth change and will be displayed in screen
* Date of Birth is restricted to max 70 years age
* All fields are mandatory
* Monthly Premium will be calculated once all mandatory fields are entered
* Based on Occupation change, monthly premium will be calculated
* Reset feature to go original state of the application so that user can enter fresh inputs based on need

## Highlights

* Application created with latest angular version 15.x
* Bootstrap 5.2.1 for responsive design
* Ngx-Boostrap 10.2.0 version for Date Picker component
* Followed Angular's clean architecture with Service, Components, Routing, and Global/Local CSS
* Written business logic or validations in Premium Service
* Angular components & Html views are well maintained with UI/UX practices
* Utilized CSS/SCSS well with reusability features and didn't have any inline-styles
* Handled validations and uniform look & feel across the application
* Deployed application in Azure for the DEMO purpose
