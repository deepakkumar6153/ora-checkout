// IST timezone offset in minutes (GMT+5:30)
const IST_OFFSET = 5.5 * 60;

/**
 * Get current time in IST
 * @returns {Date} Current date in IST
 */
export const getCurrentISTTime = () => {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  return new Date(utc + (3600000 * 5.5)); // Add 5.5 hours for IST
};

/**
 * Get current timestamp in milliseconds for IST
 * @returns {number} Current timestamp in milliseconds
 */
export const getCurrentISTTimestamp = () => {
  return getCurrentISTTime().getTime();
};

/**
 * Format date to ISO string in IST
 * @returns {string} ISO string in IST
 */
export const getISTISOString = () => {
  return getCurrentISTTime().toISOString();
};

/**
 * Check if a timestamp is valid within a given age
 * @param {number} timestamp - Timestamp to check
 * @param {number} maxAge - Maximum age in milliseconds
 * @returns {boolean} Whether the timestamp is valid
 */
export const isTimestampValid = (timestamp, maxAge) => {
  if (!timestamp) return false;
  const now = getCurrentISTTimestamp();
  const age = now - timestamp;
  return age < maxAge;
}; 