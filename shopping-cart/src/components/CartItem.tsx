import storeItems from "../data/items.json";
import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";

type cartItemProps = {
	id: number;
	quantity: number;
};

const CartItem = ({ id, quantity }: cartItemProps) => {
	const { removeFromCart } = useShoppingCart();

	const item = storeItems.find((item) => item.id === id);
	if (item == null) return null;

	return (
		<Stack direction="horizontal" gap={3} className="d-flex align-items-center">
			<img
				src={item.imgUrl}
				alt=""
				style={{ width: "125px", height: "75px", objectFit: "cover" }}
			/>
			<div className="me-auto">
				{item.name}
				{quantity > 1 && (
					<span className="text-muted" style={{ fontSize: "0.75rem" }}>
						x{quantity}
					</span>
				)}
				<div className="text-muted" style={{ fontSize: "0.90rem" }}>
					${item.price}
				</div>
			</div>
			<div>
				${quantity * item.price}
				<Button
					variant="outline-danger"
					style={{ marginLeft: "0.5rem" }}
					size="sm"
					onClick={() => removeFromCart(item.id)}
				>
					&times;
				</Button>
			</div>
		</Stack>
	);
};

export default CartItem;
