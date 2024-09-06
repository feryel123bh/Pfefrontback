<template>
  <div v-if="visible" :style="{ top: position.y + 'px', left: position.x + 'px' }" class="context-menu">
    <ul>
      <li @click="$emit('edit')">Éditer</li>
      <li @click="$emit('delete')">Supprimer</li>
      <li @click="$emit('lock')">Verrouiller</li>
      <li @click="$emit('duplicate')">Dupliquer</li>
      <li>
        Type
        <ul>
          <li @click="$emit('change-type', 'event')">Événement</li>
          <li @click="$emit('change-type', 'task')">Tâche</li>
          <li @click="$emit('change-type', 'reminder')">Rappel</li>
          <li @click="$emit('change-type', 'holiday')">Vacances</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    position: {
      type: Object,
      default: () => ({ x: 0, y: 0 }),
    },
  },
};
</script>

<style scoped>
.context-menu {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.context-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.context-menu ul li {
  padding: 8px 12px;
  cursor: pointer;
}

.context-menu ul li:hover {
  background-color: #f0f0f0;
}

.context-menu ul ul {
  display: none;
  position: absolute;
  left: 100%;
  top: 0;
  margin-left: 1px;
}

.context-menu ul li:hover > ul {
  display: block;
}
</style>
