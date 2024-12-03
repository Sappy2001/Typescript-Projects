import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";

import CartItem from "./CartItem";

type shoppingCartProps = {
	isOpen: boolean;
};
const ShoppingCart = ({ isOpen }: shoppingCartProps) => {
	const { closeCart, cartItems } = useShoppingCart();

	return (
		<>
			<Offcanvas show={isOpen} placement="end" onHide={closeCart}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Cart</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Stack gap={3}>
						{cartItems.map((item) => {
							//sending all item data as props to CartItem
							return <CartItem key={item.id} {...item} />;
						})}
						<div className="ms-auto fw-bold fs-5">
							Total:$
							{cartItems.reduce((totalPrice, cartItem) => {
								// Finds the item from storeItems that matches the id of the current cartItem
								const item = storeItems.find((i) => i.id === cartItem.id);
								// Adds the price of the item multiplied by the quantity of the cartItem to the running total
								return totalPrice + (item?.price || 0) * cartItem.quantity;
							}, 0)}
						</div>
					</Stack>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};

export default ShoppingCart;
