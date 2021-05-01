import React, { useState, useEffect, Component } from "react";
import axios from 'axios';
import moment from 'moment';
// import axios from 'axios';
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Modal,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  UncontrolledTooltip,
} from "reactstrap";

import Header from "components/Headers/Header.js";

async function confirmaEntrega(id) {
  alert(id);
  var vendedor = localStorage.getItem("&nome-usuario");
  var _id = id;
  var statusentrega = "Entrege";


  await axios.put('http://localhost:4000/venda', { _id, vendedor, statusentrega })
    .then(res => {
      console.log(res);
    })
}


class ProdutoLista extends React.Component {

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
        { this.state.produtos.map(person =>
          <tr>
            <th scope="row">
              <Media className="align-items-center">
                <Media>
                  <span className="mb-0 text-sm">
                    {person.nome}
                  </span>
                </Media>
              </Media>
            </th>
            <td>{person.numerodoc}</td>
            <td>
              {person.statusentrega == "Aguardando" ?
                <Badge color="danger" className="badge-dot mr-4">
                  <i className="bg-danger" />
                  {person.statusentrega}
                </Badge>
                :
                <Badge color="success" className="badge-dot mr-4">
                  <i className="bg-success" />
                  {person.statusentrega}
                </Badge>
              }

            </td>
            <td>
              <Badge color="success" href="#pablo"
                onClick={e => e.preventDefault(alert('Produto entregue com sucesso!'))} >
                <i className="bg-success" />

                {moment(person.createdAt).format('DD-MM-YYYY')}
              </Badge>
            </td>
            <td className="text-right">
              <UncontrolledDropdown>
                <DropdownToggle
                  className="btn-icon-only text-light"
                  href="#"
                  role="button"
                  size="sm"
                  color=""
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fas fa-ellipsis-v" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem
                    href="#"
                    onClick={(e) => e.preventDefault(confirmaEntrega(person._id))}
                  >
                    Confirmar Entregua
          </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    Cancelar
          </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </td>
          </tr>
        )}
      </>
    )
  }

}

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const [entrega, setEntrega] = useState([]);

  function updateEntrega({ target }, index) {
    const itensCopy = Array.from(entrega);
    itensCopy.splice(index, 1, { id: index, value: target.value });
    setEntrega(itensCopy);
  }

  function deleteEntrega(index) {
    const itensCopy = Array.from(entrega);
    itensCopy.splice(index, 1);
    setEntrega(itensCopy);
  }






  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Produtos para entrega</h3>

              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Nome do Cliente</th>
                    <th scope="col">Número do documento</th>
                    <th scope="col">Status da venda</th>
                    <th scope="col">Data da venda</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <ProdutoLista />

                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>

      </Container>
    </>
  );
};

export default Index;
