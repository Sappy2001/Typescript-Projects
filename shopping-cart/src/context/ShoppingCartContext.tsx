import { ReactNode, createContext, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

// providig type to the children element that is wrapped by context

// ReactNode accepts- JSX,string or null.
type ShoppingCartProviderProps = {
	children: ReactNode;
};

type CartItemProps = {
	id: number;
	quantity: number;
};

// defining type of ShoppingCartContext,4 functions
type ShoppingCartContext = {
	openCart: () => void;
	closeCart: () => void;
	getItemQuantity: (id: number) => number;
	increaseCartQuantity: (id: number) => void;
	decreaseCartQuantity: (id: number) => void;
	removeFromCart: (id: number) => void;
	cartQuantity: number;
	cartItems: CartItemProps[];
};

// initializing context with empty obj and type as ShoppingCartContext
const ShoppingCartContext = createContext({} as ShoppingCartContext);

//this will just return the useContext
export function useShoppingCart() {
	return useContext(ShoppingCartContext);
}

//this is the provider function which wraps the element in which the shoppingCart value would be used
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
	const [cartItems, setCartItems] = useLocalStorage<CartItemProps[]>(
		"shopping-cart",
		[]
	);
	const [isOpen, setisOpen] = useState<boolean>(false);

	// to open and close the side cart navigation
	const openCart = () => setisOpen(true);
	const closeCart = () => setisOpen(false);

	// .find() method iterates on each array elm and returns first matched value or undefined
	function getItemQuantity(id: number) {
		return (
			cartItems.find((item: CartItemProps) => item.id === id)?.quantity || 0
		);
	}

	// writing a cb func inside setCartItems which passes the whole cartItem array,when an item is not found an object of item is created and added to cart
	function increaseCartQuantity(id: number) {
		setCartItems((currItems: CartItemProps[]) => {
			if (currItems.find((item) => item.id === id) == undefined) {
				return [...currItems, { id, quantity: 1 }];
			} else {
				// this will return an array eith the object to be changed
				return currItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				});
			}
		});
	}

	function decreaseCartQuantity(id: number) {
		setCartItems((cartItems: CartItemProps[]) => {
			//return a new list if the item has only 1 qnt
			if (cartItems.find((item) => item.id === id)?.quantity === 1) {
				return cartItems.filter((item) => item.id !== id);
			}
			return cartItems.map((item) => {
				if (item.id === id) {
					return { ...item, quantity: item.quantity - 1 };
				} else return item;
			});
		});
	}

	function removeFromCart(id: number) {
		setCartItems((currItems: CartItemProps[]) => {
			return currItems.filter((item) => item.id !== id);
		});
	}

	// redce function takes 2  args (cbfunc,initialvalue) inval=0,
	// the totalQuantity used to store the totalvalue from each item ,
	// and item gets changed for each iteration

	const cartQuantity = cartItems.reduce(
		(totalQuantity: number, item: CartItemProps) =>
			item.quantity + totalQuantity,
		0
	);

	return (
		<ShoppingCartContext.Provider
			value={{
				getItemQuantity,
				increaseCartQuantity,
				decreaseCartQuantity,
				removeFromCart,
				cartItems,
				cartQuantity,
				openCart,
				closeCart,
			}}
		>
			{children}
			<ShoppingCart isOpen={isOpen} />
		</ShoppingCartContext.Provider>
	);
}
