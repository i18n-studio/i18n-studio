import { FileService } from './file.service';
import { File } from '../../../../../../libs/api/src/lib/models/File';
import { Test } from '@nestjs/testing';

describe('FileService', () => {
  let fileService: FileService;

  const filesMock: File[] = [
    new File('de.json'),
    new File('en.json'),
    new File('it.json'),
  ];

  const filesDir = './../../example/i18n';

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [FileService],
    }).compile();

    fileService = moduleRef.get<FileService>(FileService);
  });

  describe('filter files', () => {
    it('get all .json files', () => {
      const filter = '.json';

      expect(fileService.filterFiles(filesMock, filter).length).toEqual(3);
    });

    it('get en.json file', () => {
      const filter = 'en.json';

      expect(fileService.filterFiles(filesMock, filter).length).toEqual(1);
    });

    it('get no file', () => {
      const filter = 'fr.json';

      expect(fileService.filterFiles(filesMock, filter).length).toEqual(0);
    });
  });

  describe('get file content', () => {
    it('should get content of en.json', () => {
      const content = fileService.getFileContent(`${filesDir}/en.json`);
      expect(content).toEqual({
        hello: 'Hello',
      });
    });

    it('should not get content of fr.json', () => {
      const content = fileService.getFileContent(`${filesDir}/fr.json`);
      expect(content).toEqual({});
    });
  });
});
