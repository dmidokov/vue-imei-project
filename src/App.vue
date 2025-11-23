<template>
  <div id="app">
    <a-layout style="min-height: 100vh;">
      <a-layout-sider
        v-model:collapsed="collapsed"
        collapsible
        :trigger="null"
        width="250"
      >
        <div class="logo">
          <h2 v-if="!collapsed">ServiceCenter</h2>
          <h2 v-else>S</h2>
        </div>
        <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="inline"
          @click="handleMenuClick"
        >
          <a-menu-item key="1">
            <HomeOutlined />
            <span>Главная</span>
          </a-menu-item>
          <a-menu-item key="2">
            <ShoppingCartOutlined />
            <span>Прием заказа</span>
          </a-menu-item>
          <a-menu-item key="3">
            <FileTextOutlined />
            <span>Статус заказа</span>
          </a-menu-item>
          <a-menu-item key="4">
            <UserOutlined />
            <span>История клиентов</span>
          </a-menu-item>
          <a-menu-item key="5">
            <SettingOutlined />
            <span>Администрирование</span>
          </a-menu-item>
          <a-menu-item key="6">
            <QuestionCircleOutlined />
            <span>Справка</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>

      <a-layout>
        <a-layout-header class="header">
          <div class="header-content">
            <a-button
              type="text"
              @click="() => (collapsed = !collapsed)"
              style="color: white; fontSize: 18px;"
            >
              <MenuOutlined v-if="!collapsed" />
              <UnorderedListOutlined v-else />
            </a-button>
            <button
              id="theme-toggle"
              class="theme-toggle-btn"
              @click="toggleTheme"
            >
              {{ isDarkTheme ? '☀️' : '🌙' }}
            </button>
          </div>
        </a-layout-header>

        <a-layout-content class="content">
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
        </a-layout-content>

        <a-layout-footer class="footer">
          <FooterComponent />
        </a-layout-footer>
      </a-layout>
    </a-layout>

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
import {
  Form,
  Button,
  Space,
  Layout,
  Menu,
  MenuItem,
  Button as AButton
} from 'ant-design-vue';
import {
  HomeOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  UserOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  MenuOutlined,
  UnorderedListOutlined
} from '@ant-design/icons-vue';
import { h } from 'vue';
import HeaderComponent from './components/HeaderComponent.vue';
import ClientInfoSection from './components/ClientInfoSection.vue';
import DeviceInfoSection from './components/DeviceInfoSection.vue';
import IssueInfoSection from './components/IssueInfoSection.vue';
import NewClientModal from './components/NewClientModal.vue';
import TestModal from './components/TestModal.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Button.name]: Button,
    [Space.name]: Space,
    [Layout.name]: Layout,
    [Layout.Sider.name]: Layout.Sider,
    [Layout.Header.name]: Layout.Header,
    [Layout.Content.name]: Layout.Content,
    [Layout.Footer.name]: Layout.Footer,
    [Menu.name]: Menu,
    [AButton.name]: AButton,
    HomeOutlined,
    ShoppingCartOutlined,
    FileTextOutlined,
    UserOutlined,
    SettingOutlined,
    QuestionCircleOutlined,
    MenuOutlined,
    UnorderedListOutlined,
    HeaderComponent,
    ClientInfoSection,
    DeviceInfoSection,
    IssueInfoSection,
    NewClientModal,
    TestModal,
    FooterComponent
  },
  data() {
    return {
      isDarkTheme: false,
      collapsed: false,
      selectedKeys: ['1'], // Главная - по умолчанию
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
    handleMenuClick({ key }) {
      console.log('Menu item clicked:', key);
      this.selectedKeys = [key];
      // Здесь можно добавить логику переключения страниц
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
#app {
  min-height: 100vh;
}

.logo {
  height: 64px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  border-bottom: 1px solid #333;
}

.logo h2 {
  margin: 0;
  font-size: 18px;
}

.header {
  background: #45678f;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 16px;
}

.theme-toggle-btn {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.content {
  margin: 16px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
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

.footer {
  padding: 0;
  margin-top: auto;
}
</style>