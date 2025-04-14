export const formatPhoneNumbers = phoneNumber => {
  const formateNumber = phoneNumber?.replace(
    /(\d{3})(\d{3})(\d{4})/,
    '$1-$2-$3',
  );
  return formateNumber;
};
export const cleanPhoneNumber = phoneNumber => {
  // Remove all hyphens and spaces using regular expressions
  return phoneNumber.replace(/[-\s]/g, '');
};

export const formatPhoneNumber = phoneNumber => {
  // Check if the phoneNumber has at least 10 digits
  if (typeof phoneNumber !== 'string' || phoneNumber.length !== 10) {
    // If not valid, return as is
    return phoneNumber;
  }

  // Split the phoneNumber into parts and join them with dashes
  return (
    phoneNumber.substring(0, 3) +
    '-' +
    phoneNumber.substring(3, 6) +
    '-' +
    phoneNumber.substring(6)
  );
  // if (phoneNumber.length < 10) {
  //   return phoneNumber; // Return the original number if it's too short
  // }
  // // Split the number into groups
  // const countryCode = "+1";
  // const areaCode = phoneNumber.substring(1, 4);
  // const exchangeCode = phoneNumber.substring(4, 7);
  // const subscriberNumber = phoneNumber.substring(6);
  // // Format the number
  // const formattedNumber = `${areaCode}-${exchangeCode}-${subscriberNumber}`;
  // return formattedNumber;
};
// const numericValue = e.target.value.replace(/\D/g, "");

export const formatWhileKeypress = e => {
  if (e.keyCode !== 8) {
    const input = e.target;
    let value = input.value.replace(/\D/g, ''); // Remove non-digit characters
    // Restrict the input length to 10 digits
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
    // Format the phone number
    if (value.length >= 3) {
      value = `${value.substring(0, 3)}-${value.substring(3)}`;
      if (value.length >= 7) {
        value = `${value.substring(0, 7)}-${value.substring(7)}`;
      }
    }
    // Set the input value to the formatted value
    input.value = value;
    return input.value;
  }
};
