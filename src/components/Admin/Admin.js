import React, { useState } from "react";
import "./Admin.css";
import {
  Table,
  Button,
  Form,
  Divider,
  Container,
  Segment,
  Icon,
  Header,
  Image,
} from "semantic-ui-react";
import axios from "axios";
import logo from "../../assets/images/allstate_logo.jpg";
import * as FieldValidator from "./FormFieldsValidator";

function Admin() {
  const [idToGet, setIdToGet] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const [telephoneNumber, setTelephoneNumber] = useState(null);
  const [customerData, setCustomerData] = useState(null);

  // Field error status, all initialized false. true indicates error is present in field
  const [fieldErrors, setFieldErrors] = useState({
    idToGet: {
      missing: false,
      noMatch: false,
    },
    idToDelete: {
      missing: false,
      noMatch: false,
    },
    idToUpdate: {
      missing: false,
      noMatch: false,
    },
    telephoneNumber: {
      missing: false,
      invalid: false,
    },
  });


  /*
  ==============================
   API functions
  ==============================
  */
  function callAPIWithAxiosGET(idToGet) {
    const endpointURL = "http://localhost:8080/customerDetails?id=" + idToGet;

    axios
      .get(endpointURL)
      .then((response) => {
        setCustomerData(response.data);

        // If no data returned, assume no matching driver
        if (!response.data) {
          fieldErrors.idToGet.noMatch = true;
          setFieldErrors({ ...fieldErrors });
        } else {
          fieldErrors.idToGet.noMatch = false;
          setFieldErrors({ ...fieldErrors });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function callAPIWithAxiosDELETE() {
    const endpointURL =
      "http://localhost:8080/customerDetails?id=" + idToDelete;

    axios
      .delete(endpointURL)
      .then((response) => {
        if (response.status === 200 && idToGet === idToDelete) {
          alert("Customer has been deleted successfully");
          setCustomerData(null);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("customer does not exist");
      });
  }

  function callAPIWithAxiosPUT() {
    const formData = {
      telephoneNumber,
    };

    const endpointURL =
      "http://localhost:8080/customerDetails?id=" +
      idToUpdate +
      "&newTelephoneNumber=" +
      telephoneNumber;

    // if telephone number is valid call axios
    if (FieldValidator.validateTelephoneNumber(formData.telephoneNumber)) {
      axios
        .put(endpointURL, formData)
        .then((response) => {
          if (response.status === 200 && idToGet === idToUpdate) {
            callAPIWithAxiosGET();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Telephone number is invalid");
    }
  }


    /*
  ==============================
   Helper functions
  ==============================
  */
  const getFormattedName = () => {
    return (
      customerData.prefix +
      " " +
      customerData.firstName +
      " " +
      customerData.lastName
    );
  };

  const getFormattedQuote = () => {
    return "£ " + customerData.quotedAmount;
  };

  const customerDataTable = () => {
    if (customerData != null) {
      return (
        <Container textAlign="center">
          <Segment color="blue">
            <Divider horizontal>
              <Header as="h4">
                <Icon name="address book" color="blue" />
                Customer Details
              </Header>
            </Divider>
            <p>{getFormattedName()}</p>
            <p>{customerData.telephoneNumber}</p>
            <p>{customerData.addressLine1}</p>
            <p>{customerData.addressLine2}</p>
            <p>{customerData.city}</p>
            <p>{customerData.postcode}</p>
            <Divider horizontal>
              <Header as="h4">
                <Icon name="car" color="blue" />
                Vehicle Details
              </Header>
            </Divider>
            <Table definition>
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={4}>Vehicle Type</Table.Cell>
                  <Table.Cell>{customerData.vehicleType}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Engine Size</Table.Cell>
                  <Table.Cell>{customerData.engineSize}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Additional Drivers</Table.Cell>
                  <Table.Cell>{customerData.addDrivers}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Commercial Use</Table.Cell>
                  <Table.Cell>{customerData.commercialUse}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Registered State Use Only</Table.Cell>
                  <Table.Cell>{customerData.regStateUse}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Current Value</Table.Cell>
                  <Table.Cell>{customerData.vehCurrentValue}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Date Registered</Table.Cell>
                  <Table.Cell>{customerData.vehDateRegistered}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Divider horizontal>
              <Header as="h4">
                <Icon name="pound sign" color="green" />
                Quoted Amount
              </Header>
            </Divider>
            <b>{getFormattedQuote()}</b>
          </Segment>
        </Container>
      );
    }
  };

  return (
    <div>
      <Form>
      <Segment color="blue">
        <Image className="allstate-img-admin" src={logo} />
        <Divider horizontal>
          <Header as="h4" color="blue">
            <Icon name="address book" color="blue" />
            View Driver Details
          </Header>
        </Divider>
        <Form.Group widths="equal">
          <Form.Field>
            <Form.Input
              placeholder="Enter driver's Id"
              onChange={(e) => setIdToGet(e.target.value)}
              error={
                fieldErrors.idToGet.noMatch
                  ? "Driver does not exist"
                  : fieldErrors.idToGet.missing
                  ? "Please enter a driver id"
                  : false
              }
            />
          </Form.Field>
          <Button
            basic
            color="green"
            type="submit"
            onClick={() => callAPIWithAxiosGET(idToGet)}
          >
            View
          </Button>
        </Form.Group>
        {customerDataTable()}
        <div class="ui hidden section divider"></div>
        <Divider horizontal>
          <Header as="h4" color="blue">
            <Icon name="user delete" color="blue" />
            Delete a Driver
          </Header>
        </Divider>
        <Form.Group widths="equal">
          <Form.Field>
            <Form.Input
              placeholder="Enter driver's Id"
              onChange={(e) => setIdToDelete(e.target.value)}
              error={
                fieldErrors.idToDelete.noMatch
                  ? "Driver does not exist"
                  : fieldErrors.idToDelete.missing
                  ? "Please enter a driver id"
                  : false
              }
            />
          </Form.Field>
          <Button
            basic
            color="red"
            type="submit"
            onClick={callAPIWithAxiosDELETE}
          >
            Delete
          </Button>
        </Form.Group>
        <div class="ui hidden section divider"></div>
        <Divider horizontal>
          <Header as="h4" color="blue">
            <Icon name="phone square" color="blue" />
            Update Telephone Number
          </Header>
        </Divider>
        <Form.Group widths="equal">
          <Form.Field>
            <Form.Input
              placeholder="Enter driver's Id"
              onChange={(e) => setIdToUpdate(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              placeholder="Enter telephone number"
              onChange={(e) => setTelephoneNumber(e.target.value)}
            />
          </Form.Field>
          <Button
            basic
            color="yellow"
            type="submit"
            onClick={callAPIWithAxiosPUT}
          >
            Update
          </Button>
        </Form.Group>
        </Segment>
      </Form>
    </div>
  );
}

export default Admin;
