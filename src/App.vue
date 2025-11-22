<template>
  <div id="app">
    <HeaderComponent @toggle-theme="toggleTheme" />
    <div class="container">
      <h1 class="page-title">Новый заказ</h1>

      <a-form id="orderForm" :model="formData" @finish="submitForm" layout="vertical">
        <a-row :gutter="8">
          <a-col :span="12">
            <ClientInfoSection
              v-model:clientName="formData.clientName"
              :clients="clients"
              :oldOrders="oldOrders"
              @new-client-requested="showNewClientModal = true"
            />
          </a-col>
          <a-col :span="12">
            <DeviceInfoSection
              v-model:deviceImei="formData.deviceImei"
              v-model:deviceType="formData.deviceType"
              v-model:deviceBrand="formData.deviceBrand"
              v-model:deviceModel="formData.deviceModel"
              v-model:devicePassword="formData.devicePassword"
              :imeiValidationError="imeiValidationError"
              :graphicalPassword="graphicalPassword"
              @update:graphicalPassword="updateGraphicalPassword"
            />
          </a-col>
        </a-row>
        <IssueInfoSection v-model:deviceIssue="formData.deviceIssue" />

        <a-form-item>
          <a-space>
            <a-button type="primary" html-type="submit">Сохранить заказ</a-button>
            <a-button @click="resetForm">Очистить форму</a-button>
            <a-button @click="showTestModal = true">Открыть тестовое модальное окно</a-button>
          </a-space>
        </a-form-item>

      </a-form>

    </div>

    <NewClientModal
      :isVisible="showNewClientModal"
      @close="showNewClientModal = false"
      @save="addNewClient"
    />

    <TestModal
      :isVisible="showTestModal"
      @close="showTestModal = false"
      @confirm="handleTestModalConfirm"
    />
  </div>
</template>

<script>
import { Form, Button, Space } from 'ant-design-vue';
import HeaderComponent from './components/HeaderComponent.vue';
import ClientInfoSection from './components/ClientInfoSection.vue';
import DeviceInfoSection from './components/DeviceInfoSection.vue';
import IssueInfoSection from './components/IssueInfoSection.vue';
import NewClientModal from './components/NewClientModal.vue';
import TestModal from './components/TestModal.vue';

export default {
  name: 'App',
  components: {
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Button.name]: Button,
    [Space.name]: Space,
    HeaderComponent,
    ClientInfoSection,
    DeviceInfoSection,
    IssueInfoSection,
    NewClientModal,
    TestModal
  },
  data() {
    return {
      isDarkTheme: false,
      showNewClientModal: false,
      showTestModal: false,
      formData: {
        clientName: '',
        deviceImei: '',
        deviceType: '',
        deviceBrand: '',
        deviceModel: '',
        devicePassword: '',
        deviceIssue: ''
      },
      imeiValidationError: null,
      graphicalPassword: '',
      oldOrders: [],
      clients: [
      ]
    };
  },
  methods: {
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    },
    submitForm() {
      // Form submission logic
      console.log('Form submitted:', this.formData);
      alert('Заказ успешно сохранен!');
    },
    resetForm() {
      this.formData = {
        clientName: '',
        deviceImei: '',
        deviceType: '',
        deviceBrand: '',
        deviceModel: '',
        devicePassword: '',
        deviceIssue: ''
      };
      this.imeiValidationError = null;
      this.graphicalPassword = '';
    },
    updateGraphicalPassword(password) {
      this.graphicalPassword = password;
      this.formData.devicePassword = password;
    },
    addNewClient(clientData) {
      this.clients.push(clientData);
      this.showNewClientModal = false;
    },
    handleTestModalConfirm() {
      console.log('Test modal confirmed');
    }
  },
  mounted() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' ||
        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.isDarkTheme = true;
    }
  }
};
</script>

<style>
.container {
  max-width: 1200px;
  margin: 16px auto;
  padding: 0 8px;
}

.page-title {
  text-align: left;
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: 400;
}

.form-section {
  margin-bottom: 16px;
}

.section-title {
  margin-bottom: 0px;
  font-size: 19px;
  font-weight: 700;
}
</style>