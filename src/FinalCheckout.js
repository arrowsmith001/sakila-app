
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Outlet, Route, Routes, useParams } from 'react-router-dom';
import './styles/FinalCheckout.css';
import * as sakilaApi from './sakilaApi';
import DropdownList from './DropdownList';


function FinalCheckout() {

    const { film_id, customer_id } = useParams();

    const [film, setFilm] = useState({});
    const [customer, setCustomer] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);
    const [editableCustomer, setEditableCustomer] = useState({});

    function handleConfirmOrder() {

    }

    function handleAddressEdit(k, v) {
        editableCustomer.address.k = v;
        setEditableCustomer(editableCustomer);
        console.log(editableCustomer);
        console.log(customer);
    }

    function handleCustomerEdit(k, v) {
        editableCustomer[k] = v;
        setEditableCustomer(editableCustomer);
        console.log(editableCustomer);
        console.log(customer);
    }

    useEffect(() => {

        sakilaApi.getById(sakilaApi.Entities.Film, film_id).then((f) => setFilm(f));
        sakilaApi.getById(sakilaApi.Entities.Customer, customer_id).then((c) => {
            setCustomer(c);
            setEditableCustomer(Object.fromEntries(Object.entries(c)));
            console.log(c);
            setDataLoaded(true);

        });

        sakilaApi.getInventoriesByFilmIdAndStoreId. // TODO:

    }, []);

    return (
        <div>
            <h1>We're ready to complete your order, {customer.first_name}</h1>

            {dataLoaded && (
                <div>
                    <h2>Please confirm the following details are correct:</h2>
                    <label>First Name: </label>
                    <input defaultValue={customer.first_name} onChange={(e) => handleCustomerEdit("first_name", e.target.value)}></input>
                    <label>Last Name: </label>
                    <input defaultValue={customer.last_name} onChange={(e) => handleCustomerEdit("last_name", e.target.value)}></input>
                    <label>Phone Number: </label>
                    <input defaultValue={customer.phone} onChange={(e) => handleAddressEdit("phone", e.target.value)}></input>
                    <label>Address Line 1: </label>
                    <input defaultValue={customer.address.address} onChange={(e) => handleAddressEdit("address", e.target.value)}></input>
                    <label>Address Line 2: </label>
                    <input defaultValue={customer.address.address2} onChange={(e) => handleAddressEdit("address2", e.target.value)}></input>
                    <label>District: </label>
                    <input defaultValue={customer.address.district} onChange={(e) => handleAddressEdit("district", e.target.value)}></input>

                    <button onClick={handleConfirmOrder}>
                        Confirm Order
                    </button>
                </div>
            )}
        </div>
    )



}

export default FinalCheckout;