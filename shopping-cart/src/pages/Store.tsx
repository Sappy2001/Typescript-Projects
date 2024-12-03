import { Col, Row } from "react-bootstrap";
import storeItems from "../data/items.json";

import { StoreItem } from "../components/StoreItem";

const Store = () => {
	return (
		<>
			<h1>Store</h1>
			<Row md={4} xs={2} lg={3} className="g-3">
				{storeItems.map((item) => (
					// column layout md-medium xs-small and lg-large={items}
					<Col className="m-3" key={item.id}>
						{/* destructuring and passing item obj as prop */}
						<StoreItem {...item} />
					</Col>
				))}
			</Row>
		</>
	);
};

export default Store;
