import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";

export default class ComponentServiceSuppliers extends Component {
  cajaID = React.createRef();
  state = {
    suppliers: [],
    buscado: 0,
  };
  loadCutomers = () => {
    let request='Suppliers'
    axios.get(Global.urlNorthwind+request).then((response) => {
      this.setState({
        suppliers: response.data.value,
      });
    });
  };
  componentDidMount = () => {
    this.loadCutomers();
  };

  searchSupplier = (event) => {
    event.preventDefault();
    this.state.suppliers.map((supplier, index) => {
      if (this.cajaID.current.value == supplier.SupplierID) {
        this.setState({
          buscado: { id: supplier.SupplierID, name: supplier.ContactName },
        });
      }
    });
  };

  render() {
    return (
      <div>
        <h1>ComponentServiceSuppliers</h1>
        {this.state.suppliers.map((supplier, index) => {
          return (
            <h4 key={index} style={{ color: "blue" }}>
              ID: {supplier.SupplierID}, Nombre de Contacto:{" "}
              {supplier.ContactName}
            </h4>
          );
        })}
        <form onSubmit={this.searchSupplier}>
          <label>ID buscdo</label>
          <input type="text" ref={this.cajaID} />
          <button type="submit">Buscar</button>
        </form>
        <h3>Encontrado</h3>
        <p>
          {this.state.buscado.id}/{this.state.buscado.name}
        </p>
      </div>
    );
  }
}
