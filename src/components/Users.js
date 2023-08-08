import React, { Component } from 'react'
import User from './User'
import UserConsumer from '../context';
//ders 18 - props driling

 class Users extends Component {
  render() {
    const {users} = this.props;


    return (
      <UserConsumer>
        {value => {
          const {users} = value;
           return (
      <div>
        {
          users.map(user => {
            return (
              <User
              key={user.id}
              id={user.id}
                name = {user.names}
                salary = {user.salary}
                department = {user.department}
             />
            )
          })
        }
      </div>
    )
        }}
       </UserConsumer>
    )
   


  }
}


export default Users;