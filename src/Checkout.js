
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

    const [existingErrorText, setExistingErrorText] = useState("");
    const [newErrorText, setNewErrorText] = useState("");

    const [isLoading, setIsLoading] = useState(true);


    async function onCreateAccount() {
        setNewErrorText("");

        if (addressForm.address == null
            || addressForm.postal_code == null
            || form.first_name == null
            || form.last_name == null) {
            setNewErrorText("Some required fields are missing");
            return;
        }

        addressForm["last_update"] = new Date().toISOString().slice(0, 10);

        const newAddress = await sakilaApi.save(sakilaApi.Entities.Address, addressForm);
        console.log(newAddress);
        if (newAddress == null || newAddress == undefined) {
            setNewErrorText("There was an error with your address")
            return;
        }

        form["address"] = newAddress;
        form["active"] = true;
        form["create_date"] = new Date().toISOString().slice(0, 10);

        const newCustomer = await sakilaApi.save(sakilaApi.Entities.Customer, form);
        if (newCustomer == null || newCustomer == undefined) {
            setNewErrorText("There was an error with your customer details")
            return;
        }

        navigate("customer/" + newCustomer.customer_id);


    }

    useEffect(() => {

        const apiCall1 = sakilaApi.getAll(sakilaApi.Entities.City).then((c) => {
            setCities(c);
            handleAddressFormEntry("city", c[0]);
        });

        const apiCall2 = sakilaApi.getAll(sakilaApi.Entities.Store).then((s) => {
            setStores(s);
            handleFormEntry("store", s[0]);
        });

        await[apiCall1, apiCall2];

        setIsLoading(false);


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
        setExistingErrorText("");
        const c = await sakilaApi.getCustomerByEmail(email);
        if (c == null) {
            setExistingErrorText("Sorry, we couldn't find that email address")
        }
        else {
            navigate("customer/" + c.customer_id);
        }
    }

    const logo = require('./assets/logo.png');
    return !isLoading && (<div className='form-container'>

        <Link to='/'>
            <img class='logo' src={logo} />
        </Link>
        <div id="existing-customers-form" class='form existing-customers-form'>
            <h1>
                Existing Customers
            </h1>
            <h2>
                Enter email address:
            </h2>
            <input id='existing-email-input' onChange={(e) => setEmail(e.target.value)} />
            <button id="submit-existing-email" onClick={handleSubmitExistingEmail}>
                Submit
            </button>
            <p id="existing-email-error" class="error-text">{existingErrorText}</p>
        </div>

        <div id="new-customers-form" class='form new-customers-form'>


            <div class="flex-child">
                <h1>
                    New Customers
                </h1>

                <ul class="form-inputs">
                    <li>
                        <label>*First Name: </label>
                        <input id="first-name-input" onChange={(e) => handleFormEntry("first_name", e.target.value)}></input>

                    </li>
                    <li>
                        <label>*Last Name: </label>
                        <input id="last-name-input" onChange={(e) => handleFormEntry("last_name", e.target.value)}></input>

                    </li>
                    <li>
                        <label>*Email: </label>
                        <input id="email-input" onChange={(e) => handleFormEntry("email", e.target.value)}></input>

                    </li>
                    <li>
                        <label>Phone Number: </label>
                        <input id="phone-input" onChange={(e) => handleAddressFormEntry("phone", e.target.value)}></input>

                    </li>
                    <li>

                        <label>*Address Line 1: </label>
                        <input id="address-input" onChange={(e) => handleAddressFormEntry("address", e.target.value)}></input>

                    </li>
                    <li>

                        <label>Address Line 2: </label>
                        <input id="address2-input" onChange={(e) => handleAddressFormEntry("address2", e.target.value)}></input>

                    </li>
                    <li>
                        <label>District: </label>
                        <input id="district-input" onChange={(e) => handleAddressFormEntry("district", e.target.value)}></input>

                    </li>
                    <li>
                        <label>*Postcode: </label>
                        <input id="postcode-input" onChange={(e) => handleAddressFormEntry("postal_code", e.target.value)}></input>
                    </li>

                    <li>
                        <DropdownList label="Select your City: "
                            items={cities.map((c) => c.city)}
                            selectedOption={selectedCity}
                            onOptionChange={handleSelectedCityChange}>
                        </DropdownList>
                    </li>

                    <li>
                        <DropdownList label="Select your nearest store: "
                            items={stores.map((s) => s.address.address + ' (' + s.address.city.city + ')')}
                            selectedOption={selectedStore}
                            onOptionChange={handleSelectedStoreChange}>
                        </DropdownList>

                    </li>



                </ul>


                <button onClick={onCreateAccount}>
                    Create an Account
                </button>
                <p class="error-text">{newErrorText}</p>
            </div>

        </div>
    </div>)


}

export default Checkout;