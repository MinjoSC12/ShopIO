import "./PayForm.scss";
import { useState } from "react";
import { post } from "../../services";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Swal from 'sweetalert2';

export default function PayForm() {

    const [inputData, setInputData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        terms: false,
    });

    //

    const [productos, setProductos] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []);

    //

    //

    const prices = productos.map((producto) => producto.totalPrice);

    const fullPayment = prices.reduce((acumulador, valorActual) => {
        return acumulador + valorActual;
    }, 0);

    const amount = fullPayment.toFixed(2);

    console.log(prices);
    console.log(amount)

    //

    const handleInputChange = (event) => {
        setInputData({
            ...inputData,
            [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await post({ ...inputData, productos });
        Swal.fire({
            title: '¡Pedido creado con éxito!',
            text: 'Proceda a realizar el pago vía Paypal con el botón que se encuentra al costado del formulario de pedido. Una vez confirmado su pago procederemos a realizar el envió de este.',
            icon: 'success',
            confirmButtonText: 'Cerrar',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showCloseButton: true,
        })

    };

    return (
        <>
            <div className="maincontainer">
                <form onSubmit={handleSubmit} className="shipping-form">
                    <h2>Información de envío</h2>
                    <div className="form-group">
                        <label htmlFor="name">Nombres y apellidos</label>
                        <input type="text" id="name" name="name" value={inputData.name} onChange={handleInputChange} placeholder="Nombres y Apellidos" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" id="email" name="email" value={inputData.email} onChange={handleInputChange} placeholder="Correo electrónico" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Número de teléfono</label>
                        <input type="tel" id="phone" name="phone" value={inputData.phone} onChange={handleInputChange} placeholder="Teléfono" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Dirección</label>
                        <input type="text" id="address" name="address" value={inputData.address} onChange={handleInputChange} placeholder="Dirección a donde se enviará" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Ciudad</label>
                        <input type="text" id="city" name="city" value={inputData.city} onChange={handleInputChange} placeholder="Ciudad" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">Estado o provincia</label>
                        <input type="text" id="state" name="state" value={inputData.state} onChange={handleInputChange} placeholder="Región" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="zip">Código postal</label>
                        <input type="text" id="zip" name="zip" value={inputData.zip} onChange={handleInputChange} placeholder="Código postal" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Detalles de su pedido:</label>
                        <div className="producttable">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.map(producto =>
                                        <tr key={producto.id}>
                                            <td><input type="text" name="title" value={producto.title} onChange={handleInputChange} disabled /></td>
                                            <td><input className="quantityinput" name="quantity" type="number" value={producto.quantity} onChange={handleInputChange} disabled /></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="" id="termsdiv">
                        <input type="checkbox" id="terms" name="terms" value={inputData.terms} checked={inputData.terms} onChange={handleInputChange} required />
                        <label htmlFor="terms">Recibir novedades y ofertas</label>
                    </div>
                    <button type="submit">Confirmar el pedido</button>
                </form>
                <div className="listcontainer">
                    <div className="card">
                        <h2>Lista de productos</h2>
                        <ul>
                            {productos.map(producto =>
                                <li key={producto.id}>
                                    <span>{producto.title}</span>
                                    <span>$ {producto.totalPrice.toFixed(2)}</span>
                                </li>)}
                        </ul>
                        <div className="total">
                            <span>Total:</span>
                            <span>$ {fullPayment.toFixed(2)}</span>
                        </div>
                        <PayPalScriptProvider>
                            <PayPalButtons
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: amount 
                                                }
                                            }
                                        ]
                                    });
                                }}
                            />
                        </PayPalScriptProvider>
                    </div>
                </div>
            </div>
        </>
    );
}