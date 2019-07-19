<template>
  <div>
    <a-form :layout="formLayout" :form="form" @submit="handleSubmit">
     
      <a-form-item
        label="博客名称"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input 
         v-decorator="[
          'title',
          {rules: [{ required: true, message: '请输入博客名称!' }]}
        ]"
        placeholder="请输入博客名称" />
      </a-form-item>
      <a-form-item
        label="博客副标题"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input 
        v-decorator="[
          'subtitle',
          {rules: [{ required: true, message: '请输入博客副标题!' }]}
        ]"
        placeholder="请输入博客副标题" />
      </a-form-item>
      <a-form-item
        label="一句话介绍"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-textarea 
        v-decorator="[
          'description',
          {rules: [{ required: false}]}
        ]"
        placeholder="请输入博客介绍" autosize/>
        
      </a-form-item>
      <a-form-item
        label="GitHub账户名"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input 
        v-decorator="[
          'account',
          {rules: [{ required: true, message:'请输入GitHub账户名'}]}
        ]"
        placeholder="请输入GitHub账户名" />
      </a-form-item>
      <a-form-item
        :wrapper-col="buttonItemLayout.wrapperCol"
      >
        <a-button type="primary"  html-type="submit">
          创建博客
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
// const { runCommandCreateBlog } = require('../../../script/commands-executor').default;
const { init } = require('../../../tools/init').default;

export default {
  data() {
    return {
      formLayout: 'horizontal',
      title: 'hexo',
      subtitle: '',
      description: '',
      account: '',
      form: this.$form.createForm(this),
    };
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === 'horizontal' ? {
        labelCol: { span: 8 },
        wrapperCol: { span: 10 },
      } : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === 'horizontal' ? {
        wrapperCol: { span: 10, offset: 8 },
      } : {};
    },
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          const callback = (error, data) => {
            if (!error) {
              this.$emit('change', false);
              this.$message.info(`创建成功${data}`);
            }
          };
          init(values, callback);
        }
      });
    },

  },
};
</script>