<template>
  <div class="form-group">
    <label :for="id" :class="{ required: required }">{{ label }}</label>
    <textarea
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :rows="rows"
      :class="{ valid: validationStatus === 'valid', invalid: validationStatus === 'invalid' }"
      class="textarea-field"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: 'TextareaField',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 3
    },
    validationStatus: {
      type: String,
      default: null, // 'valid', 'invalid', or null
      validator: (value) => ['valid', 'invalid', null].includes(value)
    }
  },
  emits: ['update:modelValue', 'blur', 'focus']
};
</script>

<style scoped>
.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 700;
  color: #2a2a2a;
  font-size: 13px;
  text-transform: uppercase;
}

label.required::after {
  content: " *";
  color: red;
}

.textarea-field {
  width: 100%;
  padding: 7px 8px;
  border: 1px solid #d3d8de;
  border-radius: 4px;
  font-size: 15px;
  transition: all 0.3s ease;
  background-color: white;
  box-sizing: border-box;
  resize: vertical;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.textarea-field:focus {
  outline: none;
  border-color: #4a76a8;
  box-shadow: 0 0 0 2px rgba(74, 118, 168, 0.2);
}

.valid {
  border-color: #4CAF50 !important;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2) !important;
}

.invalid {
  border-color: #F44336 !important;
  box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2) !important;
}

/* Dark theme styles */
.dark-theme .form-group label {
  color: #e1e5e9;
}

.dark-theme .textarea-field {
  background-color: #3a4a5a;
  border: 1px solid #4a5a6a;
  color: #e1e5e9;
}

.dark-theme .textarea-field:focus {
  border-color: #4a76a8;
  box-shadow: 0 0 0 2px rgba(74, 118, 168, 0.3);
}

.dark-theme .textarea-field.valid {
  border-color: #4CAF50 !important;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.3) !important;
}

.dark-theme .textarea-field.invalid {
  border-color: #F44336 !important;
  box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.3) !important;
}
</style>