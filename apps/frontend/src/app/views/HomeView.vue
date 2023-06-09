<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { SocketIOService } from '../service/SocketIOService';
import { useSocketOn } from '../hooks/useSocketOn/useSocketOn';
import { ISidebarItem } from '../components/Sidebar/SidebarItem.vue';
import { ITreeView } from '../components/TreeView/TreeView.vue';
import { ITreeViewItem } from '../components/TreeView/TreeViewItem.vue';
import { INotification } from '../components/NotificationItem.vue';
import { File } from '../../../../../libs/api/src/lib/models/File';
import { AnalyzeResult } from '../../../../../libs/api/src/lib/models/AnalyzeResult';
import I18nViewer from '../components/I18nViewer/i18nViewer.vue';
import { ViewType, ViewTypeJson } from '../components/I18nViewer/types';
import { SocketEvents } from '../socket.event';

const socketService = SocketIOService.getInstance();

const selectedFile = ref<string>();
const viewType = ref<ViewType>('editor');
const notificationVisible = ref<boolean>(true);

const isConnected = useSocketOn(SocketEvents.CONNECT, false, true);
const fileContent = useSocketOn<any>(SocketEvents.GET_FILE_CONTENT);
const localFiles = useSocketOn<File[]>(SocketEvents.GET_FILES, []);
const softAnalyzeResults = useSocketOn<AnalyzeResult[]>(
  SocketEvents.SOFT_ANALYZE,
  []
);

const notifications = computed<INotification[]>(() => {
  const analyzeResults: AnalyzeResult[] = softAnalyzeResults.value.data;

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
  return {};
});

const sidebarItems = computed<ISidebarItem[]>(() => {
  const files: File[] = localFiles.value.data;
  if (files && files.length > 0) {
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
  socketService.emitEvent(SocketEvents.GET_FILES);
  softAnalyze();
});

watch(localFiles, () => {
  if (localFiles.value.data) {
    selectFile(localFiles.value.data[0].filename);
  }
});

function generateTreeViewItemList(content: {
  [key: string]: any;
}): ITreeViewItem {
  const keys = Object.keys(content);
  return keys.map((key, index) => {
    return {
      id: `${key}_${index}`,
      label: key,
      children:
        typeof content[key] === 'object'
          ? generateTreeViewItemList(content[key])
          : null,
    };
  });
}

function selectFile(file: string) {
  selectedFile.value = file;
  socketService.emitEvent(SocketEvents.GET_FILE_CONTENT, {
    filename: file,
  });
}

function softAnalyze() {
  socketService.emitEvent(SocketEvents.SOFT_ANALYZE);
}
</script>

<template>
  <Toolbar
    :isDisabled="!isConnected"
    :notificationCount="notifications.length"
    @on-notification-click="notificationVisible = !notificationVisible"
  />
  <section class="flex h-full">
    <Sidebar
      class="w-auto"
      :model="sidebarItems"
      :selected="selectedFile"
      @on-item-click="selectFile"
    />
    <div class="flex flex-col p-2 w-80 bg-white border-r-2">
      <div class="flex flex-col py-2">
        <h2 class="font-bold text-xl">Translations</h2>
        <span class="text-xs font-bold"
          >Navigate through your translations to edit them.</span
        >
      </div>
      <Input placeholder="search" />
      <TreeView v-if="treeViewItems !== undefined" :model="treeViewItems" />
    </div>
    <main class="flex bg-gray-100 w-screen">
      <I18nViewer
        v-if="fileContent?.data"
        class="flex-1"
        :content="fileContent.data"
        :isJsonView="viewType === ViewTypeJson"
        @on-view-change="viewType = $event"
      ></I18nViewer>
      <aside
        v-if="notificationVisible"
        class="border-l-2 flex-1 bg-white w-96 overflow-hidden"
      >
        <header
          class="flex justify-between items-center border-b-2 mb-2 pl-2 h-12"
        >
          <span class="font-bold">Notifications</span>

          <ButtonGroup>
            <Button icon="fa-refresh" title="Refresh" @click="softAnalyze" />
          </ButtonGroup>
        </header>
        <main class="p-2 my-2">
          <NotificationItem
            v-for="notification in notifications"
            :key="notification.title"
            class="mb-1"
            :title="notification.title"
            :text="notification.text"
            :severity="notification.severity"
          />
        </main>
      </aside>
    </main>
  </section>
</template>
