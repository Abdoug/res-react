import React from "react";
import { useContext } from "react";
import { RoomContext } from "../context";
import Title from "./Title";

const getUnique = (items, value) => {
  return [...new Set(items.map(item => item[value]))];
};

export default function RoomsFilter({ rooms }) {
  const context = useContext(RoomContext);
  const {
    handleChange,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets
  } = context;
  //console.log(context);

  //get unique types
  let types = getUnique(rooms, "type");
  types = ["all", ...types];
  types = types.map((e, i) => {
    return (
      <option value={e} key={i}>
        {e}
      </option>
    );
  });

  let people = getUnique(rooms, "capacity");
  people = [...people];
  people = people.map((e, i) => {
    return (
        <option value={e} key={i}>{e}</option>
    );
  });

  return (
    <section className="filter-room">
      <Title title="search rooms" />
      <form className="filter-form">
        {/*rooms type*/}
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select
            name="type"
            id="type"
            value={type}
            className="form-control"
            onChange={handleChange}
          >
            {types}
          </select>
        </div>
        {/*geusts*/}
        <div className="form-group">
          <label htmlFor="capacity">Guests</label>
          <select
              name="capacity"
              id="capacity"
              value={capacity}
              className="form-control"
              onChange={handleChange}
          >
            {people}
          </select>
        </div>
        {/*room price*/}
        <div className="form-group">
          <label htmlFor="price">room price ${price}</label>
          <input type="range" name='price' id='price' value={price} min={minPrice} max={maxPrice} onChange={handleChange} className='form-control'/>
        </div>
        {/*room size*/}
        <div className="form-group">
          <label htmlFor="size">room size</label>
          <div className="size-inputs">
            <input type="number" name='minSize' id='size' value={minSize} onChange={handleChange} className='size-input'/>
            <input type="number" name='maxSize' id='size' value={maxSize} onChange={handleChange} className='size-input'/>
          </div>
        </div>
        {/*extras*/}
        <div className="form-group">
          <div className="single-extra">
            <label htmlFor="breakfast">breakfast</label>
            <input type="checkbox" name='breakfast' id='breakfast' checked={breakfast} onChange={handleChange}/>
          </div>
          <div className="single-extra">
            <label htmlFor="pets">pets</label>
            <input type="checkbox" name='pets' id='pets' checked={pets} onChange={handleChange}/>
          </div>
        </div>
      </form>
    </section>
  );
}
