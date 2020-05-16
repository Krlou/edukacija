import React, { Component } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";

import Input from "./input";
import CheckBox from "./checkbox";
import Textarea from "./textarea";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  //validacija: funkcija za validaciju cele forme
  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    }); //result object ima svojstva error i value: to vraca funkcija Joi.validate()

    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  //validacija: funkcija za validaciju jednog polja
  validateProperty = ({ name, value }) => {
    //moramo da napravimo novi objekat i novu semu, jer ce u suprotnom validacija da vazi za celu formu
    const obj = { [name]: value }; //key ce da bude vrednost atributa name, npr ako je name=username, obj={username: value}
    const schema = { [name]: this.schema[name] };

    const { error } = Joi.validate(obj, schema);
    if (!error) return null;
    return error.details[0].message;
  };

  handleSubmit = (e) => {
    e.preventDefault(); //sprecava default ponasanje

    //validacija gresaka
    const errors = this.validate();
    //console.log(errors);
    this.setState({ errors: errors || {} }); //ako su errors null, onda postavljamo na empty, zato sto errors ne sme da bude null
    if (errors) return; //ne zovemo server!!!

    //dodatna provera: ako je postavljen isStudent, a index nije unet! (ovo je specijalan slucaj zbog Joi.validate().allow(""))
    if (this.state.data["isStudent"] && this.state.data["numOfIndex"] === "") {
      toast.error("Broj indeksa je obavezan!");
      return; //ne zovemo server
    }
    //dodatna provera: da li je svojstvo password jednako svojstvu repeatPassword
    if (
      this.state.data["repeatPassword"] &&
      this.state.data["password"] !== this.state.data["repeatPassword"]
    ) {
      toast.error("Lozinka se razlikuje od ponovljene lozinke!");
      return; //ne zovemo server
    }

    this.doSubmit();
  };

  handleChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];

    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;

    this.setState({ data, errors });
  };

  handleCheck = (e) => {
    const data = { ...this.state.data };
    data[e.currentTarget.name] = !data[e.currentTarget.name];
    //ako je false, onda treba i obrisati index: ne zelimo nekonzistentne podatke u bazi
    if (!data[e.currentTarget.name]) data["numOfIndex"] = ""; //postavimo index na prazan string
    this.setState({ data });
  };

  renderButton(label, styleId) {
    return <button id={styleId}>{label}</button>;
  }

  renderInput(name, type, placeholder) {
    return (
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={this.state.data[name]}
        onChange={this.handleChange}
        error={this.state.errors[name]}
      />
    );
  }

  renderCheckbox(name, label) {
    return (
      <CheckBox
        name={name}
        label={label}
        value={this.state.data[name]}
        onChange={this.handleCheck}
      />
    );
  }

  renderTextarea(name, placeholder) {
    return (
      <Textarea
        placeholder={placeholder}
        name={name}
        value={this.state.data[name]}
        error={this.state.errors[name]}
        onChange={this.handleChange}
      />
    );
  }

  render() {
    return null;
  }
}

export default Form;
