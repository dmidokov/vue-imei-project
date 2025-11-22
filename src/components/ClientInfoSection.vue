<template>
  <a-card class="form-section">
    <template #title>
      <h2 class="section-title">Информация о клиенте</h2>
    </template>
    <div class="client-info">
      <div class="client-info-container">
        <div class="client-info-left">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="flex: 0 0 300px;">
              <a-form-item label="ФИО клиента" :required="true">
                <a-auto-complete
                  v-model:value="localClientName"
                  :options="autocompleteOptions"
                  placeholder="Введите полное имя клиента"
                  @input="onClientNameInput"
                  @keydown="onClientNameKeydown"
                  @blur="onClientNameBlur"
                  style="width: 100%;"
                />
              </a-form-item>
            </div>
            <a-button
              type="primary"
              @click="$emit('new-client-requested')"
              style="margin-top:5px"
            >
              Новый клиент
            </a-button>
          </div>
        </div>
        <div v-if="oldOrders.length > 0" class="client-info-right">
          <h4 style="margin-top: 0; margin-bottom: 16px; font-weight: 700;">Старые заказы:</h4>
          <div id="oldOrdersList">
            <div v-for="order in oldOrders" :key="order.id" style="padding: 8px 0; border-bottom: 1px solid #e1e5e9;">
              <div><strong>{{ order.id }}</strong></div>
              <div style="font-size: 13px; color: #666;">{{ order.model }}</div>
              <div style="font-size: 12px; color: #888;">{{ order.device }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script>
import { Card, Form, AutoComplete, Button } from 'ant-design-vue';

export default {
  name: 'ClientInfoSection',
  components: {
    [Card.name]: Card,
    [Form.Item.name]: Form.Item,
    [AutoComplete.name]: AutoComplete,
    [Button.name]: Button,
  },
  props: {
    clientName: {
      type: String,
      default: ''
    },
    clients: {
      type: Array,
      default: () => []
    },
    oldOrders: {
      type: Array,
      default: () => []
    }
  },
  emits: ['new-client-requested', 'client-selected', 'update:clientName'],
  data() {
    return {
      showSuggestions: false,
      filteredClients: [],
      activeSuggestionIndex: -1,
      currentIndex: -1
    };
  },
  computed: {
    autocompleteOptions() {
      return this.filteredClients.map(client => ({
        label: `${client.name} (${client.phone})`,
        value: client.name
      }));
    },
    localClientName: {
      get() {
        return this.clientName;
      },
      set(value) {
        this.$emit('update:clientName', value);
      }
    }
  },
  methods: {
    onClientNameInput(value) {
      this.showSuggestions = value.trim() !== '';

      if (value.trim()) {
        this.filteredClients = this.clients.filter(client =>
          client.name.toLowerCase().includes(value.toLowerCase()) ||
          client.phone.includes(value.replace(/\D/g, ''))
        );
      } else {
        this.filteredClients = [];
      }

      this.activeSuggestionIndex = -1;
    },

    onClientNameKeydown(event) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        this.activeSuggestionIndex = Math.min(this.activeSuggestionIndex + 1, this.filteredClients.length - 1);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        this.activeSuggestionIndex = Math.max(this.activeSuggestionIndex - 1, -1);
      } else if (event.key === 'Enter') {
        event.preventDefault();
        if (this.activeSuggestionIndex >= 0) {
          this.selectClient(this.filteredClients[this.activeSuggestionIndex]);
        }
      } else if (event.key === 'Escape') {
        this.showSuggestions = false;
        this.activeSuggestionIndex = -1;
      }
    },

    onClientNameBlur() {
      // Add a delay to allow for click events on suggestions
      setTimeout(() => {
        this.showSuggestions = false;
        this.activeSuggestionIndex = -1;
      }, 150);
    },

    selectClient(client) {
      this.localClientName = client.name;
      this.showSuggestions = false;
      this.activeSuggestionIndex = -1;
      this.$emit('client-selected', client);
    }
  }
};
</script>

<style scoped>
.client-info-container {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.client-info-left {
  flex: 1;
  min-width: 0;
}

.client-info-right {
  flex: 0 0 300px;
  background-color: #f0f2f5;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  padding: 16px;
}

.order-item {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.order-item:last-child {
  border-bottom: none;
}
</style>