/**
 * Utilities for user profile and identity display.
 */

export const getDisplayNameFromEmail = (email: string): string => {
  if (!email) return 'Użytkownik';
  
  // Custom rule for admin
  if (email.toLowerCase() === 'przemek.rakotny@gmail.com') return 'Przemysław Rakotny';
  
  const prefix = email.split('@')[0];
  
  // Handle dots or underscores as name separators
  return prefix
    .split(/[._]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const getInitials = (name: string): string => {
  if (!name) return 'U';
  
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};
