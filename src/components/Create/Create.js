import React, { useState } from "react";
import { Button, Form, Radio } from "semantic-ui-react";
import axios from "axios";

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
  const [commercialUse, setCommercialUse] = useState("");
  const [regStateUse, setRegStateUse] = useState("");
  const [vehCurrentValue, setVehCurrentValue] = useState("");
  const [vehDateRegistered, setVehDateRegistered] = useState("");

  // errors
  const [messages, setMessages] = useState([]);
  const errMsgsElement = document.getElementById("errMessages");

  // Options for drop downs
  const prefixOptions = [
    { key: "Mr", value: "Mr", text: "Mr" },
    { key: "Mrs", value: "Mrs", text: "Mrs" },
    { key: "Miss", value: "Miss", text: "Miss" },
    { key: "Ms", value: "Ms", text: "Ms" },
  ];

  const vehTypeOptions = [
    { key: "Cabriolet", value: "Cabriolet", text: "Cabriolet" },
    { key: "Coupe", value: "Coupe", text: "Coupe" },
    { key: "Estate", value: "Estate", text: "Estate" },
    { key: "Hatchback", value: "Hatchback", text: "Hatchback" },
    { key: "Other", value: "Other", text: "Other" },
  ];

  const engSizeOptions = [
    { key: "1000", value: "1000", text: "1000" },
    { key: "1600", value: "1600", text: "1600" },
    { key: "2000", value: "2000", text: "2000" },
    { key: "2500", value: "2500", text: "2500" },
    { key: "3000", value: "3000", text: "3000" },
    { key: "Other", value: "Other", text: "Other" },
  ];

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
    let errMsgs = [];

    errMsgs = validatePrefix(prefix, errMsgs);
    errMsgs = validateFirstName(firstName, errMsgs);
    errMsgs = validateLastName(lastName, errMsgs);
    errMsgs = validateTelephoneNumber(telephoneNumber, errMsgs);

    if (errMsgs.length > 0) {
      alert(errMsgs.join("\n"));
    } else {
      callMockAPI();
    }
  };

  const validatePrefix = (prefix, errMsgs) => {
    const errText = "Prefix is a required field";

    if (prefix == "" || prefix == null || prefix == undefined) {
      errMsgs.push(errText);
      return errMsgs;
    }

    return errMsgs;
  };

  const validateFirstName = (firstName, errMsgs) => {
    const errText = "First name is a required field";

    if (firstName == "" || firstName == null || firstName == undefined) {
      errMsgs.push(errText);
      return errMsgs;
    }

    return errMsgs;
  };

  const validateLastName = (lastName, errMsgs) => {
    const errText = "Last name is a required field";

    if (lastName == "" || lastName == null || lastName == undefined) {
      errMsgs.push(errText);
      return errMsgs;
    }

    return errMsgs;
  };

  const validateTelephoneNumber = (telephoneNumber, errMsgs) => {
    const errText1 = "Telephone number is a required field";
    const errText2 = "Telephone number should be 11 digits long";

    if (
      telephoneNumber == "" ||
      telephoneNumber == null ||
      telephoneNumber == undefined
    ) {
      errMsgs.push(errText1);
      return errMsgs;
    }

    if (telephoneNumber.length < 11 || telephoneNumber.length > 11) {
      errMsgs.push(errText2);
      return errMsgs;
    }

    return errMsgs;
  };

  return (
    <div>
      <div id="errMessages"></div>
      <Form>
        <Form.Field>
          <label>Prefix</label>
          <Form.Select
            placeholder="Please Select"
            options={prefixOptions}
            onChange={(e, { value }) => setPrefix(value)}
            value={prefix}
          />
        </Form.Field>
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Telephone Number</label>
          <input
            placeholder="Telephone Number"
            onChange={(e) => setTelephoneNumber(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Address Line 1</label>
          <input
            placeholder="Address Line 1"
            onChange={(e) => setAddressLine1(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Address Line 2</label>
          <input
            placeholder="Address Line 2"
            onChange={(e) => setAddressLine2(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>City</label>
          <input placeholder="City" onChange={(e) => setCity(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Postcode</label>
          <input
            placeholder="Postcode"
            onChange={(e) => setPostcode(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Vehicle type</label>
          <Form.Select
            placeholder="Please Select"
            options={vehTypeOptions}
            onChange={(e, { value }) => setVehicleType(value)}
            value={vehicleType}
          />
        </Form.Field>
        <Form.Field>
          <label>Engine size</label>
          <Form.Select
            placeholder="Please Select"
            options={engSizeOptions}
            onChange={(e, { value }) => setEngineSize(value)}
            value={engineSize}
          />
        </Form.Field>
        <Form.Field>
          <label>Additional Drivers</label>
          <input
            type="number"
            min="0"
            placeholder="Additional Drivers"
            onChange={(e) => setAddDrivers(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          Will this vehicle be used for commercial purposes?
        </Form.Field>
        <Form.Group>
          <Form.Field>
            <Radio
              label="Yes"
              name="radioGroupComUse"
              value="Yes"
              checked={commercialUse === "Yes"}
              onChange={(e, { value }) => setCommercialUse(value)}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="No"
              name="radioGroupComUse"
              value="No"
              checked={commercialUse === "No"}
              onChange={(e, { value }) => setCommercialUse(value)}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          Will this vehicle be used outside the registered state??
        </Form.Field>
        <Form.Group>
          <Form.Field>
            <Radio
              label="Yes"
              name="radioGroupRegState"
              value="Yes"
              checked={regStateUse === "Yes"}
              onChange={(e, { value }) => setRegStateUse(value)}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="No"
              name="radioGroupRegState"
              value="No"
              checked={regStateUse === "No"}
              onChange={(e, { value }) => setRegStateUse(value)}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label>Current value of vehicle?</label>
          <input
            type="number"
            min="0"
            max="50000"
            placeholder="Current value"
            onChange={(e) => setVehCurrentValue(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Date of first registration:</label>
          <input
            type="date"
            onChange={(e) => setVehDateRegistered(e.target.value)}
          />
        </Form.Field>
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Create;
