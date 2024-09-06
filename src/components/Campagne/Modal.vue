<template>
  <div class="modal-overlay" v-if="visible">
    <div class="modal-container">
      <div class="modal-header">
        <slot name="header">
          Default Header
        </slot>
        <button class="close-button" @click="$emit('close')">&times;</button>
      </div>
      <div class="modal-body">
        <slot name="body">

        </slot>
      </div>
      <div class="modal-footer">
        <slot name="footer">
          Default Footer
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['visible'],
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 80%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.modal-body {
  margin-bottom: 20px;
}
</style>
