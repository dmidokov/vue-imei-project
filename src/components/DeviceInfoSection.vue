<template>
  <a-card class="form-section">
    <template #title>
      <h2 class="section-title">Информация об устройстве</h2>
    </template>
    <div class="device-info">
      <a-row :gutter="16">
        <a-col :span="6">
          <a-form-item label="IMEI устройства" :required="true">
            <a-input
              v-model:value="localDeviceImei"
              placeholder="Введите 15-значный IMEI"
              :maxlength="15"
              @change="validateAndFormatImei"
              :status="imeiValidation"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="Тип устройства">
            <a-input
              v-model:value="localDeviceType"
              placeholder="Тип устройства"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="6">
          <a-form-item label="Марка" :required="true">
            <a-input
              v-model:value="localDeviceBrand"
              placeholder="Марка устройства"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="Модель" :required="true">
            <a-input
              v-model:value="localDeviceModel"
              placeholder="Модель устройства"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="6">
          <a-form-item label="Пароль">
            <div style="display: flex; gap: 8px; align-items: center;">
              <a-input
                v-model:value="localDevicePassword"
                placeholder="Пароль устройства"

              />
              <a-button
                type="default"
                @click="toggleGraphicalKey"
                style="width: 34px; height: 32px; padding: 0; display: flex; align-items: center; justify-content: center;"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="#000" stroke-width="2"/>
                  <circle cx="8" cy="8" r="1.5" fill="#000"/>
                  <circle cx="12" cy="8" r="1.5" fill="#000"/>
                  <circle cx="16" cy="8" r="1.5" fill="#000"/>
                  <circle cx="8" cy="12" r="1.5" fill="#000"/>
                  <circle cx="12" cy="12" r="1.5" fill="#000"/>
                  <circle cx="16" cy="12" r="1.5" fill="#000"/>
                  <circle cx="8" cy="16" r="1.5" fill="#000"/>
                  <circle cx="12" cy="16" r="1.5" fill="#000"/>
                  <circle cx="16" cy="16" r="1.5" fill="#000"/>
                </svg>
              </a-button>
            </div>
          </a-form-item>
      </a-col>
    </a-row>

      <a-form-item v-if="showGraphicalKey" label="Графический ключ (3x3)">
        <GraphicalKeyPad
          @password-update="updateGraphicalPassword"
          :is-dark-theme="isDarkTheme"
        />
      </a-form-item>
    </div>
  </a-card>
</template>

<script>
import { Card, Form, Input, Button, Row, Col } from 'ant-design-vue';
import GraphicalKeyPad from './GraphicalKeyPad.vue';

export default {
  name: 'DeviceInfoSection',
  components: {
    [Card.name]: Card,
    [Form.Item.name]: Form.Item,
    [Input.name]: Input,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    GraphicalKeyPad
  },
  props: {
    deviceImei: {
      type: String,
      default: ''
    },
    deviceType: {
      type: String,
      default: ''
    },
    deviceBrand: {
      type: String,
      default: ''
    },
    deviceModel: {
      type: String,
      default: ''
    },
    devicePassword: {
      type: String,
      default: ''
    },
    imeiValidationError: {
      type: String,
      default: null
    },
    graphicalPassword: {
      type: String,
      default: ''
    },
    isDarkTheme: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'update:deviceImei', 
    'update:deviceType', 
    'update:deviceBrand', 
    'update:deviceModel', 
    'update:devicePassword',
    'update:graphicalPassword'
  ],
  data() {
    return {
      showGraphicalKey: false,
      imeiValidation: null
    };
  },
  computed: {
    localDeviceImei: {
      get() {
        return this.deviceImei;
      },
      set(value) {
        this.$emit('update:deviceImei', value);
      }
    },
    localDeviceType: {
      get() {
        return this.deviceType;
      },
      set(value) {
        this.$emit('update:deviceType', value);
      }
    },
    localDeviceBrand: {
      get() {
        return this.deviceBrand;
      },
      set(value) {
        this.$emit('update:deviceBrand', value);
      }
    },
    localDeviceModel: {
      get() {
        return this.deviceModel;
      },
      set(value) {
        this.$emit('update:deviceModel', value);
      }
    },
    localDevicePassword: {
      get() {
        return this.devicePassword;
      },
      set(value) {
        this.$emit('update:devicePassword', value);
      }
    }
  },
  methods: {
    validateAndFormatImei(event) {
      let value = event.target.value.replace(/\D/g, '');
      if (value.length > 15) {
        value = value.substring(0, 15);
      }
      this.localDeviceImei = value;
      
      // Validate IMEI using Luhn algorithm
      if (value.length === 15) {
        if (this.validateIMEI(value)) {
          this.imeiValidation = 'success';
          this.$emit('imei-validation', { valid: true, error: null });
        } else {
          this.imeiValidation = 'error';
          this.$emit('imei-validation', { valid: false, error: 'Некорректный IMEI' });
        }
      } else {
        this.imeiValidation = null;
        if (value.length === 0) {
          this.$emit('imei-validation', { valid: null, error: null });
        }
      }
    },
    
    validateIMEI(imei) {
      // Remove any non-digit characters
      imei = imei.replace(/\D/g, '');
      
      // Check if length is 15
      if (imei.length !== 15) {
        return false;
      }
      
      // Luhn algorithm implementation
      let sum = 0;
      let isDouble = false;
      
      // Process digits from right to left
      for (let i = imei.length - 1; i >= 0; i--) {
        let digit = parseInt(imei.charAt(i));
        
        if (isDouble) {
          digit *= 2;
          if (digit > 9) {
            digit = digit - 9;
          }
        }
        
        sum += digit;
        isDouble = !isDouble;
      }
      
      // Valid if sum is divisible by 10
      return sum % 10 === 0;
    },
    
    toggleGraphicalKey() {
      this.showGraphicalKey = !this.showGraphicalKey;
    },
    
    updateGraphicalPassword(password) {
      this.localDevicePassword = password;
      this.$emit('update:graphicalPassword', password);
    }
  }
};
</script>

<style scoped>
.form-section {
  margin-bottom: 16px;
}
</style>