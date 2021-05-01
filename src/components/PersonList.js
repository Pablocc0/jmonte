import React from 'react';
import axios from 'axios';

import {
  NavItem,
  NavLink,
} from "reactstrap";

export default class ProdutoLista extends React.Component {
  state = {
    produtos: []
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/venda`)
      .then(res => {
        const produtos = res.data;
        console.log(produtos);
        this.setState({ produtos });
      })
  }

  render() {
    return (
      <>
        { this.state.produtos.map(person => <>{person.nome}</>)}
      </>
    )
  }
}