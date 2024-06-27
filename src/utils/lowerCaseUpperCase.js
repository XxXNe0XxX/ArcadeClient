export const mapKeysToFirstCharLowerCase = (obj) => {
  const mappedObj = {};
  Object.keys(obj).forEach((key) => {
    const newKey = key.charAt(0).toLowerCase() + key.slice(1);
    mappedObj[newKey] = obj[key];
  });
  return mappedObj;
};

export const mapKeysToFirstCharUpperCase = (obj) => {
  const mappedObj = {};
  Object.keys(obj).forEach((key) => {
    const newKey = key.charAt(0).toUpperCase() + key.slice(1);
    mappedObj[newKey] = obj[key];
  });
  return mappedObj;
};

export const getModifiedFields = (initialValues, currentValues) => {
  let modifiedInitialValues = mapKeysToFirstCharLowerCase(initialValues);
  const modifiedFields = {};
  Object.keys(currentValues).forEach((key) => {
    if (currentValues[key] != modifiedInitialValues[key]) {
      modifiedFields[key] = currentValues[key];
    }
  });
  console.log(modifiedFields);
  return modifiedFields;
};
