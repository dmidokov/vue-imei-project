<template>
  <div class="form-group">
    <label :for="id" :class="{ required: required }">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :maxlength="maxlength"
      :class="{ valid: validationStatus === 'valid', invalid: validationStatus === 'invalid' }"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'InputField',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
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
    maxlength: {
      type: Number,
      default: null
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

.form-group-modal {
  margin-bottom: 20px;
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

input[type="text"],
input[type="email"],
input[type="tel"] {
  width: 100%;
  padding: 7px 8px;
  border: 1px solid #d3d8de;
  border-radius: 4px;
  font-size: 15px;
  transition: all 0.3s ease;
  background-color: white;
  height: 34px;
  box-sizing: border-box;
}

input:focus {
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

.dark-theme input[type="text"],
.dark-theme input[type="email"],
.dark-theme input[type="tel"] {
  background-color: #3a4a5a;
  border: 1px solid #4a5a6a;
  color: #e1e5e9;
}

.dark-theme input:focus {
  border-color: #4a76a8;
  box-shadow: 0 0 0 2px rgba(74, 118, 168, 0.3);
}

.dark-theme input.valid {
  border-color: #4CAF50 !important;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.3) !important;
}

.dark-theme input.invalid {
  border-color: #F44336 !important;
  box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.3) !important;
}
</style>