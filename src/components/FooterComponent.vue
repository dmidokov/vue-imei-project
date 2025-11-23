<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h4>ServiceCenter</h4>
        <p>© 2023-2025 Все права защищены</p>
      </div>
      <div class="footer-section">
        <h4>Контакты</h4>
        <p>Телефон: +7 (XXX) XXX-XX-XX</p>
        <p>Email: info@servicecenter.ru</p>
      </div>
      <div class="footer-section">
        <h4>Адрес</h4>
        <p>г. Москва, ул. Примерная, д. 15</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
};
</script>

<style scoped>
.footer {
  background-color: #f0f2f5;
  padding: 24px;
  border-top: 1px solid #d9d9d9;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.footer-section {
  flex: 1;
  min-width: 200px;
  padding: 0 16px;
}

.footer-section h4 {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
}

.footer-section p {
  margin: 4px 0;
  color: #666;
  font-size: 14px;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
  }
  
  .footer-section {
    min-width: auto;
    margin-bottom: 16px;
  }
}
</style>