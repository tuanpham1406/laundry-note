<template>
  <div class="container mx-auto p-4">
    <AddLaundry @item-added="handleReload" />
    <LaundryTable ref="laundryTable" />
  </div>
</template>

<script setup>
import AddLaundry from "~/components/AddLaundry.vue";
import LaundryTable from "~/components/LaundryTable.vue";

const laundryTable = ref(null);

const handleReload = () => {
  if (laundryTable.value) {
    laundryTable.value.refresh();
  }
}
</script>
