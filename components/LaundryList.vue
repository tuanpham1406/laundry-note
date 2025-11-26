<template>
  <div class="cus-container">
    <div
      v-for="(item, index) in laundryItems"
      :key="`item-${index}`"
      class="flex items-center"
      @click="handleChange(item)"
    >
      <el-checkbox
        v-model="laundryValues[item.id]"
        size="large"
        :disabled="laundryValues[item.id]"
      />

      <span :class="{ 'line-through': laundryValues[item.id] }" class="cus-label">
        {{ `${item.name} (x${item.quantity})` }}
      </span>
    </div>

    <div v-if="laundryItems.length === 0">No data available</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useLocalStorage } from "~/utils/localStorage";

const storage = useLocalStorage("items");
const laundryItems = ref([]);
const laundryValues = ref({});

laundryItems.value = storage.getArray();

if (laundryItems.value) {
  laundryItems.value.forEach((item) => {
    laundryValues.value[item.id] = item.quantity === 0;
  });
}

const handleChange = (entity) => {
  laundryValues[entity.id] = true;
  storage.updateItem((item) => item.id === entity.id, {
    id: entity.id,
    name: entity.name,
    quantity: 0,
  });
  laundryItems.value = storage.getArray();
};
</script>

<style>
.line-through {
  text-decoration-line: line-through;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.cus-container {
  padding-left: 0.5rem;
}

.cus-label {
  padding-left: 0.5rem;
}
</style>
