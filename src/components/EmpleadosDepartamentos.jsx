import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";
export default class EmpleadosDepartamentos extends Component {
  selectDepartamento = React.createRef();
  urlEmpleados = Global.urlApiEmpleados;
  urlDepartamentos= Global.urlApiDepartamentos
  state = {
    empleados: [],
    departamentos:[]
  };

  buscarEmpleados = (event) => {
    event.preventDefault();
    let idDepartamento = this.selectDepartamento.current.value;
    let request = "api/Empleados/EmpleadosDepartamento/" + idDepartamento;
    axios.get(this.urlEmpleados + request).then((response) => {
      this.setState({
        empleados: response.data,
      });
    });
  };

  loadDepartamentos=()=>{
    let request='/webresources/departamentos'
    axios.get(this.urlDepartamentos+request).then((response)=>{
        this.setState({
            departamentos:response.data
        })
    })
  }

  componentDidMount=()=>{
    this.loadDepartamentos()
  }



  render() {
    return (
      <div>
        <h1>Api Empleados Departamentos</h1>
        <form action="">
          <label>Introduzca id departamento</label>
          <select ref={this.selectDepartamento}>
            {
                this.state.departamentos.map((departamento,index)=>{
                    return(<option value={departamento.numero} key={index}>{departamento.nombre}</option>)
                })
            }
          </select>
          <button onClick={this.buscarEmpleados}>Buscar empleados</button>
        </form>
        <ul>
          {this.state.empleados.map((empleado, index) => {
            return (
              <li key={index}>
                {empleado.apellido},Oficio: {empleado.oficio}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
