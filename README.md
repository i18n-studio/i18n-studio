# i18n-studio 
[![test & check packages](https://github.com/dominique-boerner/i18n-studio/actions/workflows/nodejs.yaml/badge.svg)](https://github.com/dominique-boerner/i18n-studio/actions/workflows/nodejs.yaml)

![logo](./.github/assets/logo-with-slogan.png)

i18n-Studio is a self-hosted solution for managing translation files. It helps with:

* **file analyzing**: Analysis of the translation files for errors or different keys.
* **adding translations**: Add translations across multiple files via a UI to prevent errors.
* **provide translations**: Provide translations for your application via a modern REST API.

<i style="color: #1586F7">This project is currently a work in progress. The above features 
do not yet correspond to the project, and are only planned.</i>

## Installation

### Prerequisites

To install the project, the following things are needed:

* [**Node**](https://nodejs.org/en/download): 16.x

### Checkout

Clone this repository via:

```bash
$ git clone https://github.com/dominique-boerner/i18n-studio.git 
```

### Install

Navigate into the repository and install the dependencies via:

```bash
$ cd i18n-studio
$ npm install
```

## Development server

The project is divided into two applications:

### frontend

The front-end is a VueJS application using TailwindCSS.

```bash 
$ npm run serve:frontend
```

### studio-adapter

This adapter is used for I/O with the file system. It reads the files from a specific
folder and stream them via socket.io.

```bash 
$ npm run serve:adapter
```

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Dependency check

The project uses a dependency checker (Snyk) to monitor the health of NPM packages. 
If NPM packages are excluded from the analysis, they must be included in the 
```packages-blacklist.json```.

The package health check can be launched via:

```bash 
$ check-packages --blacklist
```
