import React from "react";
import axios from 'axios';
import moment from 'moment';
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table
} from "reactstrap";
// core components

import { toast } from 'react-toastify';

function handleSuccess() {
  toast.success('Produto entregue com sucesso!');
}

async function confirmaEntrega(id) {
  var vendedor = localStorage.getItem("&nome-usuario");
  var _id = id;
  var statusentrega = "Entrege";


  await axios.put('http://localhost:4000/venda', { _id, vendedor, statusentrega })
    .then(res => {
      console.log(res);
      handleSuccess();

      window.location.reload(false);
    })
}

async function cancelarEntrega(id) {
  var vendedor = localStorage.getItem("&nome-usuario");
  var _id = id;
  var statusentrega = "Aguardando";


  await axios.put('http://localhost:4000/venda', { _id, vendedor, statusentrega })
    .then(res => {
      console.log(res);
      handleSuccess();

      window.location.reload(false);
    })
}

class ProdutoLista extends React.Component {

  state = {
    produtos: [],
    erro: []
  }


  async componentDidMount() {
    const tab = localStorage.getItem("tabs");
    if (tab == 1) {
      await axios.post('http://localhost:4000/venda_op', { tab })
        .then(res => {
          const produtos = res.data;
          this.setState({ produtos });
        })
        .catch(error => {
          this.setState({ erro: error.message });
          console.error('Algo errado ocorreu!', error);
        });

    } else if (tab == 2) {
      await axios.post('http://localhost:4000/venda_op', { tab })
        .then(res => {
          const produtos = res.data;
          this.setState({ produtos });
        })
        .catch(error => {
          this.setState({ erro: error.message });
          console.error('Algo errado ocorreu!', error);
        });

    } else {
      await axios.post('http://localhost:4000/venda_op', { tab })
        .then(res => {
          const produtos = res.data;
          this.setState({ produtos });
        })
        .catch(error => {
          this.setState({ erro: error.message });
          console.error('Algo errado ocorreu!', error);
        });

    }
  }

  render() {

    const interval = setInterval(() => {
      console.log('Intervalo: ' + interval);
      window.location.reload(false);
    }, 5000);

    return (
      <>
        {this.state.produtos.map(person =>
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
            <td>{person.numerodoc.toString()}</td>
            <td>
              {person.statusentrega === "Aguardando" ?
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
              <Badge color="success" href="#"
                onClick={e => e.preventDefault(alert('Produto entregue com sucesso!'))} >
                <i className="bg-success" />

                {moment(person.createdAt).format('DD-MM-YYYY')}
              </Badge>
            </td>
            <td className="text-right">
              {localStorage.getItem("tabs") == 1 ?
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
                      onClick={(e) => e.preventDefault(confirmaEntrega(person._id.toString()))}
                    >
                      Confirmar Entrega
              </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                :

                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-icon-only text-light"
                    href="#"
                    role="button"
                    size="sm"
                    color="danger"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fas fa-ellipsis-v" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem style={{ color: 'red' }}
                      href="#"

                      onClick={(e) => e.preventDefault(cancelarEntrega(person._id.toString()))}
                    >
                      Cancelar Entrega
                </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

              }

            </td>
          </tr>
        )}
      </>
    )
  }

}

const Tables = () => {
  return (
    <>
      {/* Page content */}
      {/* Table */}
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
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  tabIndex="-1"
                >
                  <i className="fas fa-angle-left" />
                  <span className="sr-only">Anterior</span>
                </PaginationLink>
              </PaginationItem>
              <PaginationItem className="active">
                <PaginationLink
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  1
                      </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  2 <span className="sr-only">(current)</span>
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  3
                      </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fas fa-angle-right" />
                  <span className="sr-only">Próximo</span>
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </nav>
        </CardFooter>
      </Card>




    </>
  );
};

export default Tables;
