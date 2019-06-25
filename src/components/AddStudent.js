import React from 'react';
import axios from 'axios';
  export default class AddStudent extends React.Component {
      constructor() {
          super();
          this.state = {
                ID:'',
                firstName: '',
                lastName: '',
                dateOfBirth:'',
                nationalities: [],
                studentNationality: '',

          }
      }
      getValue = event => {
          this.setState({
            [event.target.name]: event.target.value
          })
          console.log(event.target.name+'pp'+event.target.value);
      }
      addStudent = e => {
        e.preventDefault();
        this.props.addStudent(this.state.ID, this.state.firstName, this.state.lastName, this.state.dateOfBirth, this.state.studentNationality)

      }
      componentDidMount() {
        axios.get(`http://localhost:8088/api/Nationalities`)
        .then(res => {
          const nationalities = res.data;
          this.setState({ nationalities });
        })
        .catch(error => {
          console.log('error')
        })
      }
   
      render(){

          return(
           <div className="container">
                <form onSubmit={this.addStudent}>
                    <table className="table">
                        <tbody>
                       
                            <tr>
                                <td>First Name</td>
                                <td><input type="text" className="form-control" name="firstName" value={this.state.firstName} onChange={this.getValue} /></td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td><input type="text" className="form-control" name="lastName" value={this.state.lastName} onChange={this.getValue} /></td>
                            </tr>
                            <tr>
                                <td>Date of Birth</td>
                                <td><input type="date" className="form-control" name="dateOfBirth" value={this.state.dateOfBirth} onChange={this.getValue} /></td>
                            </tr>
                            <tr>
                                <td>Nationalities</td>
                                <td>
                                    <select multiple={false} className="form-control" name="studentNationality" value={this.state.studentNationality} onChange={this.getValue} >
                                        <option value="">Select Nationalitiy</option>
                                    {this.state.nationalities.map((n,i) => {
                                        return <option key={i} value={n.ID}>{n.Title}</option>
                                    })}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><input type="submit" className="btn btn-primary" value="Add Student" /></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
             
           </div>
          
          )
      }
    }