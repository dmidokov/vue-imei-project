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
                  @search="onClientNameInput"
                  @keydown="onClientNameKeydown"
                  @blur="onClientNameBlur"
                  :filter-option="false"
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
  created() {
    // If no clients are provided, use the default sample clients
    if (this.clients.length === 0) {
      this.sampleClients = [
        { name: "Иванов Иван Иванович", phone: "+7 (901) 123-45-67" },
        { name: "Петров Петр Петрович", phone: "+7 (902) 234-56-78" },
        { name: "Сидоров Сергей Владимирович", phone: "+7 (903) 345-67-89" },
        { name: "Козлов Алексей Михайлович", phone: "+7 (904) 456-78-90" },
        { name: "Морозов Дмитрий Андреевич", phone: "+7 (905) 567-89-01" },
        { name: "Волков Николай Степанович", phone: "+7 (906) 678-90-12" },
        { name: "Новиков Александр Сергеевич", phone: "+7 (907) 789-01-23" },
        { name: "Федоров Михаил Александрович", phone: "+7 (908) 890-12-34" },
        { name: "Медведев Андрей Викторович", phone: "+7 (909) 901-23-45" },
        { name: "Белов Артем Евгеньевич", phone: "+7 (910) 012-34-56" },
        { name: "Соколов Сергей Павлович", phone: "+7 (911) 123-45-67" },
        { name: "Лебедев Владимир Игоревич", phone: "+7 (912) 234-56-78" },
        { name: "Кузнецов Алексей Владимирович", phone: "+7 (913) 345-67-89" },
        { name: "Попов Дмитрий Николаевич", phone: "+7 (914) 456-78-90" },
        { name: "Смирнов Игорь Алексеевич", phone: "+7 (915) 567-89-01" },
        { name: "Ковалев Максим Сергеевич", phone: "+7 (916) 678-90-12" },
        { name: "Васильев Евгений Анатольевич", phone: "+7 (917) 789-01-23" },
        { name: "Зайцев Александр Михайлович", phone: "+7 (918) 890-12-34" },
        { name: "Павлов Сергей Андреевич", phone: "+7 (919) 901-23-45" },
        { name: "Максимов Дмитрий Викторович", phone: "+7 (920) 012-34-56" },
        { name: "Семенов Андрей Николаевич", phone: "+7 (921) 123-45-67" },
        { name: "Голубев Иван Олегович", phone: "+7 (922) 234-56-78" },
        { name: "Виноградов Владимир Петрович", phone: "+7 (923) 345-67-89" },
        { name: "Богданов Алексей Сергеевич", phone: "+7 (924) 456-78-90" },
        { name: "Воробьев Дмитрий Андреевич", phone: "+7 (925) 567-89-01" },
        { name: "Фролов Сергей Николаевич", phone: "+7 (926) 678-90-12" },
        { name: "Алексеев Михаил Иванович", phone: "+7 (927) 789-01-23" },
        { name: "Давыдов Евгений Викторович", phone: "+7 (928) 890-12-34" },
        { name: "Щербаков Алексей Владимирович", phone: "+7 (929) 901-23-45" },
        { name: "Кузьмин Александр Петрович", phone: "+7 (930) 012-34-56" },
        { name: "Коваленко Николай Сергеевич", phone: "+7 (931) 123-45-67" },
        { name: "Баранов Дмитрий Михайлович", phone: "+7 (932) 234-56-78" },
        { name: "Куликов Сергей Викторович", phone: "+7 (933) 345-67-89" },
        { name: "Александров Андрей Иванович", phone: "+7 (934) 456-78-90" },
        { name: "Степанов Максим Владимирович", phone: "+7 (935) 567-89-01" },
        { name: "Яковлев Иван Алексеевич", phone: "+7 (936) 678-90-12" },
        { name: "Орлов Сергей Петрович", phone: "+7 (937) 789-01-23" },
        { name: "Титов Алексей Николаевич", phone: "+7 (938) 890-12-34" },
        { name: "Крылов Виталий Игоревич", phone: "+7 (939) 901-23-45" },
        { name: "Макаров Дмитрий Валерьевич", phone: "+7 (940) 012-34-56" },
        { name: "Никитин Евгений Сергеевич", phone: "+7 (941) 123-45-67" },
        { name: "Захаров Александр Викторович", phone: "+7 (942) 234-56-78" },
        { name: "Бирюков Николай Петрович", phone: "+7 (943) 345-67-89" },
        { name: "Корнилов Дмитрий Владимирович", phone: "+7 (944) 456-78-90" },
        { name: "Герасимов Сергей Иванович", phone: "+7 (945) 567-89-01" },
        { name: "Пономарев Михаил Алексеевич", phone: "+7 (946) 678-90-12" },
        { name: "Григорьев Андрей Викторович", phone: "+7 (947) 789-01-23" },
        { name: "Лазарев Иван Сергеевич", phone: "+7 (948) 890-12-34" },
        { name: "Медведев Алексей Николаевич", phone: "+7 (949) 901-23-45" },
        { name: "Афанасьев Владимир Михайлович", phone: "+7 (950) 012-34-56" }
      ];
    } else {
      this.sampleClients = this.clients;
    }
  },
  emits: ['new-client-requested', 'client-selected', 'update:clientName'],
  data() {
    return {
      sampleClients: [],
      // showSuggestions: false,
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
        // Use sampleClients if available, otherwise use props.clients
        const clientsToSearch = this.sampleClients.length > 0 ? this.sampleClients : this.clients;

        let processedPhone = value.replace(/\D/g, '')

        this.filteredClients = clientsToSearch.filter(client => {
          const nameMatch = client.name.toLowerCase().includes(value.toLowerCase());
          const phoneMatch = processedPhone.length > 0 ? client.phone.replace(/\D/g, '').includes(value.replace(/\D/g, '')) : false;
          return nameMatch || phoneMatch
        });

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

      // Set old orders for the selected client if they have any
      // For demo purposes, we'll create some sample orders for each client
      const sampleOrders = [
        { id: `ORD-${Math.floor(100 + Math.random() * 900)}`, device: "iPhone 13", model: "Смартфон" },
        { id: `ORD-${Math.floor(100 + Math.random() * 900)}`, device: "MacBook Air", model: "Ноутбук" },
        { id: `ORD-${Math.floor(100 + Math.random() * 900)}`, device: "Samsung Galaxy", model: "Смартфон" }
      ];

      this.$emit('client-selected', { ...client, orders: sampleOrders });
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