
const isJSON = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (err) {
    return false;
  }
};

export const getKeys = () => {
  return Object.keys(localStorage);
};

export const getLength = () => {
  return getKeys().length;
};

export const getItem = (key: string) => {
  try {
    if (localStorage.hasOwnProperty(key)) {
      const value = localStorage.getItem(key) as string;
      return isJSON(value) || value;
    }

    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const setItem = (key: string, value: any) => {
  try {
    const item = value instanceof Object ?
    JSON.stringify(value) :
    value;

    localStorage.setItem(key, item);
  } catch (err) {
    console.error(err);
  }
};

export const removeItem = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(err);
  }
};

export const clearStorage = () => {
  localStorage.clear();
};