export const formatDate = (date: Date, ampm = false) => {
  if (ampm === true) {
    return date.toLocaleTimeString("en-US");
  } else {
    return date.toLocaleTimeString("en-GB");
  }
};