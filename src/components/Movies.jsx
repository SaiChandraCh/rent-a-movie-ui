import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Table from './Table';
import InfoTable from './InfoTable';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      moviesUnProcessed: [],
      newMovie: "",
      rentClient: "",
      rentMovie: "",
      rentResponse: "true",
      returnDate: "",
      returnClient: "",
      rentId: "",
      rentedMovies: "",
      searchTextInput: "",
      searchMovies: [],
      isLoading: true
    }
    this.componentDidMount();
    this.create = this.create.bind(this)
    this.rentMovie = this.rentMovie.bind(this)
    this.returnMovie = this.returnMovie.bind(this)
    this.getAll = this.getAllMovies.bind(this)
    this.rentalInfo = this.rentalInfo.bind(this)
  }

  componentDidMount() {
    this.getAllMovies(true);
    this.getAllMovies(false);
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 100);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async create(name) {
    console.log("name : ",name);
    await fetch(`/movies/create/${name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  async rentMovie(name, movie) {
    const response = await fetch('/movies/rent', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'client': `${name}`,
        'movie': `${movie}`
      })
    });
    try {
      this.setState({rentResponse : await response.json()}) 
    } catch (error) {
      console.log(error)
    }
  }

  async returnMovie(date,id) {
    await fetch(`/movies/return`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "inDate": `${date}`,
        'id': `${id}`
      })
    })
  }

  async getAllMovies(flag) {
    if (flag) {
      const response = await fetch('/movies/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      var body;
      try {
        body = await response.json();
        this.setState({ moviesUnProcessed: body, isLoading: false });
        this.state.movies = [];
        this.state.moviesUnProcessed.map(movies =>
          this.state.movies.push(movies.split("; "))
        );
        } catch (error) {
        console.log(error)  
      }
    } else {
      const response = await fetch('/movies/rented', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      try {
        var body = await response.json();
        this.setState({ moviesUnProcessed: body, isLoading: false });
        this.state.rentedMovies = []
        this.state.moviesUnProcessed.map(movies =>
        this.state.rentedMovies.push(movies.split("; "))
        );
        } catch (error) {
        console.log(error)  
      }
    }
  }

  async rentalInfo(movie) {
    const response = await fetch(`/movies/history/${movie}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    try {
      var body = await response.json();
      this.setState({ moviesUnProcessed: body, isLoading: false });
      this.state.searchMovies = []
      this.state.moviesUnProcessed.map(movies =>
        this.state.searchMovies.push(movies.split("; "))
      );
      } catch (error) {
      console.log(error)  
    }
  }

  handleChange = (flag, event) => {
    switch (flag) {
      case "create":
        this.setState({ newMovie: event.target.value })
        break;
      case "rentMovie":
        this.setState({ rentMovie: event.target.value })
        break;
      case "rentClient":
        this.setState({ rentClient: event.target.value })
        break;
      case "returnClient":
        this.setState({ returnClient: event.target.value })
        break;
      case "returnDate":
        this.setState({ returnDate: event.target.value })
        break;
      case "rentId":
        this.setState({ rentId: event.target.value })
        break;
      case "search":
        this.setState({ searchTextInput: event.target.value })
        break;
    }
  }
  response = () =>{
    if(this.state.rentResponse[0].localeCompare("Client is unable to rent a movie") == 0){
      return <div className="text-red">Client is unable to rent a movie</div>
    }else if(this.state.rentResponse[0].localeCompare("Movie is not available") == 0){
      return <div className="text-red">Movie is not available</div>
    }else{
      return <div></div>
    }
  }
  render() {
    return (
      <div className="Movie mx-2 flex flex-col">
        <div className="flex flex-col">
          <div className="block h-12 border-2 my-2 pl-4 flex items-center bg-grey-light w-full rounded">
            Create Movie
          </div>
          <div className="flex">
            <div className="w-1/6"></div>
            <div className="flex flex-col w-5/6">
              <div className="flex items-center my-1">
                <label htmlFor="createMovie" className="w-1/5">Movie Name</label>
                <input type="text" id="createMovie" className="rounded border-grey border-2 w-1/4 py-1" value={this.state.newMovie} onChange={this.handleChange.bind(this, "create")} />
              </div>
              <div className="flex mt-2 h-full">
                <div className="w-2/5"></div>
                <button className="w-24 rounded border-grey border-2 bg-grey-light hover:bg-grey h-6" onClick={() => this.create(this.state.newMovie)}>Create</button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="block h-12 border-2 my-2 pl-4 flex bg-grey-light items-center w-full rounded">
            Rent Movie
          </div>
          <div className="flex">
            <div className="w-1/6"></div>
            <div className="flex flex-col w-5/6">
              <div className="flex items-center my-1">
                <label htmlFor="rentClient" className="w-1/5">Client Name</label>
                <input type="text" id="rentClient" className="rounded border-grey border-2 w-1/4 py-1" value={this.state.rentClient} onChange={this.handleChange.bind(this, "rentClient")} />
              </div>
              <div className="flex items-center my-1">
                <label htmlFor="rentMovie" className="w-1/5">Movie Name</label>
                <input type="text" id="rentMovie" className="rounded border-grey border-2 w-1/4 py-1" value={this.state.rentMovie} onChange={this.handleChange.bind(this, "rentMovie")} />
              </div>
              <div className="flex my-1">
                <div className="w-2/5"></div>
                <button className="w-24 rounded border-grey border-2 bg-grey-light hover:bg-grey h-6" onClick={() => this.rentMovie(this.state.rentClient, this.state.rentMovie)} >Rent</button>
              </div>
              <this.response />
            </div>
          </div>
        </div>
        <div>
          <div className="block h-12 border-2 my-2 pl-4 flex bg-grey-light w-full items-center rounded">
            Return Movie
          </div>
          <div className="flex">
            <div className="w-1/6"></div>
            <div className="flex flex-col w-5/6">
              <div className="flex items-center my-1">
                <label htmlFor="returnDate" className="w-1/5">Return Date</label>
                <input type="text" id="returnDate" className="rounded border-grey border-2 w-1/4 py-1" value={this.state.returnDate} onChange={this.handleChange.bind(this, "returnDate")} />
              </div>
              <div className="flex items-center my-1">
                <label htmlFor="rentId" className="w-1/5">Rent Id</label>
                <input type="text" id="rentId" className="rounded border-grey border-2 w-1/4 py-1" value={this.state.rentId} onChange={this.handleChange.bind(this, "rentId")} />
              </div>
              <div className="flex my-1">
                <div className="w-2/5"></div>
                <button className="w-24 rounded border-grey border-2 bg-grey-light hover:bg-grey h-6" onClick={() => this.returnMovie(this.state.returnDate, this.state.rentId)}>Return</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="block h-12 border-2 my-2 pl-4 flex bg-grey-light w-full rounded items-center">
            {/* onClick={() => this.getAll(true)} */}
            All movies
          </div>
          <div>
            <Table data={this.state.movies} flag={false} />
          </div>
        </div>
        <div>
          <div className="block h-12 border-2 my-2 pl-4 flex bg-grey-light w-full items-center rounded">
            History of particular movie
          </div>
          <div className="flex">
            <div className="w-1/6"></div>
            <div className="flex flex-col w-5/6">
              <div className="flex items-center my-1">
                <label htmlFor="searchTextInput" className="w-1/5">Movie Name</label>
                <input type="text" id="searchTextInput" className="rounded border-grey border-2 w-1/4 py-1" value={this.state.searchTextInput} onChange={this.handleChange.bind(this, "search")} />
              </div>
              <div className="flex my-1">
                <div className="w-2/5"></div>
                <button className="w-24 rounded border-grey border-2 bg-grey-light hover:bg-grey h-6" onClick={() => this.rentalInfo(this.state.searchTextInput)} >Search</button>
              </div>
            </div>
          </div>
          <div>
            <InfoTable info={this.state.searchMovies} />
          </div>
        </div>
        {/* <div>
          <div className="block h-12 border-2 my-2 pl-4 flex bg-grey-light w-full items-center rounded">
            Rented movies
          </div>
          <Table data={this.state.rentedMovies} flag={false} />
        </div> */}
      </div>

    );
  }
}
export default withRouter(Movie);