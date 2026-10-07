import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global'

export default class EmpleadosOficios extends Component {
  
    selectOficios=React.createRef()
    
    urlOficios=Global.urlEmpleadosOficios
    state={
        empleados:[],
        oficios:[]
    }

    loadOficios=()=>{
    
    let request='api/empleados'
    axios.get(this.urlOficios+request).then((response)=>{
        
        let aux=[...new Set(response.data.map(elem=> elem.oficio))]
        
        this.setState({
            oficios:aux
        })
        
       
    })


  }

  buscarEmpleados=(event)=>{
    event.preventDefault()
    let oficio=this.selectOficios.current.value
    let request='api/empleados/empleadosoficio/'+oficio
    axios.get(this.urlOficios+request).then((response)=>{
        this.setState({
            empleados:response.data
        })
    })
  }
  componentDidMount=()=>{
    this.loadOficios()
  }

    render() {
    return (
      <div>
        <h1>Api Empleados Oficios</h1>
        <form action="">
            <label htmlFor="">Seleciona oficio</label>
            <select ref={this.selectOficios}>
                {
                    
                    this.state.oficios.map((oficio,index)=>{
                        return(<option value={oficio} key={index}>{oficio}</option>)
                    })
            
                }
            </select>
            <button onClick={this.buscarEmpleados}>Buscar</button>
        </form>
        <table>
            <thead>
                <tr>
                <th>Apellido</th>
                <th>Oficio</th>
                <th>Salario</th>
            </tr>
            </thead>
            <tbody>
                {
                    this.state.empleados.map((empleado,index)=>{
                        return(
                            <tr key={index}>
                                <td>{empleado.apellido}</td>
                                <td>{empleado.oficio}</td>
                                <td>{empleado.salario}</td>

                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
      </div>
    )
  }
}
