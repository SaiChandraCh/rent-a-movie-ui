import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class NavBar extends Component {
    handleMovie = () => {
        this.props.history.push("/movie");
    }
    handleClient = () => {
        this.props.history.push("/client");
    }
    handleInfo = () => {
        this.props.history.push("/rental-info");
    }

    render() {
        return (
            <div className="NavBar flex h-full border-b-2 bg-black text-grey-light">
                <h1 className="w-1/5 flex items-center sm:w-full md:w-full lg:w-1/5">Rent-a-Movie</h1>
                <div className="w-4/5 flex">
                    <button className="w-1/4 pl-2 flex items-center hover:bg-grey-light hover:text-black text-grey-light" onClick={() => this.handleMovie()}>Movies</button>
                    <button className="w-1/4 pl-2 flex items-center hover:bg-grey-light hover:text-black text-grey-light" onClick={() => this.handleClient()}>Clients</button>
                    <button className="w-1/4 pl-2 flex items-center hover:bg-grey-light hover:text-black text-grey-light" onClick={() => this.handleInfo()}>Rental Info</button>
                </div>
            </div>
        );
    }
}
export default withRouter(NavBar);