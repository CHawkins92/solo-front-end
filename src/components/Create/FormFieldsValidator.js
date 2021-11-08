export const validateForm = (fieldsRequiringValidation, fieldErrors) => {
  // Check for missing values first

  fieldErrors = checkForMissingValues(fieldsRequiringValidation, fieldErrors);

  // More specific validation for fields which require extra validation.

  fieldErrors = validateTelephoneNumber(
    fieldsRequiringValidation.telephoneNumber,
    fieldErrors
  );

  fieldErrors = validatePostcode(
    fieldsRequiringValidation.postcode,
    fieldErrors
  );

  fieldErrors = validateVehicleDateRegistered(
    fieldsRequiringValidation.vehDateRegistered,
    fieldErrors
  );

  return fieldErrors;
};

const checkForMissingValues = (fieldsRequiringValidation, fieldErrors) => {
  let errorType = "missing";
  for (let fieldName in fieldsRequiringValidation) {
    if (!fieldsRequiringValidation[fieldName]) {
      fieldErrors[fieldName][errorType] = true;
    } else {
      fieldErrors[fieldName][errorType] = false;
    }
  }
  return fieldErrors;
};

const validateTelephoneNumber = (telephoneNumber, fieldErrors) => {
  var telephoneNumberRegEx = /^[0-9]*$/i;
  let isTelephoneNumberValid = telephoneNumberRegEx.test(telephoneNumber);

  if (telephoneNumber.length !== 11 || !isTelephoneNumberValid) {
    fieldErrors.telephoneNumber.invalid = true;
  } else {
    fieldErrors.telephoneNumber.invalid = false;
  }

  return fieldErrors;
};

const validatePostcode = (postcode, fieldErrors) => {
  var postcodeRegEx = /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i;
  let isPostcodeValid = postcodeRegEx.test(postcode);

  if (!isPostcodeValid) {
    fieldErrors.postcode.invalid = true;
  } else {
    fieldErrors.postcode.invalid = false;
  }

  return fieldErrors;
};

const validateVehicleDateRegistered = (registrationDate, fieldErrors) => {
  let year = new Date().getFullYear().toString();
  let month = ("0" + (new Date().getMonth() + 1)).slice(-2);
  let day = ("0" + new Date().getDay()).slice(-2);

  let today = parseInt(year + month + day);

  let registrationYear = registrationDate.slice(0, 4);
  let registrationMonth = registrationDate.slice(5, 7);
  let registrationDay = registrationDate.slice(8);

  let vehicleRegistrationDate = parseInt(
    registrationYear + registrationMonth + registrationDay
  );

  if (vehicleRegistrationDate > today) {
    fieldErrors.vehDateRegistered.invalid = true;
  } else {
    fieldErrors.vehDateRegistered.invalid = false;
  }

  return fieldErrors;
};
