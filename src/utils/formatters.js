// Formatters utility for OMS Analytics Dashboard (Indian Rupee ₹)

/**
 * Format currency in Indian Rupees (₹)
 * @param {number} amount
 * @param {boolean} compact - whether to use ₹23.4k / ₹1.5L format
 */
export const formatCurrency = (amount, compact = false) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0.00';
  
  if (compact) {
    if (Math.abs(amount) >= 10_000_000) {
      return `₹${(amount / 10_000_000).toFixed(1)}Cr`;
    }
    if (Math.abs(amount) >= 100_000) {
      return `₹${(amount / 100_000).toFixed(1)}L`;
    }
    if (Math.abs(amount) >= 1_000) {
      return `₹${(amount / 1_000).toFixed(1)}k`;
    }
    return `₹${amount.toFixed(0)}`;
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Format integer or decimal numbers with Indian numbering system
 */
export const formatNumber = (num, compact = false) => {
  if (num === undefined || num === null || isNaN(num)) return '0';
  
  if (compact) {
    if (Math.abs(num) >= 10_000_000) return `${(num / 10_000_000).toFixed(1)}Cr`;
    if (Math.abs(num) >= 100_000) return `${(num / 100_000).toFixed(1)}L`;
    if (Math.abs(num) >= 1_000) return `${(num / 1_000).toFixed(1)}k`;
  }

  return new Intl.NumberFormat('en-IN').format(num);
};

/**
 * Format percentage with explicit sign (+ / -)
 */
export const formatPercentage = (rate) => {
  if (rate === undefined || rate === null || isNaN(rate)) return '0.0%';
  const sign = rate > 0 ? '+' : '';
  return `${sign}${rate.toFixed(1)}%`;
};

/**
 * Format date into readable strings
 */
export const formatDate = (dateString, format = 'medium') => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  if (format === 'short') {
    // e.g. "12 Nov"
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short'
    }).format(date);
  }

  if (format === 'chart') {
    // e.g. "12 Nov"
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short'
    }).format(date);
  }

  // e.g. "12 Nov 2026, 02:22 pm"
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
