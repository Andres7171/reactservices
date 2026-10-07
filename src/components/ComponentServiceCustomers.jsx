import React, { Component } from "react";
import axios from "axios";

export default class ComponentApiCustomers extends Component {
  state = {
    customers: [],
  };
  url = "https://services.odata.org/V4/Northwind/Northwind.svc/Customers";
  loadCutomers = () => {
    console.log("Antes del servicio");
    axios.get(this.url).then((response) => {
      console.log("Leyendo servicio");
      this.setState({
        customers: response.data.value,
      });
    });
    console.log("Despues deñ servicio");
  };

  componentDidMount = () => {
    this.loadCutomers();
  };

  render() {
    return (
      <div>
        <h1>Services Api Customers</h1>
        <button>Load Customers</button>
        {this.state.customers.map((customer, index) => {
          return (
            <h4 key={index} style={{ color: "blue" }}>
              Contacto: {customer.ContactName}, Titulo: {customer.ContactTitle}
            </h4>
          );
        })}
      </div>
    );
  }
}
