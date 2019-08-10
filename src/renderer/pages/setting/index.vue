<template>
    <div>
        setting
    </div>
</template>
<script>
export default {
  name: 'SettingPage',
  created() {
    const { content } = this.$route.params;
    console.log(content);
  },
};
</script>