import React, { Component } from "react";
//import items from "./data";
import Client from './Contentfull';

Client.getEntries({
  content_type: "resReact",
  order: "sys.createdAt"
}).then(response => console.log(response.items)).catch(console.error);

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
  getData = async () => {
    try {
      let response  = await Client.getEntries({
        content_type: "resReact",
        order: "sys.createdAt"
      });
      let rooms = this.formatData(response.items);
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
    catch(error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getData();
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
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
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

    //get all the rooms
    let tempRooms = [...rooms];

    capacity = parseInt(capacity);
    price = parseInt(price);
    minSize = parseInt(minSize);
    maxSize = parseInt(maxSize);

    //filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }

    //filter by capacity
    if ( capacity !== 1 ) {
      tempRooms = tempRooms.filter(room => room.capacity === capacity);
    }

    //filter by price
    if ( price !== 0 ) {
      tempRooms = tempRooms.filter(room => room.price <= price);
    }

    //filter by size
    if ( minSize !== 0 || maxSize !== 0 ) {
      tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);
    }

    //filter by breakfast
    if ( breakfast ) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }

    //filter by pets
    if ( pets ) {
      tempRooms = tempRooms.filter(room => room.pets === true);
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
