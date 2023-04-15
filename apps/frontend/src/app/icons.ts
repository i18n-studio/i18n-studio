import { library } from '@fortawesome/fontawesome-svg-core';
/* import specific icons */
import {
  faChevronRight,
  faChevronDown,
  faSearch,
  faAdd,
  faUndo,
  faRedo,
  faBell,
  faRefresh,
  faSpellCheck,
} from '@fortawesome/free-solid-svg-icons';

export function addIcons() {
  library.add(faChevronRight);
  library.add(faChevronDown);
  library.add(faSearch);
  library.add(faAdd);
  library.add(faSpellCheck);
  library.add(faUndo);
  library.add(faRedo);
  library.add(faBell);
  library.add(faRefresh);
}
