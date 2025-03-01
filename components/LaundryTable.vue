<template>
  <div class="p-4">
    <el-table
      :data="laundryItems"
      border
      style="width: 100%"
      class="responsive-table"
    >
      <el-table-column prop="name" label="Đồ giặt" />
      <el-table-column prop="quantity" label="Số lượng" sortable>
        <template #default="scope">
          <el-input-number
            v-model="scope.row.quantity"
            :min="0"
            size="small"
            @change="onQuantityChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column width="60">
        <template #default="scope">
          <el-button
            type="danger"
            text
            size="small"
            :icon="Delete"
            @click="deleteItem(scope.row.id)"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { Delete } from '@element-plus/icons-vue'

const laundryItems = ref([]);

const fetchLaundryItems = async () => {
  const { data } = await axios.get("/api/laundry");
  laundryItems.value = data;
};

onMounted(() => {
  fetchLaundryItems();
  window.addEventListener("laundry-updated", fetchLaundryItems);
});

const onQuantityChange = async (item) => {
  await axios.put("/api/laundry", { id: item.id, quantity: item.quantity });
};

const deleteItem = async (id) => {
  await axios.delete("/api/laundry", { params: { id } });
  fetchLaundryItems();
};
</script>

<style scoped>
@media (max-width: 640px) {
  .responsive-table {
    font-size: 12px;
  }
}
</style>
