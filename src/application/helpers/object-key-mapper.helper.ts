export const mapToSnakeCase = <T, R>(originalData: T): R => {
  const mappedData: any = {};

  for (const key in originalData) {
    if (Object.prototype.hasOwnProperty.call(originalData, key)) {
      const value = originalData[key];
      const snakeCaseKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        mappedData[snakeCaseKey] = mapToSnakeCase(value);
        continue;
      }

      mappedData[snakeCaseKey] = value;
    }
  }

  return mappedData;
};

export const mapToCamelCase = <T, R>(originalData: T): R => {
  const mappedData: any = {};

  for (const key in originalData) {
    if (Object.prototype.hasOwnProperty.call(originalData, key)) {
      const value = originalData[key];
      const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());


      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        mappedData[camelCaseKey] = mapToCamelCase(value);
        continue;
      }

      mappedData[camelCaseKey] = value;
    }
  }

  return mappedData;
};
