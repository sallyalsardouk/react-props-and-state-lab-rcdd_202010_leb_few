import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }
 onFindPetsClick = () => {
    let type = this.state.filters.type
    
    if (type === 'all') {

      fetch('/api/pets')
        .then(resp => resp.json())
        .then(json =>  
          this.setState({
            pets: json
          }))
        .catch(error => console.log(error))  
    } else {
      
      fetch(`/api/pets?type=${type}`)
        .then(resp => resp.json())
        .then(json => 
          this.setState({pets: json})
        )
    }
  }

  onChangeType = ({ target: { value } }) => {
    this.setState({ filters: { ...this.state.filters, type: value } })
  };

  onAdoptPet = petId => {
    let pets = this.state.pets.map(p => {
      return p.id === petId ? {...p, isAdopted: true} : p;
    })
    this.setState({pets: pets})
    
  }
  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters />
            </div>
            <div className="twelve wide column">
              <PetBrowser />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
