
export const getIdFromUrl = (url: string): number => {
    const parts = url.split('/');
    return Number(parts[parts.length - 2]);
  };
  export const capitalizeFirstLetter= (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
  
  