# i18n-studio

[![test & check packages](https://github.com/i18n-studio/i18n-studio/actions/workflows/nodejs.yaml/badge.svg?branch=main)](https://github.com/i18n-studio/i18n-studio/actions/workflows/nodejs.yaml)

![logo](./.github/assets/logo-with-slogan.png)

i18n-Studio is a self-hosted solution designed to make managing translation files easy. With i18n-Studio, you can:

* **Analyze translation files**: Quickly identify errors or discrepancies in your translation files using our built-in analysis tools.
* **Add translations**: With our user-friendly interface, you can easily add translations across multiple files and avoid making errors.
* **Provide translations**: i18n-Studio offers a modern REST API that allows you to provide translations for your application with ease.

> Please note that this project is currently a work in progress. The features mentioned 
above are still in the planning phase and do not yet correspond to the project.

## What is i18n?

i18n is a commonly used abbreviation for internationalization. The "i" represents the first letter of the word, followed by 18 letters representing the number of letters between the first and last letter of the word, and the "n" represents the last letter of the word. Internationalization refers to the process of designing and developing products, services, and systems that can be adapted to meet the cultural, linguistic, and legal requirements of different countries and regions around the world.

The aim of i18n-studio is to simplify the management of translations in software projects.

## Understand this workspace

The workspace is a monorepo that uses [NX](https://nx.dev/). Run `nx graph` to see a diagram of the
dependencies of the projects.

## 🖥️ Installation

### Prerequisites

To install the project, the following things are needed:

* [**Node**](https://nodejs.org/en/download): 16.x
* [**Git**](https://git-scm.com/)

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

## 🧑🏽‍💻 Development server

The project is divided into two applications:

### frontend

The front-end is a VueJS application using TailwindCSS. It connects to the studio-adapter
via [Socket.io](https://socket.io/) and provide a UI to perform various CRUD actions.

To serve the frontend run this command:

```bash 
$ npm run serve:frontend
```

### studio-adapter

This adapter is used for I/O with the file system. It reads the files from a specific
folder and stream them via [Socket.io](https://socket.io/) to the frontend. Every operation
with the file system should be handled by the studio-adapter.

To serve the adapter, run this command:

```bash 
$ npm run serve:adapter
```

## 🐋 Run via Docker

It is possible to start i18n-studio in a Docker environment. To start the application as Docker,
the following command must be executed:

```bash
$ npm run docker:compose
```

This command will run docker build and docker compose up on your machine. When the container has
been created, the front end is located at http://localhost:3000.

## ✅ Dependency check

The project uses a dependency checker [(Snyk)](https://snyk.io/advisor/npm-package/check-packages) to
monitor the health of NPM packages. Since i18n-studio connects directly to the file system via the adapter,
we want to offer users the highest possible security and prevent vulnerabilities.

## Dependency Blacklisting

If NPM packages should be forbidden from the project, they must be included in the
```packages-blacklist.json```.

The package health check can be launched via:

```bash 
$ check-packages --blacklist
```

## 📋 Features

Below you will find a list of planned features. The list is not complete and
can be extended at any time.

> The corresponding issue tickets were added later. Therefore, it is possible that not every feature contains an issue.

| Feature                                      | Completion | Ref                                                                    |
|----------------------------------------------|------------|------------------------------------------------------------------------|
| Set up repository                            | ✔️         |                                                                        |
| Set up basic CI Pipeline                     | ✔️         |                                                                        |
| Serve via docker                             | ️          | [Issue #1](https://github.com/i18n-studio/i18n-studio/issues/1])        |
| Backend: get all files                       | ✔️         |                                                                        |
| Backend: get file content                    | ✔️         |                                                                        |
| Backend: create new translation files        | ✔️         | [Issue #2](https://github.com/i18n-studio/i18n-studio/issues/2])       |
| Backend: create new translations             | ✔️         |                                                                        |
| Backend: update translation files            |            | [Issue #3](https://github.com/i18n-studio/i18n-studio/issues/3])       |
| Backend: update translations                 |            | [Issue #4](https://github.com/i18n-studio/i18n-studio/issues/4])       |
| Backend: remove translation files            |            | [Issue #16](https://github.com/i18n-studio/i18n-studio/issues/16)      |
| Backend: remove translations                 |            | TDB                                                                    |
| Backend: configuration                       | ✔️         |                                                                        |
| Backend: analyze files: soft                 | ✔️         |                                                                        |
| Backend: analyze files: hard                 |            | TDB                                                                    |
| Backend: serve files via REST                |            | TDB                                                                    |
| Frontend: navigate between translation files | ✔️         |                                                                        |
| Frontend: navigate between translations      |            | TDB                                                                    |
| Frontend: create new translation files       |            | TDB                                                                    |
| Frontend: create new translations            |            | TDB                                                                    |
| Frontend: update translation files           |            | TDB                                                                    |
| Frontend: update translations                |            | TDB                                                                    |
| Frontend: remove translation files           |            | TDB                                                                    |
| Frontend: remove translations                |            | TDB                                                                    |
| Idea: Create a configuration wizard          |            | TDB                                                                    |
| Idea: create translation suggestions (deepL) |            | TDB                                                                    |

## Conventional Commits

To standardise commit messages, we use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).
These commit messages are currently not supported by any kind of semantic release. Corresponding plugins are
available for the IDEs:

* **IntelliJ:** https://plugins.jetbrains.com/plugin/13389-conventional-commit
* **VSCode:** https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits
