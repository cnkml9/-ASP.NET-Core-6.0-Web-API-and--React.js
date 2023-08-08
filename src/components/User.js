import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserConsumer from '../context'
//impt ile kısayol ekle 



 class User extends Component {

  // constructor(props){
  //   super(props);

  //   this.state = {
  //     isVisible:true
  //   }
  // }

  state ={
    isVisible: false
  }

  static defaultProps = {
    names: 'Default',
    department: 'Software',
    salary: '500000'
  }

  onClickEvent = (number,e) => {
   
    this.setState({
      isVisible: !this.state.isVisible
    })
  }

  onDeleteUser = (dispatch,e) => {
    const {id} =this.props;
    dispatch({type:"DELETE_USER",payload:id});
  }

  componentWillUnmount(){
    //silindikten sonraki işlemleri
    console.log("unmount");
  }

  render() {
    //Destruscting
    const { department, salary,id,names} = this.props
    const {isVisible} = this.state

 


    return (
      <UserConsumer>
      {
        value =>{
          const {dispatch} = value;
          return(
              <div className='col-md-8 mb-4' >
  <div className='card' style={isVisible ? {backgroundColor:'#192a56',color:'white'} : null}>
    <div className="card-header d-flex justify-content-between">
      <h4 className="d-inline" onClick={this.onClickEvent.bind(this,42)}>{names}</h4>
      <i onClick={this.onDeleteUser.bind(this,dispatch)}
       className='fa fa-trash-o' style={{cursor: 'pointer'}}   ></i>
    </div>
    {
      isVisible ?<div className="card-body">
       <p className="card-text">ID: {id}</p>
      <p className="card-text">Salary: {salary}</p>
      <p className="card-text">Department: {department}</p>
    </div>:null
    }


  </div>
</div> 
          )
        }
      }
      </UserConsumer> 
    )
  }
}

User.propTypes ={
  names: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}


export default User;

