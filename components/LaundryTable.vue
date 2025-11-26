<template>
  <div class="p-4">
    <div>
      <el-checkbox v-model="isDisabledSL">Khóa SL</el-checkbox>
      <el-checkbox v-model="isDisabledDelete">Khóa xóa</el-checkbox>
    </div>
    <el-table
      :data="laundryItems"
      :default-sort="defaultSort"
      border
      style="width: 100%"
      class="responsive-table"
      @sort-change="handleSortChange"
    >
      <el-table-column prop="name" label="Đồ giặt" />
      <el-table-column prop="quantity" label="Số lượng" sortable>
        <template #default="scope">
          <el-input-number
            v-model="scope.row.quantity"
            :min="0"
            size="small"
            :disabled="isDisabledSL"
            @change="onQuantityChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column width="60">
        <template #default="scope">
          <el-button
            type="danger"
            link
            size="small"
            :disabled="isDisabledDelete"
            @click="deleteItem(scope.row.id)"
          >
            Xóa
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useLocalStorage } from "~/utils/localStorage";

const storage = useLocalStorage("items");
const tableRef = ref(null);
const laundryItems = ref([]);
const isDisabledSL = ref(false);
const isDisabledDelete = ref(false);
const defaultSort = ref({ prop: "", order: "" });

const fetchLaundryItems = async () => {
  laundryItems.value = storage.getArray();
};

onMounted(() => {
  const storedSort = localStorage.getItem("laundrySort");
  if (storedSort) {
    try {
      const sortObj = JSON.parse(storedSort);
      defaultSort.value = sortObj;
      if (tableRef.value) {
        tableRef.value.sort(sortObj);
      }
    } catch (e) {
      console.error("Error parsing stored sort:", e);
    }
  }
  fetchLaundryItems();
});

const onQuantityChange = async (item) => {
  storage.updateItem((item) => item.id === item.id, {
    id: item.id,
    name: item.name,
    quantity: item.quantity,
  });
};

const deleteItem = async (id) => {
  storage.removeItem((item) => item.id === id);
  fetchLaundryItems();
};

const handleSortChange = (sort) => {
  localStorage.setItem("laundrySort", JSON.stringify(sort));
};

defineExpose({
  refresh: fetchLaundryItems,
});
</script>

<style scoped>
@media (max-width: 640px) {
  .responsive-table {
    font-size: 12px;
  }
}
</style>
