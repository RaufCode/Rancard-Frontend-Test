export const storage = {
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Failed to get item from localStorage: ${key}`, error);
      return null;
    }
  },

  set: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Failed to set item in localStorage: ${key}`, error);
      return false;
    }
  },

  remove: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Failed to remove item from localStorage: ${key}`, error);
      return false;
    }
  },

  getJSON: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Failed to parse JSON from localStorage: ${key}`, error);
      return null;
    }
  },

  setJSON: <T>(key: string, value: T): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Failed to set JSON in localStorage: ${key}`, error);
      return false;
    }
  }
};

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export const handleApiError = (error: unknown): ApiError => {
  if (error && typeof error === 'object' && 'data' in error) {
    const apiError = error as { data?: { message?: string }; status?: number };
    return {
      message: apiError.data?.message || 'An unexpected error occurred',
      status: apiError.status
    };
  }
  
  if (error instanceof Error) {
    return { message: error.message };
  }
  
  return { message: 'An unexpected error occurred' };
};
