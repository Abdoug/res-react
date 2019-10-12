import React, { Component } from "react";
import { RoomContext } from "../context";
import Loading from "./Loading";
import Room from "./Room";
import Title from "./Title";

export default class FeatureRooms extends Component {
  static contextType = RoomContext;
  render() {
    let { featuredRooms: rooms, loading } = this.context;
    //console.log(rooms);
    rooms = rooms.map(r => {
      return <Room key={r.id} room={r} />;
    });
    return (
      <section className="featured-rooms">
        <Title title="Featured rooms" />
        <div className="featured-rooms-center">
          {loading ? <Loading /> : rooms}
        </div>
      </section>
    );
  }
}
