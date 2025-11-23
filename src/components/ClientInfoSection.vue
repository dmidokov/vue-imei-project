<template>
  <a-card class="form-section" style="height: calc(100% - 16px)">
    <template #title>
      <h2 class="section-title">Информация о клиенте</h2>
    </template>
    <div class="client-info" >
      <a-row :gutter="[0, 0]">
        <a-col :span="24">
          <a-row :gutter="[16, 0]">
            <a-col :flex="1">
              <a-form-item label="ФИО клиента" :required="true">
                <a-auto-complete
                  v-model:value="localClientName"
                  :options="autocompleteOptions"
                  placeholder="Введите полное имя клиента"
                  @search="onClientNameInput"
                  @select="onClientSelected"
                  @keydown="onClientNameKeydown"
                  @blur="onClientNameBlur"
                  :filter-option="false"
                  style="width: 100%;"
                />
              </a-form-item>
            </a-col>
            <a-col :flex="'80px'">
              <a-button
                type="primary"
                @click="$emit('new-client-requested')"
                style="margin-top: 30px; width: 100%;"
              >
                Новый клиент
              </a-button>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="24">
          <!-- Отображение старых заказов под информацией о клиенте -->
          <div class="old-orders-container">
            <h4 style="margin-top: 0px; margin-bottom: 4px; font-weight: 700;">Старые заказы:</h4>
            <div v-if="oldOrders.length > 0" id="oldOrdersList">
              <div v-for="order in oldOrders" :key="order.id"
                   @click="onOrderClick(order)"
                   style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #e1e5e9; cursor: pointer;"
                   :style="{ backgroundColor: selectedOrderId === order.id ? '#e6f7ff' : 'transparent' }">
                <div style="flex: 0 0 80px;"><strong>{{ order.id }}</strong></div>
                <div style="flex: 1; padding: 0 10px; font-size: 13px; color: #666;">{{ order.model }}</div>
                <div style="flex: 1; padding: 0 10px; font-size: 12px; color: #888;">{{ order.device }}</div>
                <div v-if="order.date" style="flex: 0 0 100px; font-size: 11px; color: #aaa;">{{ formatDate(order.date) }}</div>
              </div>
            </div>
            <div v-else style="color: #999; font-style: italic; padding: 8px 0;">
              Нет предыдущих заказов
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </a-card>
</template>

<script>
import { Card, Form, AutoComplete, Button, Row, Col } from 'ant-design-vue';

