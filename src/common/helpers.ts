export const sum = ((total: number, current: number) => {
    return total + current;
  });

export const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { weekday: 'long' });        
}