import React from "react";
import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
export function Navbar() {
	const { openCart, closeCart, cartQuantity } = useShoppingCart();

	return (
		<NavbarBs sticky="top" className="bg-white shadow-sm mb-3 ">
			<Container className="m-0">
				<Nav className="me-auto">
					{/* Nav.Link is a bs comp and is acting as NavLink from router */}
					<Nav.Link as={NavLink} to="/">
						Home
					</Nav.Link>
					<Nav.Link as={NavLink} to="/store">
						Store
					</Nav.Link>
					<Nav.Link as={NavLink} to="/about">
						About
					</Nav.Link>
				</Nav>
				{cartQuantity > 0 && (
					<Button
						style={{ width: "3rem", height: "3rem", position: "relative" }}
						variant="outline-primary"
						className="rounded-circle"
						onClick={openCart}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" />
						</svg>
						<div
							className="rounded bg-danger d-flex justify-content-center align-items-center"
							style={{
								color: "white",
								width: "1.2rem",
								height: "1.2rem",
								position: "absolute",
								bottom: 0,
								right: 0,
								transform: "translate(25%,25%)",
							}}
						>
							{cartQuantity}
						</div>
					</Button>
				)}
			</Container>
		</NavbarBs>
	);
}
