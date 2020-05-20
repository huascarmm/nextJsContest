/**
 * params of array fields to added exclude
 * @param fieldParam params of type Array<string>
 */
function jsonSchemaFileds(fieldParam) {
  const fields = {};
  if (fieldParam !== undefined && typeof fieldParam === 'object') {
    fieldParam.map(field => Object.assign(fields, {
      [field]: false,
    }));
  }
  return {
    status: false,
    created: false,
    lastUpdated: false,
    ...fields
  };
}

export default jsonSchemaFileds;
