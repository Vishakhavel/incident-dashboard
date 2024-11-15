export const formatDate = ({ date, fallbackMessage }) => {
  if (!date) return fallbackMessage;
  new Date(date).toLocaleString();
};
