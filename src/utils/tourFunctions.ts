function calculateDaysAndNights(startDate: Date, endDate: Date): { days: number; nights: number } {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start > end) {
    console.log('calculateDaysAndNights: Start date must be before or equal to end date');
    return { days: 0, nights: 0 };
  }

  // Farkı gün cinsinden al
  const timeDiff = end.getTime() - start.getTime();
  const diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  // Gün sayısı: fark + 1 (aynı gün için 1 gün)
  const days = diffDays + 1;

  // Gece sayısı: gün - 1
  const nights = days > 0 ? days - 1 : 0;

  return { days, nights };
}

const tourFunctions = { calculateDaysAndNights };
export default tourFunctions;
