
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Outlet, Route, Routes, useParams } from 'react-router-dom';
import './styles/Checkout.css';
import * as sakilaApi from './sakilaApi';
import DropdownList from './DropdownList';
import { useNavigate } from "react-router-dom";
import Spinner from './Spinner';

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

        if (addressForm.address1 == null
            || addressForm.postalCode == null
            || form.firstName == null
            || form.lastName == null) {
            setNewErrorText("Some required fields are missing");
            return;
        }

        addressForm["lastUpdate"] = new Date().toISOString().slice(0, 19);

        console.log(addressForm);
        const newAddress = await sakilaApi.save(sakilaApi.Entities.Address, addressForm);
        console.log(newAddress);
        if (newAddress == null || newAddress == undefined) {
            setNewErrorText("There was an error with your address")
            return;
        }

        form["address"] = newAddress;
        form["active"] = true;
        form["createDate"] = new Date().toISOString().slice(0, 10);

        const newCustomer = await sakilaApi.save(sakilaApi.Entities.Customer, form);

        if (newCustomer === null || newCustomer === undefined) {
            setNewErrorText("There was an error with your customer details")
            return;
        }
        else {
            navigate("customer/" + newCustomer.customerId);
        }



    }

    useEffect(() => {

        setup();


    }, []);

    async function setup() {

        const apiCall1 = sakilaApi.getAll(sakilaApi.Entities.City).then((c) => {
            setCities(c);
            handleAddressFormEntry("city", c[0]);
        });

        const apiCall2 = sakilaApi.getAll(sakilaApi.Entities.Store).then((s) => {
            setStores(s);
            handleFormEntry("store", s[0]);
        });

        const a = {
            result1: await apiCall1,
            result2: await apiCall2,
        };

        setIsLoading(false);
    }

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
            navigate("customer/" + c.customerId);
        }
    }

    const logo = require('./assets/logo.png');
    return isLoading ? (<div style={{ width: '100vw', height: "100vh", backgroundColor: 'black' }}>
        <Spinner></Spinner>
    </div>) : (<div className='form-container'>

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
            <button style={{ marginLeft: '24px' }} id="submit-existing-email" onClick={handleSubmitExistingEmail}>
                Submit
            </button>
            <p id="existing-email-error" class="error-text">{existingErrorText}</p>
        </div>

        <div id="new-customers-form" class='form new-customers-form'>


            <div class="flex-child">
                <h1>
                    New Customers
                </h1>

                <table class="form-inputs">
                    <tr>
                        <td className='text-align-end'>

                            <label>*First Name: </label>
                        </td>
                        <td>
                            <input id="first-name-input" onChange={(e) => handleFormEntry("firstName", e.target.value)}></input>

                        </td>
                    </tr>
                    <tr>
                        <td className='text-align-end'>

                            <label>*Last Name: </label>
                        </td>
                        <td>

                            <input id="last-name-input" onChange={(e) => handleFormEntry("lastName", e.target.value)}></input>
                        </td>

                    </tr>
                    <tr>
                        <td className='text-align-end'>

                            <label>*Email: </label>
                        </td>
                        <td>

                            <input id="email-input" onChange={(e) => handleFormEntry("email", e.target.value)}></input>
                        </td>

                    </tr>
                    <tr>
                        <td className='text-align-end'>

                            <label>Phone Number: </label>
                        </td>
                        <td>

                            <input id="phone-input" onChange={(e) => handleAddressFormEntry("phone", e.target.value)}></input>
                        </td>

                    </tr>
                    <tr>

                        <td className='text-align-end'>

                            <label>*Address Line 1: </label>
                        </td>
                        <td>
                            <input id="address-input" onChange={(e) => handleAddressFormEntry("address1", e.target.value)}></input>

                        </td>


                    </tr>
                    <tr>

                        <td className='text-align-end'>

                            <label>Address Line 2: </label>
                        </td>
                        <td>

                            <input id="address2-input" onChange={(e) => handleAddressFormEntry("address2", e.target.value)}></input>
                        </td>

                    </tr>
                    <tr>
                        <td className='text-align-end'>

                            <label>District: </label>
                        </td>
                        <td>

                            <input id="district-input" onChange={(e) => handleAddressFormEntry("district", e.target.value)}></input>
                        </td>

                    </tr>
                    <tr>
                        <td className='text-align-end'>

                            <label>*Postcode: </label>
                        </td>
                        <td>

                            <input id="postcode-input" onChange={(e) => handleAddressFormEntry("postalCode", e.target.value)}></input>
                        </td>
                    </tr>

                    <DropdownList label="Select your City"
                        items={cities.map((c) => c.cityName)}
                        selectedOption={selectedCity}
                        onOptionChange={handleSelectedCityChange}
                        wrapLabel={(l) => (<td className='text-align-end'>{l}</td>)}
                        wrapSelect={(s) => (<td className='text-align-start'>{s}</td>)}
                        rootOverride={(r) => (<tr>{r}</tr>)}>
                    </DropdownList>

                    <DropdownList label="Select your nearest store"
                        items={stores.map((s) => s.address.address1 + ' (' + s.address.city.cityName + ')')}
                        selectedOption={selectedStore}
                        onOptionChange={handleSelectedStoreChange}
                        wrapLabel={(l) => (<td className='text-align-end'>{l}</td>)}
                        wrapSelect={(s) => (<td className='text-align-start'>{s}</td>)}
                        rootOverride={(r) => (<tr>{r}</tr>)}>
                    </DropdownList>

                </table>


                <div className='text-align-center'>

                    <button className='padded' onClick={onCreateAccount}>
                        Create an Account
                    </button>
                    <p class="error-text">{newErrorText}</p>
                </div>
            </div>

        </div>
    </div>)


}

export default Checkout;