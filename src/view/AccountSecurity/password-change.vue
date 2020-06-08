<template>
  <i-form :model="formTop" label-position="top">
    <Form-item label="新密码">
      <i-input :value.sync="formTop.input1"></i-input>
    </Form-item>
    <Form-item label="旧密码">
      <i-input :value.sync="formTop.input2"></i-input>
    </Form-item>
    <Form-item label="旧密码">
      <i-input :value.sync="formTop.input2"></i-input>
    </Form-item>
  </i-form>
</template>
<script>
export default {
  data() {
    return {
      formTop: {
        input1: "",
        input2: "",
        input3: ""
      }
    };
  }
};
</script>
