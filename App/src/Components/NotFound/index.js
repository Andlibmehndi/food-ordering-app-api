import React, { Component } from 'react'

 class Notfound extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              
         }
     }
     
     handleClick = () =>{
        this.props.history.push({
            pathname: '/',
            state: { detail: "Test" }
        })
     }
    render() {
        return (
            <div>
                <h1>404 Page not found :( </h1>
                <button onClick={this.handleClick}>Go home</button>
            </div>
        )
    }
}

export default Notfound;
