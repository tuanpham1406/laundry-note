<template>
  <div class="p-4">
    <el-form ref="formRef" :model="form" @submit.prevent="addItem">
      <el-form-item>
        <el-input v-model="form.name" placeholder="Nhập Tên" size="large" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addItem">Thêm</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useLocalStorage } from "~/utils/localStorage";

const emit = defineEmits(["item-added"]);

const form = ref({
  name: "",
});
const formRef = ref(null);
const storage = useLocalStorage("items");

const addItem = async () => {
  if (form.value.name.trim() === "") return;
  const now = new Date().getTime();
  storage.addItem({ id: now, name: form.value.name, quantity: 1 });
  form.value.name = "";
  emit("item-added");
};
</script>

<style scoped>
@media (max-width: 640px) {
  .el-form {
    font-size: 12px;
  }
}
</style>
