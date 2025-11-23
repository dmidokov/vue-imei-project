<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">ServiceCenter</div>
      <nav class="menu">
        <a href="#" class="menu-item">
          <Icon name="home" size="18" class="menu-icon" />
          <span>Главная</span>
        </a>
        <a href="#" class="menu-item">
          <Icon name="order-take" size="18" class="menu-icon" />
          <span>Прием заказа</span>
        </a>
        <a href="#" class="menu-item">
          <Icon name="order-status" size="18" class="menu-icon" />
          <span>Статус заказа</span>
        </a>
        <a href="#" class="menu-item">
          <Icon name="client-history" size="18" class="menu-icon" />
          <span>История клиентов</span>
        </a>
        <a href="#" class="menu-item">
          <Icon name="admin" size="18" class="menu-icon" />
          <span>Администрирование</span>
        </a>
        <a href="#" class="menu-item">
          <Icon name="help" size="18" class="menu-icon" />
          <span>Справка</span>
        </a>
        <button
          id="theme-toggle"
          class="menu-item theme-toggle-btn"
          @click="$emit('toggleTheme')"
        >
          {{ isDarkTheme ? '☀️' : '🌙' }}
        </button>
      </nav>
    </div>
  </header>
</template>

<script>
import Icon from './Icon.vue';

export default {
  name: 'HeaderComponent',
  components: {
    Icon
  },
  props: {
    isDarkTheme: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggleTheme']
};
</script>

<style scoped>
.header {
  background-color: #45678f;
  color: white;
  padding: 8px 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
}

.logo {
  font-size: 21px;
  font-weight: 700;
  color: white;
  text-decoration: none;
}

.menu {
  display: flex;
  gap: 0;
}

.menu-item {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  margin: 0 2px;
  border-radius: 4px;
  transition: all 0.3s ease;
  background: none;
  border: none;
  cursor: pointer;
  font-size: inherit;
  display: flex;
  align-items: center;
  gap: 8px;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.theme-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-icon {
  display: inline-block;
  vertical-align: middle;
}
</style>

<style scoped>
.header {
  background-color: #45678f;
  color: white;
  padding: 8px 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
}

.logo {
  font-size: 21px;
  font-weight: 700;
  color: white;
  text-decoration: none;
}

.menu {
  display: flex;
  gap: 0;
}

.menu-item {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  margin: 0 2px;
  border-radius: 4px;
  transition: all 0.3s ease;
  background: none;
  border: none;
  cursor: pointer;
  font-size: inherit;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.theme-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>