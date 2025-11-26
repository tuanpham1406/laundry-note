<template>
  <div class="container mx-auto p-4">
    <AddLaundry @item-added="handleReload" />

    <el-radio-group v-model="tab" style="margin-bottom: 30px">
      <el-radio-button value="list">
        <el-icon><List /></el-icon>
      </el-radio-button>
      <el-radio-button value="checked">
        <el-icon><Checked /></el-icon>
      </el-radio-button>
    </el-radio-group>

    <LaundryTable v-show="tab == 'list'" ref="laundryTable" />

    <LaundryList v-if="tab == 'checked'" />
  </div>
</template>

<script setup>
import AddLaundry from "~/components/AddLaundry.vue";
import LaundryTable from "~/components/LaundryTable.vue";
import LaundryList from "~/components/LaundryList.vue";

import { List, Checked } from "@element-plus/icons-vue";

const laundryTable = ref(null);
const tab = ref("list");

const handleReload = () => {
  if (laundryTable.value) {
    laundryTable.value.refresh();
  }
};
</script>
