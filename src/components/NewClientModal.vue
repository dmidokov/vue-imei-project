<template>
  <a-modal
    v-model:open="modalVisible"
    title="Новый клиент"
    @cancel="closeModal"
    @ok="saveNewClient"
  >
    <a-form :model="newClient" layout="vertical">
      <a-form-item label="ФИО клиента *" :required="true">
        <a-input v-model:value="newClient.name" placeholder="Введите полное имя клиента" />
      </a-form-item>
      <a-form-item label="Номер телефона *" :required="true">
        <a-input v-model:value="newClient.phone" placeholder="+7 (999) 123-45-67" />
      </a-form-item>
      <a-form-item>
        <a-checkbox v-model:checked="newClient.favorite">Избранный клиент</a-checkbox>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { Modal, Form, Input, Checkbox } from 'ant-design-vue';

export default {
  name: 'NewClientModal',
  components: {
    [Modal.name]: Modal,
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Input.name]: Input,
    [Checkbox.name]: Checkbox,
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'save'],
  data() {
    return {
      newClient: {
        name: '',
        phone: '',
        favorite: false
      }
    };
  },
  computed: {
    modalVisible: {
      get() {
        return this.isVisible;
      },
      set(value) {
        if (!value) {
          this.$emit('close');
        }
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
      this.resetForm();
    },
    async saveNewClient() {
      if (!this.newClient.name || !this.newClient.phone) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
      }

      this.$emit('save', { ...this.newClient });
      this.resetForm();
      this.$emit('close'); // Close the modal after saving
    },
    resetForm() {
      this.newClient = {
        name: '',
        phone: '',
        favorite: false
      };
    }
  }
};
</script>