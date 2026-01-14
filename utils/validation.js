/**
 * Validation Utilities
 * Helper functions untuk validasi data
 */

/**
 * Validate required fields
 * @param {Object} data - Data object to validate
 * @param {Array<string>} requiredFields - Array of required field names
 * @returns {Object} Validation result { isValid, errors }
 */
export function validateRequired(data, requiredFields) {
  const errors = {};
  
  requiredFields.forEach(field => {
    if (!data[field] || data[field].toString().trim() === '') {
      errors[field] = `${field} harus diisi`;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validate email
 * @param {string} email - Email to validate
 * @returns {Object} Validation result { isValid, error }
 */
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = re.test(email);
  
  return {
    isValid,
    error: isValid ? null : 'Format email tidak valid'
  };
}

/**
 * Validate password
 * @param {string} password - Password to validate
 * @param {Object} options - Validation options
 * @returns {Object} Validation result { isValid, error }
 */
export function validatePassword(password, options = {}) {
  const {
    minLength = 6,
    requireUppercase = false,
    requireNumber = false,
    requireSpecial = false
  } = options;
  
  if (password.length < minLength) {
    return {
      isValid: false,
      error: `Password minimal ${minLength} karakter`
    };
  }
  
  if (requireUppercase && !/[A-Z]/.test(password)) {
    return {
      isValid: false,
      error: 'Password harus mengandung huruf kapital'
    };
  }
  
  if (requireNumber && !/\d/.test(password)) {
    return {
      isValid: false,
      error: 'Password harus mengandung angka'
    };
  }
  
  if (requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      isValid: false,
      error: 'Password harus mengandung karakter khusus'
    };
  }
  
  return { isValid: true, error: null };
}

/**
 * Validate phone number (Indonesian format)
 * @param {string} phone - Phone number to validate
 * @returns {Object} Validation result { isValid, error }
 */
export function validatePhone(phone) {
  const re = /^(\+62|62|0)[2-9]\d{7,11}$/;
  const isValid = re.test(phone);
  
  return {
    isValid,
    error: isValid ? null : 'Format nomor telepon tidak valid'
  };
}

/**
 * Validate amount/number
 * @param {number|string} amount - Amount to validate
 * @param {Object} options - Validation options
 * @returns {Object} Validation result { isValid, error }
 */
export function validateAmount(amount, options = {}) {
  const {
    min = 0,
    max = Infinity,
    allowZero = false
  } = options;
  
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(num)) {
    return {
      isValid: false,
      error: 'Harus berupa angka'
    };
  }
  
  if (!allowZero && num === 0) {
    return {
      isValid: false,
      error: 'Nilai tidak boleh 0'
    };
  }
  
  if (num < min) {
    return {
      isValid: false,
      error: `Nilai minimal ${min}`
    };
  }
  
  if (num > max) {
    return {
      isValid: false,
      error: `Nilai maksimal ${max}`
    };
  }
  
  return { isValid: true, error: null };
}

/**
 * Validate date
 * @param {string|Date} date - Date to validate
 * @param {Object} options - Validation options
 * @returns {Object} Validation result { isValid, error }
 */
export function validateDate(date, options = {}) {
  const {
    minDate = null,
    maxDate = null
  } = options;
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    return {
      isValid: false,
      error: 'Format tanggal tidak valid'
    };
  }
  
  if (minDate && dateObj < new Date(minDate)) {
    return {
      isValid: false,
      error: `Tanggal minimal ${new Date(minDate).toLocaleDateString('id-ID')}`
    };
  }
  
  if (maxDate && dateObj > new Date(maxDate)) {
    return {
      isValid: false,
      error: `Tanggal maksimal ${new Date(maxDate).toLocaleDateString('id-ID')}`
    };
  }
  
  return { isValid: true, error: null };
}
