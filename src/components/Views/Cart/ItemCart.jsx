import { Link } from "react-router-dom";
import "./ItemCart.css";
import ItemCountComponent from "../../SectionHome/ItemCount/ItemCountComponent";
import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext.jsx";

export default function ItemCart({ product }) {

  let [cart, setCart, , getItemQuantity] = useContext(CartContext)
  const [quantity, setQuantity] = useState(getItemQuantity(product.id))

  const sendCounterValue = (count) => {
    setQuantity(count)
    // Actualizamos la cantidad en el cart
    const updatedCartQuantity = cart.map(item => 
      item.id === product.id ? {...item, quantity: count} : item
    )
    setCart(updatedCartQuantity)
  }

  const removeItem = () => {
    // Filtramos todos los items por ID
    const updatedRemoveItem = cart.filter(item => item.id !== product.id);
    // Actualizamos el estado del cart con items filtrados
    setCart(updatedRemoveItem);
    // Si se elimina el último item reasignamos el cart con un array vacío
    if (updatedRemoveItem.length === 0) {
      cart = [];
    }
    console.log(updatedRemoveItem.length)
    console.log(cart);
  }

  const totalPrice = product.price * quantity

  return (
    <div className="card mb-4 cart-item">
      <div className="row g-0">
        <div className="col-lg-4">
          <Link to={`/item/${product.id}`}>
            <img
              src={product.image}
              className="img-fluid rounded-start"
              alt={product.name}
            />
          </Link>
        </div>

        <div className="col-lg-8">
          <div className="card-body d-flex flex-column">
            <Link to={`/item/${product.id}`}>
              <h4 className="card-title">{product.name}</h4>
            </Link>
            <div className="d-flex flex-column mt-1">
              <h6 className="text-price mt-1">
                <span className="grey">Precio:</span>{" "}
                <span className="green">${product.price}.-</span>
              </h6>
              <h6 className="text-price">
                <span className="grey">Precio total:</span>{" "}
                <span className="green">${totalPrice}.-</span>
              </h6>
                <p className="text-item-count"><span className="grey">Stock:</span> <span className="green">{product.stock}</span></p>
            </div>

            <div className="d-flex justify-content-start align-items-center">
              <p className="text-item-count mt-2">Agregue o elimine items </p>
              <div>
                <ItemCountComponent stock={product.stock} sendCounterValue={sendCounterValue} initial={quantity}/>
              </div>
            </div>

            <button onClick={removeItem} className="btn btn-primary btn-text">
              Eliminar del carrito
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
