<template>
  <div class="modal-overlay" id="close" @click="closeModal">
    <div class="modal">
      <slot></slot>
      <button id="close">Next Round</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

const emits = defineEmits<{
  (e: "closeModal"): void;
}>();
const props = defineProps<{ onClose: () => void }>();

function closeModal(e: Event) {
  if ((e.target as HTMLElement).id === "close") {
    props.onClose();
    emits("closeModal");
  }
}
</script>

<style lang="scss">
.modal-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;

  & .modal {
    width: 30%;
    height: auto;
    background-color: white;
  }
}
</style>
