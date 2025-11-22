/**
 * Класс для управления стеком модальных окон
 * Позволяет отслеживать открытые модальные окна и закрывать их по нажатию клавиши Escape
 */
class ModalStackManager {
  constructor() {
    // Стек для хранения идентификаторов открытых модальных окон
    this.modalStack = [];
    
    // Маппинг идентификаторов модальных окон к функциям закрытия
    this.modalClosers = new Map();
    
    // Обработчик нажатия клавиши Escape
    this.escapeHandler = this.handleEscape.bind(this);
    
    // Флаг, указывающий, зарегистрирован ли глобальный обработчик
    this.isGlobalHandlerRegistered = false;
  }

  /**
   * Добавляет модальное окно в стек
   * @param {string} modalId - уникальный идентификатор модального окна
   * @param {Function} closeFunction - функция для закрытия модального окна
   */
  addModal(modalId, closeFunction) {
    // Проверяем, что модальное окно с таким ID еще не добавлено
    if (this.modalStack.includes(modalId)) {
      console.warn(`Modal with ID ${modalId} is already in the stack`);
      return;
    }

    // Добавляем идентификатор модального окна в стек
    this.modalStack.push(modalId);
    
    // Сохраняем функцию закрытия
    this.modalClosers.set(modalId, closeFunction);

    // Регистрируем глобальный обработчик, если он еще не зарегистрирован
    if (!this.isGlobalHandlerRegistered) {
      document.addEventListener('keydown', this.escapeHandler);
      this.isGlobalHandlerRegistered = true;
    }

    console.log(`Modal ${modalId} added to stack. Current stack size: ${this.modalStack.length}`);
  }

  /**
   * Удаляет модальное окно из стека
   * @param {string} modalId - уникальный идентификатор модального окна
   */
  removeModal(modalId) {
    // Находим индекс модального окна в стеке
    const index = this.modalStack.indexOf(modalId);
    
    if (index !== -1) {
      // Удаляем из стека
      this.modalStack.splice(index, 1);
      
      // Удаляем функцию закрытия
      this.modalClosers.delete(modalId);
      
      console.log(`Modal ${modalId} removed from stack. Current stack size: ${this.modalStack.length}`);
    } else {
      console.warn(`Modal with ID ${modalId} not found in stack`);
    }

    // Если стек пуст, удаляем глобальный обработчик
    if (this.modalStack.length === 0 && this.isGlobalHandlerRegistered) {
      document.removeEventListener('keydown', this.escapeHandler);
      this.isGlobalHandlerRegistered = false;
    }
  }

  /**
   * Закрывает последнее открытое модальное окно
   */
  closeLastModal() {
    if (this.modalStack.length > 0) {
      // Получаем ID последнего модального окна
      const lastModalId = this.modalStack[this.modalStack.length - 1];
      
      // Получаем функцию закрытия для этого окна
      const closeFunction = this.modalClosers.get(lastModalId);
      
      if (closeFunction) {
        console.log(`Closing modal ${lastModalId} via Escape`);
        
        // Вызываем функцию закрытия
        closeFunction();
        
        // Удаляем модальное окно из стека
        this.removeModal(lastModalId);
      } else {
        console.error(`No close function found for modal ${lastModalId}`);
      }
    } else {
      console.log('No modals to close');
    }
  }

  /**
   * Обработчик нажатия клавиши Escape
   * @param {KeyboardEvent} event - событие нажатия клавиши
   */
  handleEscape(event) {
    if (event.key === 'Escape') {
      this.closeLastModal();
    }
  }

  /**
   * Возвращает количество открытых модальных окон
   */
  getStackSize() {
    return this.modalStack.length;
  }

  /**
   * Проверяет, есть ли открытое модальное окно с указанным ID
   * @param {string} modalId - идентификатор модального окна
   * @returns {boolean} - true, если модальное окно открыто, иначе false
   */
  isModalOpen(modalId) {
    return this.modalStack.includes(modalId);
  }

  /**
   * Закрывает все модальные окна
   */
  closeAllModals() {
    // Создаем копию стека, поскольку в процессе закрытия он будет изменяться
    const stackCopy = [...this.modalStack];
    
    // Закрываем все модальные окна в обратном порядке
    for (let i = stackCopy.length - 1; i >= 0; i--) {
      const modalId = stackCopy[i];
      const closeFunction = this.modalClosers.get(modalId);
      
      if (closeFunction) {
        closeFunction();
      }
      
      // Удаляем из стека (это произойдет внутри removeModal)
      this.removeModal(modalId);
    }
  }
}

// Экспортируем экземпляр класса по умолчанию
export default new ModalStackManager();

// Также экспортируем сам класс, если кому-то понадобится создать отдельный экземпляр
export { ModalStackManager };