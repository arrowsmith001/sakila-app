
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Outlet, Route, Routes, useParams } from 'react-router-dom';
import './styles/Checkout.css';
import * as sakilaApi from './sakilaApi';
import DropdownList from './DropdownList';
import { useNavigate } from "react-router-dom";

function Checkout() {

    const navigate = useNavigate();

    const [stores, setStores] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedStore, setSelectedStore] = useState(0);
    const [selectedCity, setSelectedCity] = useState(0);

    const [form, setForm] = useState({});
    const [addressForm, setAddressForm] = useState({});


    async function onCreateAccount() {

        addressForm["last_update"] = new Date().toISOString().slice(0, 10);

        const newAddress = await sakilaApi.save(sakilaApi.Entities.Address, addressForm);

        form["address"] = newAddress;
        form["active"] = true;
        form["create_date"] = new Date().toISOString().slice(0, 10);

        const newCustomer = await sakilaApi.save(sakilaApi.Entities.Customer, form);

        navigate("customer/" + newCustomer.customer_id);

    }

    useEffect(() => {

        sakilaApi.getAll(sakilaApi.Entities.Store).then((s) => {
            setStores(s);
            handleFormEntry("store", stores[0]);
        });

        sakilaApi.getAll(sakilaApi.Entities.City).then((c) => {
            setCities(c);
            handleAddressFormEntry("city", cities[0]);
        });

    }, []);

    function handleSelectedStoreChange(s) {
        var i = parseInt(s);
        setSelectedStore(i);
        handleFormEntry("store", stores[i]);
    }
    function handleSelectedCityChange(c) {
        var i = parseInt(c);
        setSelectedCity(i);
        handleAddressFormEntry("city", cities[i]);
    }

    function handleFormEntry(k, v) {
        form[k] = v;
        setForm(form);
        console.log(form);
    }
    function handleAddressFormEntry(k, v) {
        addressForm[k] = v;
        setAddressForm(addressForm);
        console.log(addressForm);
    }


    const { id } = useParams();

    const [email, setEmail] = useState('');

    async function handleSubmitExistingEmail(event) {
        const c = await sakilaApi.getCustomerByEmail(email);
        if (c == null) {
            console.log("null customer");
        }
        else {
            // navigate
        }
    }

    return (<div>
        <h1>
            Existing Customers
        </h1>
        <h2 style={{ color: 'red' }}>
            Enter email address:
        </h2>
        <input onChange={(e) => setEmail(e.target.value)}>

        </input >
        <button onClick={handleSubmitExistingEmail}>
            Submit
        </button>
        <h1>
            New Customers
        </h1>

        <label>First Name: </label>
        <input onChange={(e) => handleFormEntry("first_name", e.target.value)}></input>
        <label>Last Name: </label>
        <input onChange={(e) => handleFormEntry("last_name", e.target.value)}></input>
        <label>Email: </label>
        <input onChange={(e) => handleFormEntry("email", e.target.value)}></input>
        <label>Phone Number: </label>
        <input onChange={(e) => handleAddressFormEntry("phone", e.target.value)}></input>
        <label>Address Line 1: </label>
        <input onChange={(e) => handleAddressFormEntry("address", e.target.value)}></input>
        <label>Address Line 2: </label>
        <input onChange={(e) => handleAddressFormEntry("address2", e.target.value)}></input>
        <label>District: </label>
        <input onChange={(e) => handleAddressFormEntry("district", e.target.value)}></input>
        <label>Postcode: </label>
        <input onChange={(e) => handleAddressFormEntry("postal_code", e.target.value)}></input>

        <DropdownList label="Select your City: "
            items={cities.map((c) => c.city)}
            selectedOption={selectedCity}
            onOptionChange={handleSelectedCityChange}

        >

        </DropdownList>

        <DropdownList label="Select your nearest store: "
            items={stores.map((s) => s.address.address + ' (' + s.address.city.city + ')')}
            selectedOption={selectedStore}
            onOptionChange={handleSelectedStoreChange}

        >

        </DropdownList>

        <button onClick={onCreateAccount}>
            Create an Account
        </button>
    </div>)


}

export default Checkout;