// utils/helpers.js


export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString() + " " + d.toLocaleTimeString();
};

export const getInitial = (name) => {
  if (!name) return "U";
  return name.charAt(0).toUpperCase();
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  return text.length > maxLength
    ? text.substring(0, maxLength) + "..."
    : text;
};


export const parseJSON = (data) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error("Invalid JSON:", error);
    return null;
  }
};


export const formatPercentage = (num) => {
  if (!num) return "0%";
  return `${Math.round(num)}%`;
};