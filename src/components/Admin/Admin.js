import React, { useState } from "react";
import "./Admin.css";
import { Table, Button, Form } from "semantic-ui-react";
import axios from "axios";

function Admin() {
  const [idToGet, setIdToGet] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const [telephoneNumber, setTelephoneNumber] = useState(null);
  const [customerData, setCustomerData] = useState(null);

  function callMockAPIWithAxiosGET() {
    const endpointURL =
      "https://6156de01e039a0001725ac37.mockapi.io/api/vi/customerDetails/" +
      idToGet;

    axios
      .get(endpointURL)
      .then((response) => setCustomerData(response.data))
      .catch((err) => {
        console.log(err);
      });
  }

  function callMockAPIWithAxiosDELETE() {
    const endpointURL =
      "https://6156de01e039a0001725ac37.mockapi.io/api/vi/customerDetails/" +
      idToDelete;

    axios.delete(endpointURL).catch((err) => {
      console.log(err);
    });
  }

  function callMockAPIWithAxiosPUT() {
    const formData = {
      telephoneNumber,
    };

    const endpointURL =
      "https://6156de01e039a0001725ac37.mockapi.io/api/vi/customerDetails/" +
      idToUpdate;

    axios.put(endpointURL, formData).catch((err) => {
      console.log(err);
    });
  }

  // Populates a table with customer data if customerDate != null
  const renderDataTable = () => {
    if (customerData != null) {
      return (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Prefix</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Telephone Number</Table.HeaderCell>
              <Table.HeaderCell>Address Line 1</Table.HeaderCell>
              <Table.HeaderCell>Address Line 2</Table.HeaderCell>
              <Table.HeaderCell>City</Table.HeaderCell>
              <Table.HeaderCell>Postcode</Table.HeaderCell>
              <Table.HeaderCell>Vehicle Type</Table.HeaderCell>
              <Table.HeaderCell>Engine Size</Table.HeaderCell>
              <Table.HeaderCell>Additional Drivers</Table.HeaderCell>
              <Table.HeaderCell>Commercial Use</Table.HeaderCell>
              <Table.HeaderCell>Register State Use Only</Table.HeaderCell>
              <Table.HeaderCell>Vehicle Current Value</Table.HeaderCell>
              <Table.HeaderCell>Vehicle Date Registered</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>{customerData.id}</Table.Cell>
              <Table.Cell>{customerData.prefix}</Table.Cell>
              <Table.Cell>{customerData.firstName}</Table.Cell>
              <Table.Cell>{customerData.lastName}</Table.Cell>
              <Table.Cell>{customerData.telephoneNumber}</Table.Cell>
              <Table.Cell>{customerData.addressLine1}</Table.Cell>
              <Table.Cell>{customerData.addressLine2}</Table.Cell>
              <Table.Cell>{customerData.city}</Table.Cell>
              <Table.Cell>{customerData.postcode}</Table.Cell>
              <Table.Cell>{customerData.vehicleType}</Table.Cell>
              <Table.Cell>{customerData.engineSize}</Table.Cell>
              <Table.Cell>{customerData.addDrivers}</Table.Cell>
              <Table.Cell>{customerData.commercialUse}</Table.Cell>
              <Table.Cell>{customerData.regStateUse}</Table.Cell>
              <Table.Cell>{customerData.vehCurrentValue}</Table.Cell>
              <Table.Cell>{customerData.vehDateRegistered}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );
    }
  };

  return (
    <div>
      <Form>
        <Form.Group width="equal">
          <Form.Field>
            <label>View Driver Details</label>
            <input
              placeholder="Enter driver's Id"
              onChange={(e) => setIdToGet(e.target.value)}
            />
          </Form.Field>
          <Button type="submit" onClick={callMockAPIWithAxiosGET}>
            Get Driver
          </Button>
        </Form.Group>
        {renderDataTable()}
        <Form.Group width="equal">
          <Form.Field>
            <label>Delete a Driver</label>
            <input
              placeholder="Enter driver's Id"
              onChange={(e) => setIdToDelete(e.target.value)}
            />
          </Form.Field>
          <Button type="submit" onClick={callMockAPIWithAxiosDELETE}>
            Delete Driver
          </Button>
        </Form.Group>
        <Form.Group width="equal">
          <Form.Field>
            <label>Driver ID</label>
            <input
              placeholder="Enter driver's Id"
              onChange={(e) => setIdToUpdate(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>New Telephone Number</label>
            <input
              placeholder="Enter new telephone number"
              onChange={(e) => setTelephoneNumber(e.target.value)}
            />
          </Form.Field>
          <Button type="submit" onClick={callMockAPIWithAxiosPUT}>
            Update Telephone Number
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Admin;