export const validateEmail = (value: string) => {
  if (!value.trim()) return 'Email je povinný';
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(value)) return 'Zadaj platný email';
  return '';
};

export const validatePhone = (value: string) => {
  if (!value.trim()) return 'Telefónne číslo je povinné';

  const cleaned = value.replace(/\s+/g, ''); // remove all spaces

  if (cleaned.length < 12) return 'Zadaj platné slovenské číslo';

  return '';
};

export const validateString = (value: string, errorMessage: string) => {
  if (!value.trim()) return errorMessage;
  return '';
};

export const validateName = (value: string) => {
  if (!value.trim()) return 'Meno je povinné';
  return '';
};

export const validateSurname = (value: string) => {
  if (!value.trim()) return 'Priezvisko je povinné';
  return '';
};
