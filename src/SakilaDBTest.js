
import React, { useState, useEffect, isValidElement } from 'react';
import * as sakilaApi from './sakilaApi';
import { Entities } from './sakilaApi';
import DropdownList from './DropdownList';
import { Button } from 'bootstrap';

function SakilaDBTest() {


  const [items, setItems] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(Entities.Film);
  const [selectedOperation, setSelectedOperation] = useState(sakilaApi.Operations.getAll);

  const [inputValue, setInputValue] = useState('');
  const [idInputVisible, setIdInputVisible] = useState(false);

  const [objInputs, setObjInputs] = useState([{}]);
  const [objInputVisible, setObjInputVisible] = useState(false);

  const fetchApiData = async () => {

    var response;

    switch (selectedOperation) {
      case sakilaApi.Operations.getAll:
        response = await sakilaApi.getAll(selectedEntity);
        setItems(response);
        break;
      case sakilaApi.Operations.get:
        response = await sakilaApi.getById(selectedEntity, inputValue);
        setItems([response]);
        break;
      case sakilaApi.Operations.save:
        var obj = new Map();
        objInputs.forEach((m) => {
          if (m.k != null && m.k.toString() != "") {
            obj.set(m.k, m.v)
          };
        });
        response = await sakilaApi.save(selectedEntity, Object.fromEntries(obj));
        setItems([response]);
        break;
      case sakilaApi.Operations.delete:
        response = await sakilaApi.deleteById(selectedEntity, inputValue);
        break;

    }

    try {
    }
    catch (e) {
      console.error(e);
    }
  };


  const handleEntityChange = (value) => {
    setSelectedEntity(value);
  };
  const handleOperationChange = (value) => {
    setSelectedOperation(value);
    setIdInputVisible(value == sakilaApi.Operations.get || value == sakilaApi.Operations.delete);
    setObjInputVisible(value == sakilaApi.Operations.save);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddButton = (event) => {
    const newArray = Array.from(objInputs);
    newArray.push({});
    setObjInputs(newArray);
  }

  const handleLoadItem = (item) => {

    setSelectedOperation(sakilaApi.Operations.save);
    setObjInputVisible(true);

    const newInputs = [];
    Object.entries(item).map(([k, v]) => {
      if (v != null) {
        if (typeof v === 'object') {

          //newInputs.push({ k: k, v: JSON.stringify(v) });
        }
        else {
          newInputs.push({ k: k, v: v });
        }
      }
    });
    setObjInputs(newInputs);
  }

  const handleObjKeyChange = (i, val) => {
    const newArray = Array.from(objInputs);
    newArray[i].k = val;
    setObjInputs(newArray);
  }

  const handleObjValueChange = (i, val) => {

    const newArray = Array.from(objInputs);
    newArray[i].v = val;
    setObjInputs(newArray);
  }

  return (
    <div className="App">
      <h1>Sakila DB</h1>

      <DropdownList label="Entity"
        items={sakilaApi.Entities}
        selectedOption={selectedEntity}
        onOptionChange={handleEntityChange} />

      <DropdownList label="Operation" items={sakilaApi.Operations}
        selectedOption={selectedOperation}
        onOptionChange={handleOperationChange} />

      {idInputVisible && (
        <div>
          <label>id: </label>
          <input
            type="text"
            placeholder=""
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
      )}

      {objInputVisible && objInputs.map((m, i) => {

        return (<div style={{ display: "flex" }}>
          <div>
            <label>key: </label>
            <input
              type="text"
              placeholder=""
              defaultValue={m.k}
              onChange={(event) => handleObjKeyChange(i, event.target.value)}
            />
          </div>
          <div style={{ float: 'right' }}>
            <label>value: </label>
            <input
              type="text"
              placeholder=""
              defaultValue={m.v}
              onChange={(event) => handleObjValueChange(i, event.target.value)}
            />
          </div>
          {
            i == (objInputs.length - 1) &&
            (
              <button onClick={handleAddButton}>+</button>
            )
          }
        </div>
        );

      })}


      <ul>
        <li>
          <button onClick={fetchApiData}>Fetch</button>
        </li>

        <ul>
          {
            items.map((item, index) => (
              <li key={index}>

                <button onClick={() => handleLoadItem(item)}>Load</button>

                <ol>
                  {
                    Object.entries(item).map(([propName, propValue]) => {
                      if (propValue == null) {

                      }
                      else if (typeof propValue == 'object') {
                        return (<p>{propName}: <strong>{Object.entries(propValue).length} items</strong></p>)
                      }
                      else {
                        return (<p>{propName}: <strong>{propValue}</strong></p>)
                      }
                    }
                    )}

                </ol>


              </li>
            ))}
        </ul>

      </ul>
    </div>
  );
}

export default SakilaDBTest;