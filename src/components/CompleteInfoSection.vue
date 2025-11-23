<template>
  <a-card class="form-section">
    <template #title>
      <h2 class="section-title">Комплектация</h2>
    </template>
    <a-form-item label="Комплектация" :required="false">
      <a-textarea
        v-model:value="localCompleteInfo"
        placeholder="Перечислите комплектацию устройства"
        :rows="4"
      />
    </a-form-item>
    
    <!-- Кнопки с типовой комплектацией -->
    <div class="complete-buttons">
      <a-button
        v-for="complete in commonCompletes"
        :key="complete"
        @click="addComplete(complete)"
        type="default"
        size="small"
        style="margin-right: 8px; margin-bottom: 8px;"
      >
        {{ complete }}
      </a-button>
    </div>
  </a-card>
</template>

<script>
import { Card, Form, Input, Button } from 'ant-design-vue';

export default {
  name: 'CompleteInfoSection',
  components: {
    [Card.name]: Card,
    [Form.Item.name]: Form.Item,
    [Input.TextArea.name]: Input.TextArea,
    [Button.name]: Button,
  },
  props: {
    completeInfo: {
      type: String,
      default: ''
    }
  },
  emits: ['update:completeInfo'],
  data() {
    return {
      commonCompletes: [
        'Зарядное устройство',
        'Кабель',
        'Наушники',
        'Чехол',
        'Пленка/стекло',
        'Документы',
        'Коробка',
        'Инструкция',
        'Карта памяти',
        'Чек',
        'Гарантийный талон',
        'Джойстик',
        'Клавиатура',
        'Мышь',
        'Коврик',
        'Флешка'
      ]
    };
  },
  computed: {
    localCompleteInfo: {
      get() {
        return this.completeInfo;
      },
      set(value) {
        this.$emit('update:completeInfo', value);
      }
    }
  },
  methods: {
    addComplete(complete) {
      // Проверяем, есть ли уже эта комплектация в поле
      const existingCompletes = this.localCompleteInfo.toLowerCase().split(',').map(i => i.trim());
      const completeExists = existingCompletes.includes(complete.toLowerCase());
      
      if (!completeExists) {
        // Если поле уже не пустое, добавляем запятую перед новой комплектацией
        if (this.localCompleteInfo && this.localCompleteInfo.trim() !== '') {
          this.localCompleteInfo += ', ' + complete;
        } else {
          this.localCompleteInfo = complete;
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

.complete-buttons {
  margin-top: 16px;
}
</style>