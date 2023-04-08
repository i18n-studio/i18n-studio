/**
 * Represents a file of the file system.
 */
export class File {
  filename: string;

  constructor(filename: string) {
    this.filename = filename;
  }

  public filenameMatching(pattern: string) {
    const toMatchString = new RegExp(pattern);
    return this.filename.match(toMatchString);
  }
}
