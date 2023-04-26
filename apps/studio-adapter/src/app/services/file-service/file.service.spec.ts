import { FileService } from './file.service';
import { File } from '../../../../../../libs/api/src/lib/models/File';
import { Test } from '@nestjs/testing';
import mockfs from 'mock-fs';
import * as fs from 'fs';

describe('FileService', () => {
  let fileService: FileService;
  const mockDir = 'i18n';

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [FileService],
    }).compile();

    mockfs({
      [mockDir]: {
        'de.json': '{}',
        'en.json': '{ "hello": "Hello" }',
      },
    });

    fileService = moduleRef.get<FileService>(FileService);
  });

  /**
   * We need to restore the filesystem after every test, because else
   * we run into problems:
   * https://stackoverflow.com/a/69000375/14472993
   */
  afterEach(() => mockfs.restore());

  describe('getFiles', () => {
    it('should get all files', () => {
      const files = fileService.getFiles(mockDir);
      const result: File[] = [new File('de.json'), new File('en.json')];

      expect(files).toEqual(result);
    });
  });

  describe('getFileContent', () => {
    it('should get content of en.json', () => {
      const content = fileService.getFileContent(`${mockDir}/en.json`);
      const result = {
        hello: 'Hello',
      };
      expect(content).toEqual(result);
    });

    it('should not get content of fr.json', () => {
      const content = fileService.getFileContent(`${mockDir}/fr.json`);
      const result = {};
      expect(content).toEqual(result);
    });
  });

  describe('filterFiles', () => {
    it('should filter all json files', () => {
      const files: File[] = [new File('de.json'), new File('en.json')];
      const result = [new File('de.json'), new File('en.json')];
      const filtered = fileService.filterFiles(files, '.json');
      expect(filtered).toEqual(result);
    });

    it('should filter de.json', () => {
      const files: File[] = [new File('de.json'), new File('en.json')];
      const result = [new File('de.json')];
      const filtered = fileService.filterFiles(files, 'de.json');
      expect(filtered).toEqual(result);
    });
  });

  describe('updateFile', () => {
    it('should update en.json', () => {
      const fileToUpdate = `${mockDir}/en.json`;
      const newContent = "{bye: 'bye'}";

      fileService.updateFile(fileToUpdate, newContent);
      const content = fs.readFileSync(fileToUpdate, 'utf8');
      expect(content).toContain(newContent);
    });
  });

  describe('createFile', () => {
    it('should create a new fr.json', () => {
      fileService.createFile(mockDir, 'fr.json');
      const fileExists = fs.existsSync(`${mockDir}/fr.json`);
      const content = fs.readFileSync(`${mockDir}/fr.json`, 'utf8');
      expect(fileExists).toBeTruthy();
      expect(content).toContain('{}');
    });

    it('should not create a already existing file', () => {
      fileService.createFile(mockDir, 'en.json');
      const fileExists = fs.existsSync(`${mockDir}/en.json`);
      const content = fs.readFileSync(`${mockDir}/en.json`, 'utf8');
      expect(fileExists).toBeTruthy();
      expect(content).toContain('{ "hello": "Hello" }');
    });
  });
});
