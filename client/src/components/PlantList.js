import React, { Component } from "react";
import axios from "axios";

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  constructor() {
    super();
    this.state = {
      plants: [],
      allPlants: [],
    };
  }
  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants
  componentDidMount() {
    axios
      .get("http://localhost:3333/plants")
      .then((res) => {
        this.setState({
          plants: res.data.plantsData,
          allPlants: res.data.plantsData,
        });
      })
      .catch((err) => console.error(err));
  }

  changeHandler = (e) => {
    // search in this.state.allPlants for plants that match the search box
    const matchingPlants = this.state.allPlants.filter((plant) =>
      plant.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    // set state to only have the plants in the search box
    this.setState({ plants: matchingPlants });
  };
  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    return (
      <main className="plant-list">
        <input
          placeholder="Search for plants..."
          onChange={this.changeHandler}
        ></input>
        {this.state?.plants?.map((plant) => (
          <div className="plant-card" key={plant.id}>
            <img className="plant-image" src={plant.img} alt={plant.name} />
            <div className="plant-details">
              <h2 className="plant-name">{plant.name}</h2>
              <p className="plant-scientific-name">{plant.scientificName}</p>
              <p>{plant.description}</p>
              <div className="plant-bottom-row">
                <p>${plant.price}</p>
                <p>
                  <span role="img" aria-label="sun">
                    ☀️
                  </span>{" "}
                  {plant.light}
                </p>
                <p>
                  <span role="img" aria-label="water">
                    💦
                  </span>{" "}
                  {plant.watering}x/month
                </p>
              </div>
              <button
                className="plant-button"
                onClick={() => this.props.addToCart(plant)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </main>
    );
  }
}
