import { FileService } from './file.service';
import { File } from '../../models/File';
import { Test } from '@nestjs/testing';

describe('FileService', () => {
  let fileService: FileService;

  const filesMock: File[] = [
    new File('de.json'),
    new File('en.json'),
    new File('it.json'),
  ];

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
});
