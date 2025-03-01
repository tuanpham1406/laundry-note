<template>
  <div class="p-4">
    <el-form ref="formRef" :model="form">
      <el-form-item>
        <el-input v-model="form.name" placeholder="Nhập tên đồ giặt" size="large" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addItem">Thêm</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const form = ref({
  name: "",
});

const formRef = ref(null);

const addItem = async () => {
  if (form.value.name.trim() === "") return;
  await axios.post("/api/laundry", { name: form.value.name });
  form.value.name = "";
  window.dispatchEvent(new Event("laundry-updated"));
};
</script>

<style scoped>
@media (max-width: 640px) {
  .el-form {
    font-size: 12px;
  }
}
</style>
