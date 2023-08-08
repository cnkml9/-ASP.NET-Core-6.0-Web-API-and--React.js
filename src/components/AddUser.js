import { isVisible } from '@testing-library/user-event/dist/utils';
import React, { Component } from 'react'
import posed from 'react-pose';
import UserConsumer from '../context';

var uniqid = require('uniqid');

const Animation = posed.div(
    {
        visible:{
            opacity:1,
            applyAtStart:{
                display:'block'
            }
        },
        hidden:{
            opacity:0,
            applyAtStart:{
                display:'none'
            }
        }
    }
);

 class AddUser extends Component {

    state ={
        visible:false,
        names:"",
        department:"",
        salary:"" 
    }

    changeVisible = (e)=> {
        this.setState({
            visible:!this.state.visible
        })
    }


    changeInput = (e) =>
    {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    addUser = (dispatch,e) =>
    {
       //sayfanın yenilenmesini engelliyen method e.preventDefault();
        e.preventDefault();
        const {names,department,salary} = this.state;
        const newUser = {
            id:uniqid(),
            names: names,
            department: department,
            salary: salary
        }
        dispatch({type:"ADD_USER",payload:newUser});

    }

//reat Pose -- add to animation package

  render() {
    const {visible,names,department,salary} = this.state
    
    return <UserConsumer>
        {
            value=>{
                const {dispatch} = value;
                return (
                    <div className='col-md-8 mb-4'>

                    <button onClick={this.changeVisible} className='btn btn-danger btn-block mb-2'>{visible ? 'Hide' : 'Show'}</button>
                    <Animation pose={visible ? 'visible' : 'hidden'}>
                    <div className="card">
                      <div className="card-header d-flex justify-content-between">
                        <h4 className='d-inline'>Add User Form</h4>
                      </div>
                      <div className="card-body">
                        <form onSubmit={this.addUser.bind(this,dispatch)}>
                          <div className="form-group">
                            <label htmlFor="names">Names</label>
                            <input value={names} onChange={this.changeInput} type="text" name="names" className="form-control" id="names" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="department">Department</label>
                            <input value={department} onChange={this.changeInput}  type="text" name="department" className="form-control" id="department" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="salary">Salary</label>
                            <input value={salary} onChange={this.changeInput} type="text" name="salary" className="form-control" id="salary" />
                          </div>
                          <button type="submit"  className="btn btn-dark">Add User</button>
                        </form>
                      </div>
                    </div>
                    </Animation>
                  </div>
                )
            }
        }


    </UserConsumer>
    
    
   
 
  }
}


export default AddUser;