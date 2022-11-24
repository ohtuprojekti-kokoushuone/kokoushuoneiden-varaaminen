export const baseUrl =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_URL : process.env.REACT_APP_BASE_URL_DEV;

export const basePath =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_PATH : '';

// eslint-disable-next-line no-undef
export const inProduction = process.env.NODE_ENV === 'production';

// eslint-disable-next-line no-undef
export const testRun = process.env.NODE_ENV === 'test';
