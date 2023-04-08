<script setup lang="ts">
</script>

<template>
  <section class="flex items-center justify-between border-b-2">
    <ButtonGroup>
      <Button class="border-r-2" icon="fa-add" title="add translation" />
      <Button
        class="border-r-2"
        icon="fa-file-circle-check"
        title="analyze files"
      />
      <Button class="border-r-2" icon="fa-undo" title="undo" />
      <Button class="border-r-2" icon="fa-redo" title="redo" />
    </ButtonGroup>
    <ButtonGroup class="border-l-2">
      <Button icon="fa-circle-exclamation" title="analyzer" />
    </ButtonGroup>
  </section>
</template>
