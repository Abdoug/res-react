import React, { Component } from "react";
import Title from "./Title";
import { FaHiking, FaShuttleVan, FaBeer, FaCocktail } from "react-icons/fa";

export default class Services extends Component {
  state = {
    services: [
      {
        icons: <FaCocktail />,
        title: "free cocktails",
        info: "First"
      },
      {
        icons: <FaHiking />,
        title: "free hiking",
        info: "Second"
      },
      {
        icons: <FaShuttleVan />,
        title: "free shuttle",
        info: "Third"
      },
      {
        icons: <FaBeer />,
        title: "free hamoud",
        info: "Fifth"
      }
    ]
  };
  render() {
    return (
      <section className="services">
        <Title title="services" />
        <div className="services-center">
          {this.state.services.map((e, i) => {
            return (
              <article key={i} className="service">
                <span>{e.icons}</span>
                <h6>{e.title}</h6>
                <p>{e.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}
