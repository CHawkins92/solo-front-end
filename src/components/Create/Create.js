import React, { useState, useEffect } from "react";
import { Button, Form, Divider, Segment, Image } from "semantic-ui-react";
import axios from "axios";
import * as ErrorMsgConstants from "./ErrorMessages.js";
import * as DropDownOptions from "./DropdownOptions";
import logo from "./allstate_logo.jpg";

function Create() {
  // Properties mapping to form fields
  const [prefix, setPrefix] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [engineSize, setEngineSize] = useState("");
  const [addDrivers, setAddDrivers] = useState("");
  const [commercialUse, setCommercialUse] = useState("No");
  const [regStateUse, setRegStateUse] = useState("No");
  const [vehCurrentValue, setVehCurrentValue] = useState("");
  const [vehDateRegistered, setVehDateRegistered] = useState("");

  // Field error status, all initialized false
  const [fieldErrors, setFieldErrors] = useState({
    prefix: false,
    firstName: false,
    lastName: false,
    telephoneNumber: {
      missing: false,
      invalid: false,
    },
    addressLine1: false,
    city: false,
    postcode: false,
    vehicleType: false,
    engineSize: false,
    addDrivers: false,
    commercialUse: false,
    regStateUse: false,
    vehCurrentValue: false,
    vehDateRegistered: false,
  });

  const callMockAPI = () => {
    const formData = {
      prefix,
      firstName,
      lastName,
      telephoneNumber,
      addressLine1,
      addressLine2,
      city,
      postcode,
      vehicleType,
      engineSize,
      addDrivers,
      commercialUse,
      regStateUse,
      vehCurrentValue,
      vehDateRegistered,
    };

    const endpointURL =
      "https://6156de01e039a0001725ac37.mockapi.io/api/vi/customerDetails";

    axios
      .post(endpointURL, formData)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let formValidFlag = true;

    formValidFlag = validatePrefix(prefix);
    formValidFlag = validateFirstName(firstName);
    formValidFlag = validateLastName(lastName);
    formValidFlag = validateTelephoneNumber(telephoneNumber);
    formValidFlag = validateAddressLine1(addressLine1);
    formValidFlag = validateCity(city);
    formValidFlag = validatePostcode(postcode);
    formValidFlag = validateVehicleType(vehicleType);
    formValidFlag = validateEngineSize(engineSize);
    formValidFlag = validateAdditionalDrivers(addDrivers);
    formValidFlag = validateVehicleCurrentValue(vehCurrentValue);
    formValidFlag = validateDateRegistered(vehDateRegistered);

    if (formValidFlag) {
      callMockAPI();
    } else {
      alert("Errors present");
    }
  };

  const validatePrefix = (prefix) => {
    if (prefix === "" || prefix === null || prefix === undefined) {
      fieldErrors.prefix = true;
      setFieldErrors({ ...fieldErrors });
      return false;
    }

    fieldErrors.prefix = false;
    setFieldErrors({ ...fieldErrors });
    return true;
  };

  const validateFirstName = (firstName) => {
    if (firstName === "" || firstName === null || firstName === undefined) {
      fieldErrors.firstName = true;
      setFieldErrors({ ...fieldErrors });
      return false;
    }

    fieldErrors.firstName = false;
    setFieldErrors({ ...fieldErrors });
    return true;
  };

  const validateLastName = (lastName) => {
    if (lastName === "" || lastName === null || lastName === undefined) {
      fieldErrors.lastName = true;
      setFieldErrors({ ...fieldErrors });
      return false;
    }

    fieldErrors.lastName = false;
    setFieldErrors({ ...fieldErrors });
    return true;
  };

  const validateTelephoneNumber = (telephoneNumber) => {
    if (
      telephoneNumber === "" ||
      telephoneNumber === null ||
      telephoneNumber === undefined
    ) {
      fieldErrors.telephoneNumber.missing = true;
      setFieldErrors({ ...fieldErrors });
      return false;
    }

    if (telephoneNumber.length < 10) {
      fieldErrors.telephoneNumber.missing = false;
      fieldErrors.telephoneNumber.invalid = true;
      setFieldErrors({ ...fieldErrors });
      return false;
    }

    fieldErrors.telephoneNumber.missing = false;
    fieldErrors.telephoneNumber.invalid = false;
    setFieldErrors({ ...fieldErrors });
    return true;
  };

  const validateAddressLine1 = (addressLine1) => {
    if (
      addressLine1 === "" ||
      addressLine1 === null ||
      addressLine1 === undefined
    ) {
      fieldErrors.addressLine1 = true;
      setFieldErrors({ ...fieldErrors });
      return false;
    }

    fieldErrors.addressLine1 = false;
    setFieldErrors({ ...fieldErrors });
    return true;
  };

  const validateCity = (city) => {
    if (city === "" || city === null || city === undefined) {
      fieldErrors.city = true;
      setFieldErrors({ ...fieldErrors });
      return false;
    }

    fieldErrors.city = false;
    setFieldErrors({ ...fieldErrors });
    return true;
  };

  const validatePostcode = (postcode) => {
    if (postcode === "" || postcode === null || postcode === undefined) {
      fieldErrors.postcode = true;
      setFieldErrors({ ...fieldErrors });
      return false;
    }

    fieldErrors.postcode = false;
    setFieldErrors({ ...fieldErrors });
    return true;
  };

  const validateVehicleType = (vehicleType) => {
    if (
      vehicleType === "" ||
      vehicleType === null ||
      vehicleType === undefined
    ) {
      fieldErrors.vehicleType = true;
      setFieldErrors({ ...fieldErrors });
      return false;
    }

    fieldErrors.vehicleType = false;
    setFieldErrors({ ...fieldErrors });
    return true;
  };

  const validateEngineSize = (engineSize) => {
    if (engineSize === "" || engineSize === null || engineSize === undefined) {
      fieldErrors.engineSize = true;
      setFieldErrors({ ...fieldErrors });
      return false;
    }

    fieldErrors.engineSize = false;
    setFieldErrors({ ...fieldErrors });
    return true;
  };

  const validateAdditionalDrivers = (addDrivers) => {
    if (addDrivers === "" || addDrivers === null || addDrivers === undefined) {
      fieldErrors.addDrivers = true;
      setFieldErrors({ ...fieldErrors });
      return false;
    }

    fieldErrors.addDrivers = false;
    setFieldErrors({ ...fieldErrors });
    return true;
  };

  const validateVehicleCurrentValue = (vehCurrentValue) => {
    if (
      vehCurrentValue === "" ||
      vehCurrentValue === null ||
      vehCurrentValue === undefined
    ) {
      fieldErrors.vehCurrentValue = true;
      setFieldErrors({ ...fieldErrors });
      return false;
    }

    fieldErrors.vehCurrentValue = false;
    setFieldErrors({ ...fieldErrors });
    return true;
  };

  const validateDateRegistered = (vehDateRegistered) => {
    if (
      vehDateRegistered === "" ||
      vehDateRegistered === null ||
      vehDateRegistered === undefined
    ) {
      fieldErrors.vehDateRegistered = true;
      setFieldErrors({ ...fieldErrors });
      return false;
    }

    fieldErrors.vehDateRegistered = false;
    setFieldErrors({ ...fieldErrors });
    return true;
  };

  const handleCommercialUseChange = (value) => {
    if (value) {
      setCommercialUse("Yes");
    } else {
      setCommercialUse("No");
    }
  };

  const handleRegStateUseChange = (value) => {
    if (value) {
      setRegStateUse("Yes");
    } else {
      setRegStateUse("No");
    }
  };

  return (
    <div>
      <Form className="main-form">
        {/* <div>
          <Image src={logo} className="center" />
        </div> */}
        <Segment color="blue">
          <Image src={logo} style={{ width: "960px", height: "300px" }} />
          <Divider horizontal>
            <b>Your Details</b>
          </Divider>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Prefix</label>
              <Form.Select
                placeholder="Please Select"
                options={DropDownOptions.prefixOptions}
                onChange={(e, { value }) => setPrefix(value)}
                value={prefix}
                error={
                  fieldErrors.prefix ? ErrorMsgConstants.PREFIX_REQUIRED : false
                }
              />
            </Form.Field>
            <Form.Field>
              <label>First Name</label>
              <Form.Input
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                error={
                  fieldErrors.firstName
                    ? ErrorMsgConstants.FIRST_NAME_REQUIRED
                    : false
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <Form.Input
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                error={
                  fieldErrors.lastName
                    ? ErrorMsgConstants.LAST_NAME_REQUIRED
                    : false
                }
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Telephone Number</label>
            <Form.Input
              placeholder="Telephone Number"
              onChange={(e) => setTelephoneNumber(e.target.value)}
              error={
                fieldErrors.telephoneNumber.missing
                  ? ErrorMsgConstants.TELEPHONE_NUMBER_REQUIRED
                  : fieldErrors.telephoneNumber.invalid
                  ? ErrorMsgConstants.TELEPHONE_NUMBER_INVALID
                  : false
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Address Line 1</label>
            <Form.Input
              placeholder="Address Line 1"
              onChange={(e) => setAddressLine1(e.target.value)}
              error={
                fieldErrors.addressLine1
                  ? ErrorMsgConstants.ADDRESS_LINE_1_REQUIRED
                  : false
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Address Line 2</label>
            <input
              placeholder="Address Line 2"
              onChange={(e) => setAddressLine2(e.target.value)}
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <label>City</label>
              <Form.Input
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
                error={
                  fieldErrors.city ? ErrorMsgConstants.CITY_REQUIRED : false
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Postcode</label>
              <Form.Input
                placeholder="Postcode"
                onChange={(e) => setPostcode(e.target.value)}
                error={
                  fieldErrors.postcode
                    ? ErrorMsgConstants.POSTCODE_REQUIRED
                    : false
                }
              />
            </Form.Field>
          </Form.Group>
        </Segment>
        <Segment color="blue">
          <Divider horizontal>
            <b>Vehicle Details</b>
          </Divider>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Vehicle type</label>
              <Form.Select
                placeholder="Please Select"
                options={DropDownOptions.vehTypeOptions}
                onChange={(e, { value }) => setVehicleType(value)}
                value={vehicleType}
                error={
                  fieldErrors.vehicleType
                    ? ErrorMsgConstants.VEHICLE_TYPE_REQUIRED
                    : false
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Engine size</label>
              <Form.Select
                placeholder="Please Select"
                options={DropDownOptions.engSizeOptions}
                onChange={(e, { value }) => setEngineSize(value)}
                value={engineSize}
                error={
                  fieldErrors.engineSize
                    ? ErrorMsgConstants.ENGINE_SIZE_REQUIRED
                    : false
                }
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Additional Drivers</label>
            <Form.Input
              type="number"
              min="0"
              placeholder="Additional Drivers"
              onChange={(e) => setAddDrivers(e.target.value)}
              error={
                fieldErrors.addDrivers
                  ? ErrorMsgConstants.ADDITIONAL_DRIVERS_REQUIRED
                  : false
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Will this vehicle be used for commercial purposes?</label>
          </Form.Field>
          <Form.Field>
            <Form.Checkbox
              toggle
              label={"Selected value: " + commercialUse}
              onChange={(e, data) => handleCommercialUseChange(data.checked)}
            />
          </Form.Field>
          <Form.Field>
            <label>
              Will this vehicle be used outside the registered state?
            </label>
          </Form.Field>
          <Form.Field>
            <Form.Checkbox
              toggle
              label={"Selected value: " + regStateUse}
              onChange={(e, data) => handleRegStateUseChange(data.checked)}
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Current value of vehicle?</label>
              <Form.Input
                type="number"
                min="0"
                max="50000"
                placeholder="Current value"
                onChange={(e) => setVehCurrentValue(e.target.value)}
                error={
                  fieldErrors.vehCurrentValue
                    ? ErrorMsgConstants.CURRENT_VALUE_REQUIRED
                    : false
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Date of first registration:</label>
              <Form.Input
                type="date"
                onChange={(e) => setVehDateRegistered(e.target.value)}
                error={
                  fieldErrors.vehDateRegistered
                    ? ErrorMsgConstants.DATE_REGISTERED_REQUIRED
                    : false
                }
              />
            </Form.Field>
          </Form.Group>
        </Segment>
        <Segment>
          <Button fluid basic color="blue" type="submit" onClick={handleSubmit}>
            <b>Get a Quote!</b>
          </Button>
        </Segment>
      </Form>
    </div>
  );
}

export default Create;
