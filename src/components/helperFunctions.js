// Returns object where key is the form field (e.g. email) and value is bool representing
// whether the field has an error
export const getFieldHasErrorObj = (fields, errors) => {
  // Init object and set each field to false (i.e. no error)
  let fieldHasError = {};
  for (const field of fields) {
    fieldHasError[field] = false;
  }

  // Return early if error status not populated
  if (errors.status === null) {
    return fieldHasError;
  }

  // Set boolean based on whether the given field has an error message
  for (const field of fields) {
    fieldHasError[field] = field in errors.msg;
  }
  return fieldHasError;
};
