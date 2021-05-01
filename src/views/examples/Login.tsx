import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import { setNomeUsuario, login, setIdUsuario, logout } from '../services/auth';
import Loader from "../../components/Loader";
import { history } from '../../history';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Login: React.FC = () => {

  const [user, setUser] = useState('');
  const [senha, setSenha] = useState('');
  const [logedInState, setLogedInState] = useState(false);

  async function handleSubmit() {



    await axios.post('https://mf-eqtl-api-server.herokuapp.com/login', { user, senha })
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          // salvar em local storage
          login(res.data.token);
          //setIdUsuario(res.data.user._id);
          setNomeUsuario(res.data.user);
          console.log(res)
          //history.push("/admin/index");
          // window.location.href = '/admin/index';
          setLogedInState(false);


        } else if (res.status == 400) {
          if (res.data.status == 2) {
            alert('Senha inválida!');
          }
          setLogedInState(false);
        }
        else {
          alert('Erro no servidor!');

          setLogedInState(false);
        }
      })
  }

  function loadSubmit() {
    setLogedInState(true);
    setTimeout(
      () => handleSubmit(),
      1000
    )
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Acesse usando suas credenciais</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Usuário"
                    type="text"
                    name="user"
                    onChange={e => setUser(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    onChange={e => setSenha(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              {/* <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div> */}
              <div className="text-center">

                <Button
                  className="my-4"
                  color="primary"
                  type="button"
                  onClick={loadSubmit}
                >
                  Entrar {logedInState ? <Loader /> : ""}
                </Button>

              </div>


            </Form>
          </CardBody>
        </Card>
        {/* <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row> */}
      </Col>
    </>
  );
};

export default Login;