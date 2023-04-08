import { createApp } from "vue";
import router from "./router/index";

import "./assets/main.css";

// Import icon libraries
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faChevronRight,
  faChevronDown,
  faSearch,
  faAdd,
  faFileCircleCheck,
  faUndo,
  faRedo,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faChevronRight);
library.add(faChevronDown);
library.add(faSearch);
library.add(faAdd);
library.add(faFileCircleCheck);
library.add(faUndo);
library.add(faRedo);
library.add(faCircleExclamation);

import App from "./App.vue";

const app = createApp(App);
app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
