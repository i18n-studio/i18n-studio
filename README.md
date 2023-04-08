# I18nStudio

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
