import React, { Component } from 'react';
import Table from './Table';
import { withRouter } from 'react-router-dom';

class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      clientsUnProcessed: [],
      newClient: "",
      deleteClient: "",
      searchTextInput: "",
      searchClients: [],
      isLoading: true
    }
    this.componentDidMount();
    this.create = this.create.bind(this)
    this.remove = this.remove.bind(this)
    this.getAll = this.getAllClients.bind(this)
    this.search = this.searchClient.bind(this)
  }
  componentDidMount() {
    this.getAllClients();
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 100);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  async getAllClients() {
    const response = await fetch('/client/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    try {
      const body = await response.json();
      this.setState({ clientsUnProcessed: body, isLoading: false });
      this.state.clients = [];
      this.state.clientsUnProcessed.map(client =>
        this.state.clients.push(client.split("; "))
      );  
    } catch (error) {
      
    }
  }
  async remove(name) {
    await fetch(`/client/delete/${name}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    this.getAll();
  }
  async create(name) {
    await fetch(`/client/create/${name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    this.getAll();
  }
  async searchClient(name) {
    const response = await fetch(`/client/find/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    try {
      const body = await response.json();
      this.setState({ clientsUnProcessed: body, isLoading: false });
      this.state.clients = [];
      this.state.clientsUnProcessed.map(client =>
        this.state.clients.push(client.split("; "))
      );
  
    } catch (error) {
      
    }
  }

  handleChange = (flag, event) => {
    switch (flag) {
      case "create":
        this.setState({ newClient: event.target.value })
        break;
      case "delete":
        this.setState({ deleteClient: event.target.value })
        break;
      case "search":
        this.setState({ searchTextInput: event.target.value })
        break;
    }
  }

  render() {

    return (
      <div className="client mx-2 flex flex-col">
        <div className="flex flex-col">
          <div className="block h-12 border-2 my-2 pl-4 flex items-center bg-grey-light w-full rounded">
            Create Client
          </div>
          <div className="flex justify-center">
            <div className="w-1/6"></div>
            <div className="flex flex-col w-5/6">
              <div className="flex items-center my-1">
                <label htmlFor="createClient" className="w-1/5">Client Name</label>
                <input type="text" id="createClient" className="rounded border-grey border-2 w-1/4 py-1" value={this.state.newClient} onChange={this.handleChange.bind(this, "create")} />
              </div>
              <div className="flex my-1">
                <div className="w-2/5"></div>
                <button className="w-24 rounded border-grey border-2 bg-grey-light hover:bg-grey h-6 focus-within:text-white" onClick={() => this.create(this.state.newClient)}>Create</button>
              </div>
            </div>
          </div>
        </div>
        <div className="block h-12 border-2 my-2 pl-4 flex items-center bg-grey-light w-full rounded">
          Delete client
        </div>
        <div className="flex justify-center">
          <div className="w-1/6"></div>
          <div className="flex flex-col w-5/6">
            <div className="flex items-center my-1">
              <label htmlFor="deleteClient" className="w-1/5">Client Name</label>
              <input type="text" id="deleteClient" className="rounded border-grey border-2 w-1/4 py-1" value={this.state.deleteClient} onChange={this.handleChange.bind(this, "delete")} />
            </div>
            <div className="flex my-1">
              <div className="w-2/5"></div>
              <button className="w-24 rounded border-grey border-2 bg-grey-light hover:bg-grey h-6" onClick={() => this.remove(this.state.deleteClient)}>Delete</button>
            </div>
          </div>
        </div>
        <div className="block h-12 border-2 my-2 pl-4 flex items-center bg-grey-light w-full rounded" onClick={() => this.getAll(this)}>
          All clients
        </div>
        <div className="flex justify-center">
          <div className="w-1/6"></div>
          <div className="flex flex-col w-5/6">
            <div className="flex items-center my-1">
              <label htmlFor="clientSearchInput" className="w-1/5">Client Name</label>
              <input type="text" id="clientSearchInput" className="rounded border-grey border-2 w-1/4 py-1" value={this.state.searchTextInput} onChange={this.handleChange.bind(this, "search")} />
            </div>
            <div className="flex my-1">
              <div className="w-2/5"></div>
              <button className="w-24 rounded border-grey border-2 bg-grey-light hover:bg-grey h-6" onClick={() => this.search(this.state.searchTextInput)}>Search</button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Table data={this.state.clients} flag={true}/>
        </div>
      </div>
    );
  }
}
export default withRouter(Client);
