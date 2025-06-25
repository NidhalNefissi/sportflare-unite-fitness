
export const mockFlouciPayment = async (amount: number) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ status: 'success', id: 'MOCK-FLOUCI-001' }), 1000)
  );
};

export const processPayment = async (amount: number, paymentMethod: string) => {
  console.log(`Processing ${paymentMethod} payment for ${amount} TND`);
  
  if (paymentMethod === 'Flouci.tn') {
    return await mockFlouciPayment(amount);
  }
  
  // Mock other payment methods
  return new Promise((resolve) =>
    setTimeout(() => resolve({ status: 'success', id: `MOCK-${paymentMethod.toUpperCase()}-${Date.now()}` }), 1000)
  );
};
