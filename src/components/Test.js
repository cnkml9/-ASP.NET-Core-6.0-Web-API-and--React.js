import React, { Component } from 'react'

 class Test extends Component {
    constructor(props){
        super(props);
        this.state = {
            a:10
        }
        console.log("constructor")

      }

      componentDidUpdate(){
        console.log("componentDidUpdate")
      }

      shouldComponentUpdate(){
        console.log("shouldComponentUpdate")
        return false
      }


    componentDidMount(){
        console.log("componentDidMount")
        //api istekleri burada
        this.setState({
            a:20
        })
    }  
     
  render() {
    console.log("render")
    return (
      <div>
        
      </div>
    )
  }
}

export default Test;