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

    <!-- Кнопки с типовыми неисправностями -->
    <div class="issue-buttons">
      <a-button
        v-for="issue in commonIssues"
        :key="issue"
        @click="addIssue(issue)"
        type="default"
        size="small"
        style="margin-right: 8px; margin-bottom: 8px;"
      >
        {{ issue }}
      </a-button>
    </div>
  </a-card>
</template>

<script>
import { Card, Form, Input, Button } from 'ant-design-vue';

export default {
  name: 'IssueInfoSection',
  components: {
    [Card.name]: Card,
    [Form.Item.name]: Form.Item,
    [Input.TextArea.name]: Input.TextArea,
    [Button.name]: Button,
  },
  props: {
    deviceIssue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:deviceIssue'],
  data() {
    return {
      commonIssues: [
        'Не включается',
        'Не заряжается',
        'Попадание влаги',
        'Падение/удар',
        'Не держит заряд',
        'Перегревается',
        'Тусклое изображение',
        'Нет изображения',
        'Нет звука',
        'Не работает сенсор',
        'Не работает кнопка',
        'Не ловит сеть',
        'Не видит SIM-карту',
        'Не заряжается до конца'
      ]
    };
  },
  computed: {
    localDeviceIssue: {
      get() {
        return this.deviceIssue;
      },
      set(value) {
        this.$emit('update:deviceIssue', value);
      }
    }
  },
  methods: {
    addIssue(issue) {
      // Проверяем, есть ли уже эта неисправность в поле
      const existingIssues = this.localDeviceIssue.toLowerCase().split(',').map(i => i.trim());
      const issueExists = existingIssues.includes(issue.toLowerCase());

      if (!issueExists) {
        // Если поле уже не пустое, добавляем запятую перед новой неисправностью
        if (this.localDeviceIssue && this.localDeviceIssue.trim() !== '') {
          this.localDeviceIssue += ', ' + issue;
        } else {
          this.localDeviceIssue = issue;
        }
      }
    }
  }
};
</script>

<style scoped>
.form-section {
  margin-bottom: 16px;
}

.issue-buttons {
  margin-top: 16px;
}
</style>