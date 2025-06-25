
export const generateQRCode = (bookingId: string, classId: string): string => {
  const timestamp = new Date().toISOString().split('T')[0];
  return `SF-${bookingId}-${classId}-${timestamp}`;
};

export const validateQRCode = (qrCode: string, bookingId: string): boolean => {
  return qrCode.includes(bookingId);
};

export const generateClassQRCode = (classId: string, coachId: string): string => {
  const timestamp = new Date().toISOString().split('T')[0];
  return `CLASS-${classId}-${coachId}-${timestamp}`;
};
