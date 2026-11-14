// Formatters utility for OMS Analytics Dashboard

/**
 * Format currency in USD ($)
 * @param {number} amount
 * @param {boolean} compact - whether to use $1.2k format
 */
export const formatCurrency = (amount, compact = false) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '$0.00';
  
  if (compact) {
    if (Math.abs(amount) >= 1_000_000) {
      return `$${(amount / 1_000_000).toFixed(1)}M`;
    }
    if (Math.abs(amount) >= 1_000) {
      return `$${(amount / 1_000).toFixed(1)}k`;
    }
    return `$${amount.toFixed(0)}`;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Format integer or decimal numbers with thousand commas
 */
export const formatNumber = (num, compact = false) => {
  if (num === undefined || num === null || isNaN(num)) return '0';
  
  if (compact) {
    if (Math.abs(num) >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (Math.abs(num) >= 1_000) return `${(num / 1_000).toFixed(1)}k`;
  }

  return new Intl.NumberFormat('en-US').format(num);
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
    // e.g. "Nov 12"
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  }

  if (format === 'chart') {
    // e.g. "12 Nov"
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short'
    }).format(date);
  }

  // e.g. "Nov 12, 2026, 02:22 PM"
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
