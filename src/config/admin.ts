// Admin configuration - uses environment variables for security
export const ADMIN_CONFIG = {
  name: process.env.REACT_APP_ADMIN_NAME || 'defaultAdmin',
  code: process.env.REACT_APP_ADMIN_CODE || 'defaultCode'
};

// Helper function to check if a user is admin
export const isAdminUser = (name: string): boolean => {
  return name.toLowerCase() === ADMIN_CONFIG.name.toLowerCase();
};