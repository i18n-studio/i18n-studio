<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { isObject } from 'vue-composable';
import { getSocketIOService } from '../service/SocketIOService';
import { useSocketOn } from '../hooks/useSocketOn';
import { ISidebarItem } from '../components/Sidebar/SidebarItem.vue';
import { ITreeView } from '../components/TreeView/TreeView.vue';
import { ITreeViewItem } from '../components/TreeView/TreeViewItem.vue';
import LoggingService from '../../../../../libs/api/src/lib/service/LoggingService';

const socket = getSocketIOService();
const selectedFile = ref<string>();
const isConnected = useSocketOn('CONNECT', false, true);
const fileContent = useSocketOn('GET_FILE_CONTENT', {});
const localFiles = useSocketOn('GET_FILES', []);
const sidebarItems = ref<ISidebarItem[]>([]);
const treeViewItems = ref<ITreeView>();

const loggingService = LoggingService.getInstance();

onMounted(() => {
  getTranslation('de.json');
  socket.emit('files');
});

watch(isConnected, () => {
  loggingService.info(
    'HomeView',
    'isConnected',
    'Success while connecting to backend.'
  );
});

watch(localFiles, mapStringToSidebarItemList);
watch(fileContent, mapFileContentToTreeView);

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

function mapStringToSidebarItemList(files: any[]) {
  sidebarItems.value = files.map((file: any) => {
    return {
      label: file.filename.split('.')[0],
      id: file,
    };
  });
}

function getTranslation(file: string) {
  loggingService.info(
    'HomeView',
    'getTranslation',
    `Get translation for ${file}.`
  );
  socket.emit('getFileContent', { file });
}

function onSidebarItemClick(itemId: string) {
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
      :selected="selectedFile"
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
