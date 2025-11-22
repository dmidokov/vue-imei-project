<template>
  <a-modal
    v-model:open="modalVisible"
    title="Тестовое модальное окно"
    @cancel="closeModal"
    @ok="confirmAction"
  >
    <p>Это тестовое модальное окно для проверки работы стека модальных окон.</p>
    <p>Открытых модальных окон: {{ stackSize }}</p>
  </a-modal>
</template>

<script>
import { Modal } from 'ant-design-vue';
import modalStackManager from '@/utils/ModalStackManager';

export default {
  name: 'TestModal',
  components: {
    [Modal.name]: Modal,
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'confirm'],
  data() {
    return {
      modalId: `test-modal-${Date.now()}-${Math.floor(Math.random() * 10000)}`
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
    },
    stackSize() {
      return modalStackManager.getStackSize();
    }
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        // При открытии модального окна добавляем его в стек
        modalStackManager.addModal(this.modalId, this.closeModal);
      } else {
        // При закрытии модального окна удаляем его из стека
        modalStackManager.removeModal(this.modalId);
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    confirmAction() {
      this.$emit('confirm');
      this.closeModal();
    }
  }
};
</script>