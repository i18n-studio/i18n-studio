import { library } from '@fortawesome/fontawesome-svg-core';
/* import specific icons */
import {
  faAdd,
  faBell,
  faChevronCircleDown,
  faChevronDown,
  faChevronRight,
  faChevronUp,
  faLanguage,
  faRedo,
  faRefresh,
  faSearch,
  faSpellCheck,
  faUndo,
  faCaretDown,
  faCaretRight,
  faFolderOpen,
  faFolderClosed,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';

export function addIcons() {
  library.add(faChevronRight);
  library.add(faChevronDown);
  library.add(faChevronUp);
  library.add(faChevronRight);
  library.add(faSearch);
  library.add(faAdd);
  library.add(faSpellCheck);
  library.add(faUndo);
  library.add(faRedo);
  library.add(faBell);
  library.add(faRefresh);
  library.add(faLanguage);
  library.add(faChevronCircleDown);
  library.add(faCaretDown);
  library.add(faCaretRight);
  library.add(faFolderOpen);
  library.add(faFolderClosed);
  library.add(faQuestionCircle);
}
