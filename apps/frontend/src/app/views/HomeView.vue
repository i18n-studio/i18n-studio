<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { isObject } from 'vue-composable';
import {
  getSocketIOService,
  SocketIOService,
} from '../service/SocketIOService';
import { useSocketOn } from '../hooks/useSocketOn';
import { ISidebarItem } from '../components/Sidebar/SidebarItem.vue';
import { ITreeView } from '../components/TreeView/TreeView.vue';
import { ITreeViewItem } from '../components/TreeView/TreeViewItem.vue';
import LoggingService from '../../../../../libs/api/src/lib/service/LoggingService';
import { File } from '../../../../../libs/api/src/lib/models/File';

const socket = getSocketIOService();
const selectedFile = ref<File>();
const isConnected = useSocketOn('CONNECT', false, true);
const fileContent = useSocketOn('GET_FILE_CONTENT', {});
const localFiles = useSocketOn('GET_FILES', []);
const sidebarItems = ref<ISidebarItem[]>([]);
const treeViewItems = ref<ITreeView>();

const loggingService = LoggingService.getInstance();
const socketService = SocketIOService.getInstance();

onMounted(() => {
  socketService.emitEvent('GET_FILES');
});

watch(isConnected, () => {
  loggingService.info(
    'HomeView',
    'isConnected',
    'Success while connecting to backend.'
  );
});

watch(localFiles, (value: File[]) => {
  mapStringToSidebarItemList(value);
});

watch(fileContent, mapFileContentToTreeView);

watch(selectedFile, () => {
  socketService.emitEvent('GET_FILE_CONTENT', {
    filename: localFiles.value[0].filename,
  });
});

function mapFileContentToTreeView(content: any) {
  const items: ITreeViewItem = {
    children: generateTreeViewItemList(content),
  };
  treeViewItems.value = items;
}

function generateTreeViewItemList(content: any): ITreeViewItem {
  const keys = Object.keys(content);
  const items: ITreeViewItem = keys.map((key) => {
    return {
      label: key,
      isOpen: false,
      isCollapsible: typeof content[key] === 'object',
      children: isObject(content[key])
        ? generateTreeViewItemList(content[key])
        : null,
    };
  });
  return items;
}

function mapStringToSidebarItemList(files: File[]) {
  sidebarItems.value = files.map((file) => {
    return {
      label: file.filename.split('.')[0],
      id: file,
    };
  });
}

function getTranslation(file: File) {
  loggingService.info(
    'HomeView',
    'getTranslation',
    `Get translation for ${file}.`
  );
}

function onSidebarItemClick(itemId: File) {
  selectedFile.value = itemId;
  getTranslation(itemId);
}
</script>

<template>
  <Toolbar />
  <section class="flex flex-row h-screen">
    <Sidebar
      class="w-auto"
      :model="sidebarItems"
      :selected="selectedFile?.filename"
      @on-item-click="onSidebarItemClick"
    />
    <div class="flex flex-col p-2 w-80 bg-white border-r-2">
      <div class="flex flex-row justify-between items-center py-2">
        <h2 class="font-bold text-xl">Translations</h2>
      </div>
      <Input placeholder="search" />
      <TreeView v-if="treeViewItems" :model="treeViewItems" />
    </div>
    <div class="bg-gray-100 w-screen p-4 py-5">
      <pre>{{ fileContent }}</pre>
    </div>
  </section>
</template>
