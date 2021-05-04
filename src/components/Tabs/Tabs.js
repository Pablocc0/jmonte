import React from "react";
import classnames from "classnames";
import Table from '../../views/examples/Tables';
// import axios from 'axios';
// reactstrap components
import {
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane
} from "reactstrap";

// function buscarPendete() {
//   axios.get('http://localhost:4000/venda')
//     .then(res => {
//       const produtos = res.data;
//       console.log("produtos 1");
//       console.log(produtos);
//     })
//     .catch(error => {
//       console.error('Algo errado ocorreu!', error);
//     });
// }

// function buscarEntregue() {
//   axios.get('http://localhost:4000/venda')
//     .then(res => {
//       const produtos = res.data;
//       console.log("produtos 2");
//       console.log(produtos);
//     })
//     .catch(error => {
//       console.error('Algo errado ocorreu!', error);
//     });
// }

class Navs extends React.Component {
  state = {
    tabs: parseInt(localStorage.getItem("tabs"))
  };
  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
    //console.log(index);
    localStorage.setItem("tabs", index)
    window.location.reload(false);
    // if (index === 1) {
    //   buscarPendete();
    // } else if (index === 2) {
    //   buscarEntregue();
    // } else {
    //   console.log(" 3");
    // }

  };

  render() {
    return (
      <>
        <div className="nav-wrapper">
          <Nav
            className="nav-fill flex-column flex-md-row"
            id="tabs-icons-text"
            pills
            role="tablist"
          >
            <NavItem>
              <NavLink
                aria-selected={this.state.tabs === 3}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.tabs === 1
                })}
                onClick={e => this.toggleNavs(e, "tabs", 1)}
                href="#pablo"
                role="tab"
              >
                <i className="ni ni-bell-55 mr-2" />
                Aguardando...
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                aria-selected={this.state.tabs === 3}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.tabs === 2
                })}
                onClick={e => this.toggleNavs(e, "tabs", 2)}
                href="#pablo"
                role="tab"
              >
                <i className="ni ni-cloud-upload-96 mr-2" />
                Entregues
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink
                aria-selected={this.state.tabs === 3}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.tabs === 3
                })}
                onClick={e => this.toggleNavs(e, "tabs", 3)}
                href="#pablo"
                role="tab"
              >
                <i className="ni ni-calendar-grid-58 mr-2" />
                Listagem
              </NavLink>
            </NavItem> */}
          </Nav>
        </div>
        <Card className="shadow">
          <CardBody>
            <TabContent activeTab={"tabs" + this.state.tabs}>
              <TabPane tabId="tabs1">
                <p className="description">
                  <Table />
                </p>
              </TabPane>
              <TabPane tabId="tabs2">
                <p className="description">
                  <Table />
                </p>
              </TabPane>
              {/* <TabPane tabId="tabs3">
                <p className="description">
                  <Table />
                </p>
              </TabPane> */}
            </TabContent>
          </CardBody>
        </Card>



      </>
    );
  }
}

export default Navs;