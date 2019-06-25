import React from 'react';
import axios from 'axios';


  export default class Students extends React.Component {
      constructor() {
          super();
          this.state = {
              student: '',
              studentNationality:[],
              nationalities:[],
              familyM:[],
              modalIsOpen: false
          }
      }

      componentDidMount() {
        const that = this;
          const {match : {params}} = this.props
    
        axios.all([
         axios.get(`http://localhost:8088/api/Students/${params.id}`),
          axios.get(`http://localhost:8088/api/Students/${params.id}/Nationality`),
          axios.get(`http://localhost:8088/api/Nationalities`),
          //axios.get(`http://localhost:8088/api/Students/${params.id}/FamilyMembers`),
        ])
        .then(axios.spread(function (userResponse, reposResponse, nationals, fm) {
         const student = userResponse.data;
         const nato = reposResponse.data;
        const nationalities = nationals.data;
         const studentNationality = nato.nationality;
        // const familyM = fm.data;
         that.setState({
           student: student,
          studentNationality:studentNationality,
        //  nationalities: nationalities,
        //  familyM: familyM
         })
         
         // console.log('User', student);
          console.log('Repositories', studentNationality);
        }));


   
      }
    
      render(){
         // const {student, studentNationality, nationalities, familyM} = this.state;
         const {student, studentNationality} = this.state;

          //console.log(familyM)
          return(
           <div className="container">
             
              <table className="table">
               <tbody>
              
              <tr>
                <td>{student.firstName}</td>
                </tr>
                <tr>
                <td>{student.lastName}</td>
                </tr>
                <tr>
                <td>{student.dateOfBirth}</td>
                </tr>
                <tr>
                <td>
                
               
                {studentNationality.ID}
                </td>
                </tr>

               </tbody>
              </table>
 
           </div>
          
          )
      }
    }