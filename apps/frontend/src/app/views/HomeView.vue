<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { isObject } from 'vue-composable';
import { SocketIOService } from '../service/SocketIOService';
import { useSocketOn } from '../hooks/useSocketOn';
import { ISidebarItem } from '../components/Sidebar/SidebarItem.vue';
import { ITreeView } from '../components/TreeView/TreeView.vue';
import { ITreeViewItem } from '../components/TreeView/TreeViewItem.vue';
import { INotification } from '../components/NotificationItem.vue';
import { File } from '../../../../../libs/api/src/lib/models/File';
import { AnalyzeResult } from '../../../../../libs/api/src/lib/models/AnalyzeResult';

const socketService = SocketIOService.getInstance();

const selectedFile = ref<string>();
const isConnected = useSocketOn('CONNECT', false, true);
const fileContent = useSocketOn('GET_FILE_CONTENT', null);
const localFiles = useSocketOn('GET_FILES', []);
const softAnalyzeResults = useSocketOn('SOFT_ANALYZE', []);

const notifications = computed<INotification[]>(() => {
  const analyzeResults: AnalyzeResult[] = softAnalyzeResults.value;

  return analyzeResults.map((result) => {
    return {
      title: `Difference found`,
      text: `"${result.src}" contains ${result.differentKeysCount} more lines
            than your default language "${result.target}".`,
      severity: 'error',
    };
  });
});

const treeViewItems = computed<ITreeView>(() => {
  const content = fileContent.value;
  if (content) {
    return {
      children: generateTreeViewItemList(content),
    };
  }
});

const sidebarItems = computed<ISidebarItem[]>(() => {
  const files: File[] = localFiles.value;
  if (files.length > 0) {
    return files.map((file) => {
      return {
        label: file.filename.split('.')[0],
        id: file.filename,
      };
    });
  }
  return [];
});

onMounted(() => {
  socketService.emitEvent('GET_FILES');
});

function generateTreeViewItemList(content: any): ITreeViewItem {
  const keys = Object.keys(content);
  return keys.map((key) => {
    return {
      label: key,
      isOpen: false,
      isCollapsible: typeof content[key] === 'object',
      children: isObject(content[key])
        ? generateTreeViewItemList(content[key])
        : null,
    };
  });
}

function onSidebarItemClick(file: string) {
  selectedFile.value = file;
  socketService.emitEvent('GET_FILE_CONTENT', {
    filename: file,
  });
}

function softAnalyze() {
  socketService.emitEvent('SOFT_ANALYZE');
}
</script>

<template>
  <Toolbar
    :isDisabled="!isConnected"
    :notifications="notifications"
    @on-notification-refresh-click="softAnalyze"
  />
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
      <pre v-if="fileContent">{{ fileContent }}</pre>
    </div>
  </section>
</template>
