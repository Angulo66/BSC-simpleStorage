import {
  Box,
  Form,
  Input,
  Field,
  Flex,
  Button,
} from "rimble-ui";
import React, { useState, useEffect } from 'react';
import getBlockchain from './utils/binance';

function App() {
  const [simpleStorage, setSimpleStorage] = useState(undefined);
  const [data, setData] = useState(undefined);
  
  //const [formValidated, setFormValidated] = useState(false);
  const [validated/*, setValidated*/] = useState(false);
  const [inputValue, setInputValue] = useState("");
  //const [formInputValue, setFormInputValue] = useState("");
  
  const handleInput = e => {
    setInputValue(e.target.value);
    validateInput(e);
    console.log(validateInput);
    console.log('value:', e);
  };
  
  const validateInput = e => {
    e.target.parentNode.classList.add("was-validated");
  };
  
  useEffect(() => {
    const init = async () => {
      const { simpleStorage } = await getBlockchain();
      const data = await simpleStorage.readData();
      setSimpleStorage(simpleStorage);
      setData(data);
    }
    init();
  }, []);
  
  const updateData = async e => {
    e.preventDefault();
    const data = e.target.elements[0].value;
    const tx = await simpleStorage.updateData(data);
    await tx.wait();
    const newData = await simpleStorage.readData();
    setData(newData);
  }
  
  if(typeof simpleStorage === 'undefined' || typeof data === 'undefined') {
  	return 'Loading...';
  }
  
  return (
    <div className="App">
    <div className='container'>
      <div className='row'>

        <div className='col-sm-6'>
          <h2>Data:</h2>
          <p>{data.toString()}</p>
        </div>

        <div className='col-sm-6'>
          <h2>Change data</h2>
          <Form className="form-inline" onSubmit={e => updateData(e)}>
            <Flex mx={-3} flexWrap={"wrap"}>
            <Box width={[1, 1, 1/2]} px={3}>
               <Field label="" validated={validated} width={1}>
                <Input
                  type="text"
                  required // set required attribute to use brower's HTML5 input validation
                  onChange={handleInput}
                  value={inputValue}
                  width={1}
                  className="form-control"
                  placeholder="data"
                />
              </Field>
          <Box>
            {/* Use the validated state to update UI */}
            <Button type="submit">
              Submit Form
            </Button>
          </Box>
          </Box>
          </Flex>
          </Form>
        </div>

      </div>
    </div>
    </div>
  );
}

export default App;
