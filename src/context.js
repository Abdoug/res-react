import React, { Component } from "react";
import items from "./data";

const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };

  //getData
  componentDidMount() {
    let rooms = this.formatData(items);
    //console.log(rooms);
    let featuredRooms = rooms.filter(room => room.featured === true);
    let maxPrice = Math.max(
      ...rooms.map(r => {
        return r.price;
      })
    );
    let maxSize = Math.max(
      ...rooms.map(r => {
        return r.size;
      })
    );
    this.setState({
      rooms,
      sortedRooms: rooms,
      featuredRooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize
    });
  }

  formatData(items) {
    let tempItems = items.map(i => {
      let id = i.sys.id;
      let images = i.fields.images.map(p => {
        return p.fields.file.url;
      });

      let room = { ...i.fields, images, id };
      return room;
    });
    return tempItems;
  }

  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(r => {
      return r.slug === slug;
    });
    return room;
  };

  handleChange = event => {
    const target = event.target;
    const value = event.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;
    //console.log(target, value, name);
    console.log(value);
    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };

  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;
    let tempRooms = [...rooms];
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }
    this.setState({
      sortedRooms: tempRooms
    });
    //console.log(this.state.sortedRooms);
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };
