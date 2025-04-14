import React from 'react';

export const cleanAmount = input => {
  // Remove dollar signs and commas
  let formatted = input.replace(/[\$,]/g, '');
  // Remove trailing .00 if present
  formatted = formatted.replace(/\.00$/, '');
  return formatted;
};
export const formatCurrencyValue = value => {
  let formattedValue = value.replace(/[^0-9,.]/g, ''); // Allow digits, dots, and commas

  // Ensure there's a decimal point and add .00 if necessary
  if (!formattedValue.includes('.')) {
    formattedValue += '.00';
  } else if (formattedValue.endsWith('.')) {
    formattedValue += '00';
  } else if (formattedValue.endsWith('.0')) {
    formattedValue += '0';
  }

  // Handle case when there are multiple zeros after the decimal point
  if (formattedValue.match(/\.\d{5,}$/)) {
    formattedValue = formattedValue.replace(/0+$/, ''); // Remove trailing zeros
    formattedValue = formattedValue.replace(/\.$/, ''); // Remove trailing decimal point if it ends with it
  }

  // Add dollar sign at the beginning
  formattedValue = `$${formattedValue}`;

  return formattedValue;
};
const formatNumber = num => {
  // Remove non-digit characters except for the period
  num = num.replace(/[^0-9.]/g, '');

  // Split the number into integer and decimal parts
  let parts = num.split('.');
  let integerPart = parts[0];
  let decimalPart = parts[1];

  // Add commas every three digits in the integer part
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Combine integer and decimal parts, ensuring not to add comma after decimal point
  if (decimalPart !== undefined) {
    return `${integerPart}.${decimalPart}`;
  } else {
    return integerPart;
  }
};
export const handleChanges = e => {
  let value = e.target.value;

  // Remove the dollar sign if it exists
  if (value.startsWith('$')) {
    value = value.substring(1);
  }

  // Format the number with commas
  value = formatNumber(value);

  // Add the dollar sign
  value = `$${value}`;
  return value;
  // Update the state
};

export const InputField = ({
  id,
  type,
  value,
  register,
  handleChange,
  handleBlur,
  handleFocus,
  className,
  placeholder,
}) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      {...register(id, { required: false })}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      className={className}
      placeholder={placeholder}
    />
  );
};
export const numberWithCommasAndCents = number => {
  // Convert number to string and add commas
  let formatted = Number(number).toLocaleString('en-US');
  console.log('formatted,', typeof formatted);
  // Add '.00' if there are no cents
  if (formatted !== '0') {
    if (!formatted.includes('.')) {
      formatted += '.00';
    }
  }
  formatted = `$${formatted}`;

  // Prepend '$' to the formatted number
  return formatted;
};

// Example usage:
