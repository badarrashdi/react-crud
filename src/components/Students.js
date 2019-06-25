import React from 'react';
import axios from 'axios';
import StudentsFC from './StudentsFC';
import Modal from 'react-modal';
import AddStudent from './AddStudent'
  export default class Students extends React.Component {
      constructor() {
          super();
          this.state = {
              students: [],
              nationality:[]
          }
      }
      componentDidUpdate() {
        Modal.setAppElement('body');
    }
      openModal = () => {
        this.setState({
          modalIsOpen: !this.state.modalIsOpen
        });
      }
      
      addStudent = (ID, firstName, lastName, dateOfBirth, studentNationality) => {
      const employee = {
          ID,
          firstName,
          lastName,
          dateOfBirth,
          studentNationality
      }
     
    const {match: {params}}= this.state;
      console.log('IDDD '+ params);
      axios.all([
        axios.post(`http://localhost:8088/api/Students`, employee),
        axios.post(`http://localhost:8088/api/Students/${params.id}/Nationality/${studentNationality}`, employee)
      ])
      .then(axios.spread( (emp, nat) => {

       this.setState({
        students: [...this.state.students, emp.data],
          nationality: [...this.state.nationality, nat.data]
       })
       
       
      }));
      console.log('Repositories', this.state.students);
        this.openModal();
      }

      
      componentDidMount() {
        axios.get(`http://localhost:8088/api/Students`)
          .then(res => {
            const students = res.data;
            this.setState({ students });
          })
          .catch(error => {
            console.log('error')
          })
      }


      render() {
          const { students } = this.state;
          return(
            <div className="container">
            <h2>Hover Rows</h2>
            <button className="btn btn-primary" onClick={this.openModal}><i className="fa fa-search" aria-hidden="true"></i></button>
            <p>The .table-hover class enables a hover state (grey background on mouse over) on table rows:</p>            
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>SL No.</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Date of Birth</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                  {students.map((stu, index) => {
                      return (
                          <StudentsFC key={index} index={index} stu={stu} />
                        
                      )
                  })}
               
              </tbody>
            </table>
            <React.Fragment>
            <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
        >
          <button onClick={this.openModal} className="close">Close</button>
            <h1>Add Student</h1>

            <AddStudent addStudent={this.addStudent} />
        </Modal>
            </React.Fragment>
          </div>
          )
      }
  }