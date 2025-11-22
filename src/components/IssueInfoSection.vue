<template>
  <a-card class="form-section">
    <template #title>
      <h2 class="section-title">Описание неисправности</h2>
    </template>
    <a-form-item label="Что сломалось" :required="true">
      <a-textarea
        v-model:value="localDeviceIssue"
        placeholder="Опишите неисправность устройства"
        :rows="4"
      />
    </a-form-item>
  </a-card>
</template>

<script>
import { Card, Form, Input } from 'ant-design-vue';

export default {
  name: 'IssueInfoSection',
  components: {
    [Card.name]: Card,
    [Form.Item.name]: Form.Item,
    [Input.TextArea.name]: Input.TextArea,
  },
  props: {
    deviceIssue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:deviceIssue'],
  computed: {
    localDeviceIssue: {
      get() {
        return this.deviceIssue;
      },
      set(value) {
        this.$emit('update:deviceIssue', value);
      }
    }
  }
};
</script>

<style scoped>
.form-section {
  margin-bottom: 16px;
}
</style>