import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";

// setting type for storItem obj
type StoreItemProps = {
	id: number;
	name: string;
	price: number;
	imgUrl: string;
};

// ReactElement is similar to React.FC only used for named function components
export function StoreItem({
	id,
	name,
	price,
	imgUrl,
}: StoreItemProps): React.ReactElement {
	const {
		getItemQuantity,
		increaseCartQuantity,
		decreaseCartQuantity,
		removeFromCart,
	} = useShoppingCart();
	const quantity = getItemQuantity(id);
	return (
		<Card className="h-100">
			<Card.Img
				variant="top"
				src={imgUrl}
				height="200px"
				style={{ objectFit: "cover" }}
			/>
			<Card.Body className="d-flex flex-column">
				<Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
					<span className="fs-2">{name}</span>
					<span className="ms-2 text-muted">${price}</span>
				</Card.Title>
				<div className=" mt-auto">
					{quantity == 0 ? (
						<Button className="w-100" onClick={() => increaseCartQuantity(id)}>
							Add to Cart
						</Button>
					) : (
						<div className="d-flex align-items-center flex-column">
							<div
								className="d-flex align-items-center justify-content-center mb-1"
								style={{ gap: ".5rem" }}
							>
								<Button onClick={() => increaseCartQuantity(id)}>+</Button>
								<span className="fs-3">{quantity}</span> in cart
								<Button onClick={() => decreaseCartQuantity(id)}>-</Button>
							</div>
							<Button
								variant="danger"
								size="sm"
								onClick={() => removeFromCart(id)}
							>
								Remove
							</Button>
						</div>
					)}
				</div>
			</Card.Body>
		</Card>
	);
}
