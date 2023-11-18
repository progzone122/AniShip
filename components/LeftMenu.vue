<template>
  <div class="flex flex-col gap-2">
    <div class="leftMenu bgColor1 w-[100%] flex flex-col items-center pt-4 pb-4">
      <div class="avatar online cursor-pointer">
        <div class="w-11 h-11 rounded-full">
          <img src="../assets/858935.jpg" />
        </div>
      </div>
    </div>
    <div class="leftMenu w-[100%] flex flex-col items-center pt-6 pb-6 gap-6">
      <Icon class="cursor-pointer" name="material-symbols:search" color="white" size="24px" @click="showSearch()" />
      <div v-for="item in menu">
        <Icon class="cursor-pointer" :name="item.icon" color="white" size="24px" @click="navigateTo({ path: item.link })" />
      </div>
    </div>
  </div>
</template>
<script setup>
const menu = [
  {
    icon: "heroicons-solid:home",
    link: "/"
  },
  // {
  //   icon: "heroicons-solid:collection",
  //   link: "/collection"
  // },
  {
    icon: "heroicons-solid:cog-6-tooth",
    link: "settings"
  }
];
//
const showSearch = () => {
  document.querySelector('#searchAnimesModal').showModal();
}
</script>