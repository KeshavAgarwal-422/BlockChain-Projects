import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import { ethers } from "ethers";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";

const App = () => {
  const selectValue = useRef("");
  const [greetings, setGreetings] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const url = "http://127.0.0.1:8545";
      const provider = new ethers.providers.JsonRpcProvider(url);
      const contract = new ethers.Contract(
        contractAddress,
        Greeter.abi,
        provider
      );
      setContract(contract);
      setProvider(provider);
    };

    loadProvider();
  }, []);

  const changeGreeting = async () => {
    const input = selectValue.current.value;
    console.log(input);
    const signer = contract.connect(provider.getSigner());
    signer.setGreetings(input);
    setTimeout(() => {
      window.location.reload(1);
    }, 100);
    setTimeout();
  };

  useEffect(() => {
    const displayGreeting = async () => {
      const greeting = await contract.getGreetings();
      console.log(greeting);
      setGreetings(greeting);
    };
    contract && displayGreeting();
  }, [contract]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="form">
        <Form onSubmit={handleSubmit} className="form-center">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div className="center">
              <Form.Label>Enter Your Name </Form.Label>
              <Form.Control
                type="text"
                placeholder=" Pls enter your name"
                ref={selectValue}
              />
              <Button
                as="input"
                type="submit"
                value="Display"
                onClick={changeGreeting}
              />
            </div>
          </Form.Group>
        </Form>
        <Alert key="success" variant="success">
          {greetings}
        </Alert>
      </section>
    </>
  );
};

export default App;