export default {
  name: 'ClientInfoSection',
  components: {
    [Card.name]: Card,
    [Form.Item.name]: Form.Item,
    [AutoComplete.name]: AutoComplete,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
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
        {
          name: "Иванов Иван Иванович",
          phone: "+7 (901) 123-45-67",
          orders: [
            { id: "ORD-101", device: "iPhone 12", model: "Смартфон", date: "2023-10-15" },
            { id: "ORD-205", device: "MacBook Pro", model: "Ноутбук", date: "2023-11-20" },
            { id: "ORD-312", device: "iPad Air", model: "Планшет", date: "2024-01-08" }
          ]
        },
        {
          name: "Петров Петр Петрович",
          phone: "+7 (902) 234-56-78",
          orders: [
            { id: "ORD-123", device: "Samsung Galaxy S21", model: "Смартфон", date: "2023-09-10" },
            { id: "ORD-234", device: "Dell XPS", model: "Ноутбук", date: "2023-12-05" }
          ]
        },
        {
          name: "Сидоров Сергей Владимирович",
          phone: "+7 (903) 345-67-89",
          orders: [
            { id: "ORD-111", device: "iPhone 11", model: "Смартфон", date: "2023-08-22" },
            { id: "ORD-222", device: "HP Pavilion", model: "Ноутбук", date: "2023-11-30" },
            { id: "ORD-333", device: "AirPods Pro", model: "Наушники", date: "2024-02-14" }
          ]
        },
        {
          name: "Козлов Алексей Михайлович",
          phone: "+7 (904) 456-78-90",
          orders: [
          { id: "ORD-145", device: "Xiaomi Redmi", model: "Смартфон", date: "2023-07-18" },
          { id: "ORD-146", device: "Xiaomi Redmi", model: "Смартфон", date: "2023-07-18" },
          { id: "ORD-147", device: "Xiaomi Redmi", model: "Смартфон", date: "2023-07-18" },
          { id: "ORD-148", device: "Xiaomi Redmi", model: "Смартфон", date: "2023-07-18" },
          { id: "ORD-149", device: "Xiaomi Redmi", model: "Смартфон", date: "2023-07-18" },
          { id: "ORD-140", device: "Xiaomi Redmi", model: "Смартфон", date: "2023-07-18" },
          { id: "ORD-167", device: "Xiaomi Redmi", model: "Смартфон", date: "2023-07-18" },
          { id: "ORD-256", device: "Lenovo ThinkPad", model: "Ноутбук", date: "2023-10-25" }
          ]
        },
        {
          name: "Морозов Дмитрий Андреевич",
          phone: "+7 (905) 567-89-01",
          orders: [
            { id: "ORD-167", device: "iPhone 13 Pro", model: "Смартфон", date: "2023-12-12" },
            { id: "ORD-278", device: "MacBook Air M2", model: "Ноутбук", date: "2024-01-18" },
            { id: "ORD-389", device: "Apple Watch", model: "Смарт-часы", date: "2024-03-05" }
          ]
        },
        {
          name: "Волков Николай Степанович",
          phone: "+7 (906) 678-90-12",
          orders: [
            { id: "ORD-189", device: "OnePlus 9", model: "Смартфон", date: "2023-06-30" },
            { id: "ORD-290", device: "Asus ZenBook", model: "Ноутбук", date: "2023-09-15" }
          ]
        },
        {
          name: "Новиков Александр Сергеевич",
          phone: "+7 (907) 789-01-23",
          orders: [
            { id: "ORD-102", device: "Google Pixel 6", model: "Смартфон", date: "2023-11-08" },
            { id: "ORD-203", device: "Surface Pro", model: "Планшет", date: "2024-01-22" },
            { id: "ORD-304", device: "iPad Pro", model: "Планшет", date: "2024-02-28" }
          ]
        },
        {
          name: "Федоров Михаил Александрович",
          phone: "+7 (908) 890-12-34",
          orders: [
            { id: "ORD-114", device: "Huawei P40", model: "Смартфон", date: "2023-10-01" },
            { id: "ORD-225", device: "MacBook Pro M1", model: "Ноутбук", date: "2023-12-10" }
          ]
        },
        {
          name: "Медведев Андрей Викторович",
          phone: "+7 (909) 901-23-45",
          orders: [
            { id: "ORD-126", device: "iPhone SE", model: "Смартфон", date: "2023-09-05" },
            { id: "ORD-237", device: "Dell Inspiron", model: "Ноутбук", date: "2023-11-25" },
            { id: "ORD-348", device: "AirPods", model: "Наушники", date: "2024-01-30" }
          ]
        },
        {
          name: "Белов Артем Евгеньевич",
          phone: "+7 (910) 012-34-56",
          orders: [
            { id: "ORD-138", device: "Samsung Galaxy S20", model: "Смартфон", date: "2023-08-15" },
            { id: "ORD-249", device: "Sony Vaio", model: "Ноутбук", date: "2023-10-30" }
          ]
        },
        {
          name: "Соколов Сергей Павлович",
          phone: "+7 (911) 123-45-67",
          orders: [
            { id: "ORD-150", device: "iPhone 12 Pro", model: "Смартфон", date: "2023-12-01" },
            { id: "ORD-261", device: "MacBook Air", model: "Ноутбук", date: "2024-01-15" },
            { id: "ORD-372", device: "Apple Watch", model: "Смарт-часы", date: "2024-03-10" }
          ]
        },
        {
          name: "Лебедев Владимир Игоревич",
          phone: "+7 (912) 234-56-78",
          orders: [
            { id: "ORD-162", device: "Xiaomi Mi 11", model: "Смартфон", date: "2023-07-28" },
            { id: "ORD-273", device: "HP EliteBook", model: "Ноутбук", date: "2023-11-10" }
          ]
        },
        {
          name: "Кузнецов Алексей Владимирович",
          phone: "+7 (913) 345-67-89",
          orders: [
            { id: "ORD-174", device: "Motorola Edge", model: "Смартфон", date: "2023-09-18" },
            { id: "ORD-285", device: "Lenovo Yoga", model: "Ноутбук", date: "2023-12-20" },
            { id: "ORD-396", device: "iPad Mini", model: "Планшет", date: "2024-02-05" }
          ]
        },
        {
          name: "Попов Дмитрий Николаевич",
          phone: "+7 (914) 456-78-90",
          orders: [
            { id: "ORD-186", device: "iPhone 13", model: "Смартфон", date: "2023-11-12" },
            { id: "ORD-297", device: "Mac mini", model: "Компьютер", date: "2024-01-05" }
          ]
        },
        {
          name: "Смирнов Игорь Алексеевич",
          phone: "+7 (915) 567-89-01",
          orders: [
            { id: "ORD-198", device: "Samsung Galaxy Note", model: "Смартфон", date: "2023-10-25" },
            { id: "ORD-309", device: "Dell Latitude", model: "Ноутбук", date: "2023-12-15" },
            { id: "ORD-420", device: "Beats Studio", model: "Наушники", date: "2024-02-20" }
          ]
        },
        {
          name: "Ковалев Максим Сергеевич",
          phone: "+7 (916) 678-90-12",
          orders: [
            { id: "ORD-210", device: "Google Pixel 7", model: "Смартфон", date: "2023-08-08" },
            { id: "ORD-321", device: "MacBook Pro", model: "Ноутбук", date: "2023-11-05" }
          ]
        },
        {
          name: "Васильев Евгений Анатольевич",
          phone: "+7 (917) 789-01-23",
          orders: [
            { id: "ORD-222", device: "iPhone 11 Pro", model: "Смартфон", date: "2023-06-15" },
            { id: "ORD-333", device: "Surface Laptop", model: "Ноутбук", date: "2023-10-08" },
            { id: "ORD-444", device: "AirPods Pro 2", model: "Наушники", date: "2024-01-12" }
          ]
        },
        {
          name: "Зайцев Александр Михайлович",
          phone: "+7 (918) 890-12-34",
          orders: [
            { id: "ORD-234", device: "OnePlus 10", model: "Смартфон", date: "2023-12-22" },
            { id: "ORD-345", device: "ThinkPad X1", model: "Ноутбук", date: "2024-02-10" }
          ]
        },
        {
          name: "Павлов Сергей Андреевич",
          phone: "+7 (919) 901-23-45",
          orders: [
            { id: "ORD-246", device: "iPhone 14", model: "Смартфон", date: "2024-01-03" },
            { id: "ORD-357", device: "MacBook Air M2", model: "Ноутбук", date: "2024-02-18" },
            { id: "ORD-468", device: "iPad Air", model: "Планшет", date: "2024-03-25" }
          ]
        },
        {
          name: "Максимов Дмитрий Викторович",
          phone: "+7 (920) 012-34-56",
          orders: [
            { id: "ORD-258", device: "Samsung Galaxy S22", model: "Смартфон", date: "2023-11-18" },
            { id: "ORD-369", device: "Dell XPS 13", model: "Ноутбук", date: "2024-01-25" }
          ]
        },
        {
          name: "Семенов Андрей Николаевич",
          phone: "+7 (921) 123-45-67",
          orders: [
            { id: "ORD-270", device: "Xiaomi Poco", model: "Смартфон", date: "2023-09-30" },
            { id: "ORD-381", device: "HP Spectre", model: "Ноутбук", date: "2023-12-08" },
            { id: "ORD-492", device: "Samsung Galaxy Buds", model: "Наушники", date: "2024-02-28" }
          ]
        },
        {
          name: "Голубев Иван Олегович",
          phone: "+7 (922) 234-56-78",
          orders: [
            { id: "ORD-282", device: "Huawei Mate", model: "Смартфон", date: "2023-08-20" },
            { id: "ORD-393", device: "Mac mini M1", model: "Компьютер", date: "2023-11-15" }
          ]
        },
        {
          name: "Виноградов Владимир Петрович",
          phone: "+7 (923) 345-67-89",
          orders: [
            { id: "ORD-294", device: "iPhone 12 Mini", model: "Смартфон", date: "2023-10-10" },
            { id: "ORD-405", device: "Asus Vivobook", model: "Ноутбук", date: "2023-12-28" },
            { id: "ORD-516", device: "Apple Watch Series 7", model: "Смарт-часы", date: "2024-02-15" }
          ]
        },
        {
          name: "Богданов Алексей Сергеевич",
          phone: "+7 (924) 456-78-90",
          orders: [
            { id: "ORD-306", device: "Sony Xperia", model: "Смартфон", date: "2023-07-05" },
            { id: "ORD-417", device: "Surface Book", model: "Ноутбук", date: "2023-11-20" }
          ]
        },
        {
          name: "Воробьев Дмитрий Андреевич",
          phone: "+7 (925) 567-89-01",
          orders: [
            { id: "ORD-318", device: "Motorola Razr", model: "Смартфон", date: "2023-12-03" },
            { id: "ORD-429", device: "MacBook Pro M1", model: "Ноутбук", date: "2024-01-08" },
            { id: "ORD-540", device: "AirTag", model: "Аксессуар", date: "2024-03-12" }
          ]
        },
        {
          name: "Фролов Сергей Николаевич",
          phone: "+7 (926) 678-90-12",
          orders: [
            { id: "ORD-330", device: "iPhone 10", model: "Смартфон", date: "2023-09-12" },
            { id: "ORD-441", device: "Dell G Series", model: "Ноутбук", date: "2023-11-28" }
          ]
        }
      ];
    } else {
      this.sampleClients = this.clients;
    }
  },
  emits: ['new-client-requested', 'client-selected', 'update:clientName', 'order-selected'],
  data() {
    return {
      sampleClients: [],
      showSuggestions: false,
      filteredClients: [],
      activeSuggestionIndex: -1,
      currentIndex: -1,
      selectedOrderId: null
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
    formatDate(dateString) {
      // Форматируем дату из формата YYYY-MM-DD в более читаемый формат
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU');
    },
    onClientSelected(value) {
      // Находим клиента по значению (имени)
      const client = this.sampleClients.find(c => c.name === value) ||
                    this.clients.find(c => c.name === value);

      if (client) {
        // Вызываем ту же логику, что и при выборе через клавиатуру
        this.selectClient(client);
      }
    },
    onOrderClick(order) {
      // Устанавливаем ID выбранного заказа для подсветки
      this.selectedOrderId = order.id;

      // Создаем mock-данные для устройства на основе информации в заказе
      // В реальном приложении это будет получено из базы данных
      const deviceData = this.createDeviceDataFromOrder(order);

      // Вызываем событие для передачи данных об устройстве в родительский компонент
      this.$emit('order-selected', {
        orderId: order.id,
        deviceData: deviceData
      });
    },
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

    createDeviceDataFromOrder(order) {
      // Создание mock-данных устройства на основе информации о заказе
      // В реальном приложении это будет получено из базы данных

      // Определяем тип устройства на основе модели
      let deviceType = '';
      if (order.model.includes('Смартфон') || order.model.includes('Телефон')) {
        deviceType = 'Телефон';
      } else if (order.model.includes('Ноутбук') || order.model.includes('Компьютер')) {
        deviceType = 'Ноутбук';
      } else if (order.model.includes('Планшет')) {
        deviceType = 'Планшет';
      } else if (order.model.includes('Наушники')) {
        deviceType = 'Аксессуар';
      } else if (order.model.includes('Смарт-часы')) {
        deviceType = 'Аксессуар';
      } else {
        deviceType = 'Другое';
      }

      // Генерируем IMEI/серийный номер
      const generatedImei = Math.random().toString().substr(2, 15);

      // Определяем бренд на основе названия устройства
      let deviceBrand = '';
      const deviceName = order.device.toLowerCase();

      if (deviceName.includes('iphone') || deviceName.includes('ipad') || deviceName.includes('mac')) {
        deviceBrand = 'Apple';
      } else if (deviceName.includes('samsung') || deviceName.includes('galaxy')) {
        deviceBrand = 'Samsung';
      } else if (deviceName.includes('xiaomi') || deviceName.includes('poco')) {
        deviceBrand = 'Xiaomi';
      } else if (deviceName.includes('huawei')) {
        deviceBrand = 'Huawei';
      } else if (deviceName.includes('lenovo')) {
        deviceBrand = 'Lenovo';
      } else if (deviceName.includes('dell')) {
        deviceBrand = 'Dell';
      } else if (deviceName.includes('hp')) {
        deviceBrand = 'HP';
      } else if (deviceName.includes('asus')) {
        deviceBrand = 'Asus';
      } else if (deviceName.includes('sony')) {
        deviceBrand = 'Sony';
      } else {
        deviceBrand = 'Другой';
      }

      // Определяем модель на основе устройства
      const deviceModel = order.device;

      return {
        imei: generatedImei,
        type: deviceType,
        brand: deviceBrand,
        model: deviceModel
      };
    },

    selectClient(client) {
      this.localClientName = client.name;
      this.showSuggestions = false;
      this.activeSuggestionIndex = -1;

      // Use existing orders from the client data or empty array if none
      const clientOrders = client.orders || [];

      this.$emit('client-selected', { ...client, orders: clientOrders });
    }
  }
};
</script>

<style scoped>
.client-info-container {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  border: 1px solid red;
  height: 100%;
}

.client-info-left {
  flex: 1;
  min-width: 0;
  border: 1px solid rgb(8, 0, 255);
}

.old-orders-container {
  margin-top: 16px;
  padding: 16px;
  background-color: #f0f2f5;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
}

.order-item {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.order-item:last-child {
  border-bottom: none;
}
</style>