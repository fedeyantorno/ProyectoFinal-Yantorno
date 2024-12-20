import { useEffect, useState } from "react";
import Item from "../Item/Item";
import { useParams } from "react-router-dom";
import "./ItemListContainer.css";
import Loading from "../../Loading.jsx";
import { getProducts, getCategory } from "../../../firebase/firebase";

export default function ItemListContainer({ title }) {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();
  // Hacemos un renderizado condicional con el Loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryId) {
      getCategory(categoryId).then(products => setProducts(products))
      console.log(categoryId)
    } else {
      getProducts().then(products => setProducts(products))
      console.log(products)
    }
  }, [categoryId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <h2 className="pb-4 text-center">{title} {categoryId}</h2>
      {loading ? (
        <Loading />
      ) : (
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
            {products && products.map((product) => (
              <div className="col" key={product.id}>
                <Item product={product} />
              </div>
            ))}
          </div>
      )}
    </>
  );
}
