
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Outlet, Route, Routes, useParams } from 'react-router-dom';
import './styles/Checkout.css';
import * as sakilaApi from './sakilaApi';
import DropdownList from './DropdownList';


function FinalCheckout() {

    const { filmId, customerId } = useParams();

    const [film, setFilm] = useState({});
    var [img, setImg] = useState({});
    const [customer, setCustomer] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);
    const [editableCustomer, setEditableCustomer] = useState({});
    const [canUpdate, setCanUpdate] = useState(false);
    const [updateSuccessful, setUpdateSuccessful] = useState(false);
    const [orders, setOrders] = useState([]);

    async function handleConfirmOrder() {
        const newInventory = await sakilaApi.save(sakilaApi.Entities.Inventory, {
            'film': film,
            'store': customer.store
        });

        const newRental = await sakilaApi.save(sakilaApi.Entities.Rental, {
            'inventory': newInventory,
            'customer': customer,
            'staff': customer.store.manager
        });

        console.log(newRental);

        const newOrders = Array.from(orders);
        newOrders.push(newRental.rentalId);
        setOrders(newOrders);

        console.log(newOrders);
    }

    function handleAddressEdit(k, v) {
        setCanUpdate(true);
        editableCustomer.address[k] = v;
        setEditableCustomer(editableCustomer);
        console.log(editableCustomer);
        console.log(customer);
    }

    function handleCustomerEdit(k, v) {
        setCanUpdate(true);
        editableCustomer[k] = v;
        setEditableCustomer(editableCustomer);
        console.log(editableCustomer);
        console.log(customer);
    }

    async function handleUpdate(e) {

        const a = await sakilaApi.save(sakilaApi.Entities.Address, editableCustomer.address);
        editableCustomer.address = a;
        const c = await sakilaApi.save(sakilaApi.Entities.Customer, editableCustomer);
        setCustomer(c);
        setEditableCustomer(Object.fromEntries(Object.entries(c)));
        setCanUpdate(false);
        setUpdateSuccessful(true);
    }
    async function handleRevert(e) {

        window.location.reload();
    }

    async function undoOrder() {
        console.log(orders);
        const rentalId = orders[orders.length - 1];
        await sakilaApi.deleteById(sakilaApi.Entities.Rental, rentalId);
        setOrders(orders.slice(0, orders.length - 1));
        console.log(orders);
    }

    useEffect(() => {

        sakilaApi.getById(sakilaApi.Entities.Film, filmId).then((f) => {

            const imagePath = require(`./assets/posters/${f.title}.png`);
            setFilm(f);
            setImg(imagePath);

        }).then(() => {
            sakilaApi.getById(sakilaApi.Entities.Customer, customerId).then((c) => {
                setCustomer(c);
                setEditableCustomer(Object.fromEntries(Object.entries(c)));
                console.log(c);
                setDataLoaded(true);

            });
        });


        //sakilaApi.getInventoriesByFilmIdAndStoreId. // TODO:

    }, []);

    const logo = require('./assets/logo.png');

    return (
        <div class="form-container">

            <ul>

                <h1>We're ready to complete your order, {customer.firstName}</h1>

                {/* <div class="movie-static-container">
                <img class="movie-static" src={img} />
            </div> */}

                <div>
                    <div class="box">

                    </div>


                    {dataLoaded && (
                        <div>
                            <Link to='/'>
                                <img class='logo' src={logo} />
                            </Link>
                            <div class="form right">
                                <ul class="form-inputs">
                                    <li>
                                        <h2>Please confirm the following details are correct:</h2>


                                    </li>
                                    <li>
                                        <label>First Name: </label>
                                        <input defaultValue={customer.firstName} onChange={(e) => handleCustomerEdit("firstName", e.target.value)}></input>

                                    </li>
                                    <li>
                                        <label>Last Name: </label>
                                        <input defaultValue={customer.lastName} onChange={(e) => handleCustomerEdit("lastName", e.target.value)}></input>

                                    </li>
                                    <li>
                                        <label>Phone Number: </label>
                                        <input defaultValue={customer.address.phone} onChange={(e) => handleAddressEdit("phone", e.target.value)}></input>

                                    </li>
                                    <li>
                                        <label>Address Line 1: </label>
                                        <input defaultValue={customer.address.address1} onChange={(e) => handleAddressEdit("address1", e.target.value)}></input>

                                    </li>
                                    <li>
                                        <label>Address Line 2: </label>
                                        <input defaultValue={customer.address.address2} onChange={(e) => handleAddressEdit("address2", e.target.value)}></input>

                                    </li>
                                    <li>
                                        <label>District: </label>
                                        <input defaultValue={customer.address.district} onChange={(e) => handleAddressEdit("district", e.target.value)}></input>

                                    </li>
                                    {
                                        canUpdate && (
                                            <div>
                                                <button onClick={handleUpdate}>
                                                    Update
                                                </button>
                                                <button onClick={handleRevert}>
                                                    Revert Changes
                                                </button>
                                            </div>
                                        )
                                    }
                                    {
                                        (!canUpdate && updateSuccessful)
                                        && (
                                            <p>Your details have been updated</p>
                                        )
                                    }
                                    <li>
                                        <ul style={{ 'display': 'inline-block' }}>
                                            <div class="movie-static-container-small">
                                                <img class="movie-static-small" src={img} />
                                            </div>
                                            <p>
                                                {film.title} x 1 (£{film.rentalRate})
                                            </p>
                                        </ul>
                                    </li>

                                    <button onClick={handleConfirmOrder}>
                                        Confirm Order
                                    </button>
                                    {
                                        (orders.length > 0) &&

                                        (<div>
                                            <button onClick={undoOrder} style={{ 'color': 'red' }}>
                                                Undo Last Order
                                            </button>
                                        </div>)


                                    }

                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </ul>


        </div>
    )



}

export default FinalCheckout;