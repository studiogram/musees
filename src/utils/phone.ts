export const formatPhoneNumber = (phoneNumber: string): string => {
  return phoneNumber.replace(/[\s.]/g, "").slice(0, 10);
};

export const addPhoneNumberSpace = (phoneNumber: string): string => {
  return phoneNumber.replace(/.{2}/g, "$& ").trim();
};
