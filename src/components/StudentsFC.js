import React from 'react';
import {Link} from 'react-router-dom';


  export default class StudentsFC extends React.Component {
      constructor() {
          super();
          this.state = {
              students: [],
             
          }
      }
      



      render() {
          const {stu} = this.props;
          const datem = stu.dateOfBirth;
          return(
              <>
            <tr>
                <td>{this.props.index + 1}</td>
                <td>{stu.firstName}</td>
                <td>{stu.lastName}</td>
                <td>{datem}
              
               </td>
                <td><Link to={`/student/${stu.ID}`}><span><i className="fa fa-pencil-square" aria-hidden="true"></i></span></Link></td>
                <td><i className="fa fa-search" aria-hidden="true"></i></td>
            </tr>
           
            </>
          )
      }

    }
