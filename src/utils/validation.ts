export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const regex = /^[0-9]{10}$/;
  return regex.test(phone.replace(/[^0-9]/g, ''));
};

export const validatePassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
};

export const validateZipCode = (zipCode: string): boolean => {
  const regex = /^[0-9]{5,6}$/;
  return regex.test(zipCode);
};

export const validateAddress = (address: {
  addressLine1: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}): string[] => {
  const errors: string[] = [];
  
  if (!address.addressLine1?.trim()) errors.push('Address line 1 is required');
  if (!address.city?.trim()) errors.push('City is required');
  if (!address.state?.trim()) errors.push('State is required');
  if (!address.country?.trim()) errors.push('Country is required');
  if (!validateZipCode(address.zipCode)) errors.push('Invalid zip code');
  
  return errors;
};
