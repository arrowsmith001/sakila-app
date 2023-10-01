
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

        const lastUpdate = new Date().toISOString().slice(0, 19);
        console.log(lastUpdate);

        const newRental = await sakilaApi.save(sakilaApi.Entities.Rental, {
            'inventory': newInventory,
            'customer': customer,
            'staff': customer.store.manager,
            'lastUpdate': lastUpdate
        });

        const newOrders = Array.from(orders);
        newOrders.push(newRental);
        setOrders(newOrders);
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

    async function undoOrder(rental) {

        await sakilaApi.deleteById(sakilaApi.Entities.Rental, rental.rentalId);

        const newOrders = orders.filter((v) => v.rentalId != rental.rentalId);

        setOrders(newOrders);

        console.log(newOrders);
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
    const binIcon = require('./assets/bin.png');

    return (
        <div class="form-container">

            <ul>

                <h1 style={{ position: 'absolute', margin: '12px' }}>We're ready to complete your order, {customer.firstName}</h1>

                {/* <div class="movie-static-container">
                <img class="movie-static" src={img} />
            </div> */}

                <div className='big-padded'>
                    <div class="box">

                    </div>


                    {dataLoaded && (
                        <div>
                            <Link to='/'>
                                <img class='logo' src={logo} />
                            </Link>
                            <div class="form left">
                                <h2>Please confirm the following details are correct:</h2>
                                <table class="form-inputs">


                                    <tr>
                                        <td className='text-align-end'>

                                            <label>First Name: </label>
                                        </td>
                                        <td>

                                            <input defaultValue={customer.firstName} onChange={(e) => handleCustomerEdit("firstName", e.target.value)}></input>

                                        </td>
                                    </tr>
                                    <tr>

                                        <td className='text-align-end'>

                                            <label>Last Name: </label>
                                        </td>

                                        <td>

                                            <input defaultValue={customer.lastName} onChange={(e) => handleCustomerEdit("lastName", e.target.value)}></input>

                                        </td>
                                    </tr>
                                    <tr>

                                        <td className='text-align-end'>

                                            <label>Phone Number: </label>
                                        </td>

                                        <td>

                                            <input defaultValue={customer.address.phone} onChange={(e) => handleAddressEdit("phone", e.target.value)}></input>

                                        </td>
                                    </tr>
                                    <tr>

                                        <td className='text-align-end'>

                                            <label>Address line 1: </label>
                                        </td>

                                        <td>

                                            <input defaultValue={customer.address.address1} onChange={(e) => handleAddressEdit("address1", e.target.value)}></input>

                                        </td>
                                    </tr>
                                    <tr>

                                        <td className='text-align-end'>

                                            <label>Address line 2: </label>
                                        </td>

                                        <td>

                                            <input defaultValue={customer.address.address2} onChange={(e) => handleAddressEdit("address2", e.target.value)}></input>

                                        </td>
                                    </tr>
                                    <tr>

                                        <td className='text-align-end'>

                                            <label>District: </label>
                                        </td>

                                        <td>

                                            <input defaultValue={customer.address.district} onChange={(e) => handleAddressEdit("district", e.target.value)}></input>

                                        </td>
                                    </tr>
                                    <tr>

                                        <td className='text-align-end'>

                                            <label>Postcode: </label>
                                        </td>

                                        <td>

                                            <input defaultValue={customer.address.postalCode} onChange={(e) => handleAddressEdit("postalCode", e.target.value)}></input>

                                        </td>
                                    </tr>
                                    <tr className='text-align-center'>
                                        <td></td>
                                        <td>
                                            {
                                                (
                                                    <div style={{ visibility: canUpdate ? 'visible' : 'hidden' }}>
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
                                                (<div style={{ visibility: (!canUpdate && updateSuccessful) ? 'visible' : 'hidden' }}>
                                                    <p>Your details have been updated</p>
                                                </div>)
                                            }
                                        </td>

                                    </tr>

                                    <tr className='text-align-center' >
                                        <td className='text-align-center'>

                                            <div class="movie-static-container-small">
                                                <img class="movie-static-small" src={img} />
                                            </div>
                                            <p>
                                                {film.title} x 1 (£{film.rentalRate})
                                            </p>
                                        </td>
                                        <td>
                                            <button style={{ backgroundColor: 'red', color: 'white' }} onClick={handleConfirmOrder}>
                                                Confirm Order
                                            </button>
                                        </td>
                                    </tr>


                                </table>
                            </div>
                        </div>
                    )}
                </div>



                {
                    (orders.length > 0) &&

                    (<div className='right-panel'>

                        <h2>Your orders:</h2>

                        {

                            orders.map((order) => {

                                console.log(order);

                                return (
                                    <tr className='order'>
                                        <td>
                                            <img width={25} height={25} src={binIcon} onClick={(e) => undoOrder(order)}>
                                            </img>
                                        </td>
                                        <td>

                                            <h3>
                                                {order.inventory.film.title}</h3>
                                            <h3>

                                                {(new Date(order.lastUpdate)).toString().slice(0, 25)}
                                            </h3>
                                        </td>
                                    </tr>
                                );
                            })
                        }

                    </div>)
                }



            </ul>


        </div>
    )



}

export default FinalCheckout;