import React, { useState } from "react";
import axios from 'axios';
import { setNomeUsuario, login } from '../services/auth';
import Loader from "../../components/Loader";
import { history } from '../../history';

import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col
} from "reactstrap";

const Login = () => {

  const [usuario, setUsuario] = useState('');
  const [senha, setPassword] = useState('');
  const [logedInState, setLogedInState] = useState(false);


  function handleError() {
    toast.error('Falha de conexão');
  }
  function handleSuccess() {
    toast.success('Login efetuado com sucesso!');
  }
  function handleWarn() {
    toast.warn('Senha inválida');
  }

  async function handleSubmit() {

    const loja = "00";

    await axios.post('https://nortelink.com.br/api/v1/login', { usuario, senha, loja })
      .then(res => {
        //console.log(res);
        if (res.data.status === 1) {
          handleSuccess();
          // salvar em local storage
          login(res.data.token);
          setNomeUsuario(res.data.user.name);
          history.push('/admin/index');
          //window.location.href = '/admin/index';
          setLogedInState(false);

        } else if (res.data.status === 2) {
          handleWarn();
          setLogedInState(false);
        }
        else {
          handleError();
          setLogedInState(false);
        }
      })
      .catch(error => {
        handleError();
        // this.setState({ erro: error.message });
        console.error('Algo errado ocorreu!', error);
      });
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
          <ToastContainer />
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
                    onChange={e => setUsuario(e.target.value)}
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
                    onChange={e => setPassword(e.target.value)}
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