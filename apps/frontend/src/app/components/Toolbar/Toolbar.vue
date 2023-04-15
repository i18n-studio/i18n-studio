<script setup lang="ts">
interface IToolbar {
  notificationCount?: number;
  isDisabled?: boolean;
}

defineProps<IToolbar>();
defineEmits(['on-notification-refresh-click', 'on-notification-click']);
</script>

<template>
  <section class="flex items-center justify-between border-b-2">
    <ButtonGroup>
      <Button
        class="border-r-2"
        icon="fa-add"
        title="add translation"
        :isDisabled="isDisabled"
      />
      <Button
        class="border-r-2"
        icon="fa-spell-check"
        title="analyze files"
        :isDisabled="isDisabled"
      />
      <Button icon="fa-undo" title="undo" :isDisabled="isDisabled" />
      <Button
        class="border-r-2"
        icon="fa-redo"
        title="redo"
        :isDisabled="isDisabled"
      />
    </ButtonGroup>
    <ButtonGroup class="border-l-2">
      <Button
        icon="fa-bell"
        title="toggle notifications"
        :bageVisible="notificationCount > 0"
        :badgeText="notificationCount"
        :isDisabled="isDisabled"
        @on-click="$emit('on-notification-click')"
      />
    </ButtonGroup>
  </section>
</template>
