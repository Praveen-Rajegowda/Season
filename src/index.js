import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from "./Spinner";




class App extends React.Component{


    state ={lat:null,errorMessage:''};

   componentDidMount() {
        console.log("My Component was rendered to the screen");
       window.navigator.geolocation.getCurrentPosition(
           (position) => {
               this.setState({lat : position.coords.latitude })
           },
           (err) => this.setState({errorMessage : err.message} )
       );

   }

   componentDidUpdate() {
        console.log("My component was just updated - It rerendered ");
   }

   componentWillUnmount() {
        console.log("UnMount");
   }

   renderContent(){
       if(this.state.errorMessage && !this.state.lat)
           return <h1>Error : {this.state.errorMessage}</h1>;
       else if(!this.state.errorMessage && this.state.lat)
           return <SeasonDisplay test={this.state.lat}/>;

       return <Spinner message="Please accept a location request"/>;
   }

    render() {
        return (
            <div className="border red">
                { this.renderContent() }
            </div>
        );
    }
}


ReactDOM.render(<App />, document.querySelector('#root'));



