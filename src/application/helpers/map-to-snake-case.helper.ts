export const mapToSnakeCase = (originalData: Record<string, number | string>): Record<string, number | string> => {
  const mappedData: any = {};

  for (const key in originalData) {
    if (Object.prototype.hasOwnProperty.call(originalData, key)) {
      const snakeCaseKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      mappedData[snakeCaseKey] = originalData[key];
    }
  }

  return mappedData;
};
