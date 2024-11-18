import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";
import formatToIDRCurrency from "../../utils/formatToIDRCurrency";
import getAllProducts from "../../services/getAllProducts";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const allProducts = getAllProducts();
    const product = allProducts.find((prod) => prod.slug === slug);
    setProduct(product);
  }, []);

  if (!product) {
    return (
      <>
        <h1 className="flex w-full h-full text-center items-center justify-center text-4xl text-pink-600">
          PRODUCT NOT FOUND.
        </h1>
      </>
    );
  }
  return (
    <>
      <Navbar></Navbar>
      <div className="flex px-24 py-4 gap-[48px] items-center">
        <Link to="/">
          <FontAwesomeIcon
            icon={faArrowLeftLong}
            className="mb-0 text-[40px] text-white"
          />
        </Link>
        <h4 className="text-[32px] font-medium text-white">
          {product.name ?? "No Label"}
        </h4>
      </div>
      <div className="flex gap-[30px] px-24">
        <div className="">
          {/* <img src={product.imageUrl ?? (product.name ?? 'No Name')} alt={product.name ?? 'No Name'} className='block spect-[138/100] max-w-[400px] object-cover'/> */}
          <img
            src={product.imageUrl ?? product.name ?? "No Name"}
            alt={product.name ?? "No Name"}
            className="block w-[700px] h-[500px] object-cover"
          />
        </div>
        <div className="flex flex-col gap-[20px]">
          <span className="text-[40px] text-white font-medium">
            {formatToIDRCurrency(product.price) ?? `Not For Sale`}
          </span>
          {product.stock > 0 ? (
            product.stock <= 25 ? (
              <span className="font-medium text-yellow-500">
                Tersedia, Slot badut hampir habis
              </span>
            ) : (
              <span className="font-medium text-green-500">Tersedia</span>
            )
          ) : (
            <span className="font-medium text-red-500">Slot Badut Kosong</span>
          )}

          <span className="text-white">
            {product.category ?? "Uncategorized"}
          </span>

          {product.stock > 0 ? (
            <div>
              <Button
                type="button"
                className="inline-flex items-center justify-center gap-2 p-4 bg-[#000000] text-center hover:bg-[#5969cf] text-white active:bg-[#4956ab]"
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="mb-0 text-white"
                />
                <span className="text-white">Sewa Badut</span>
              </Button>
            </div>
          ) : (
            <div>
              <Button
                type="button"
                className="inline-flex items-center justify-center gap-2 p-4 bg-[#000000] text-center"
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="mb-0 text-white"
                />
                <span className="text-[#F3F3F3]">Sewa Badut</span>
              </Button>
            </div>
          )}

          <span className="font-medium text-white">Deskripsi</span>
          <p className="max-w-[500px] text-white bg-black p-2">
            {product.description ?? "No description."}
          </p>
        </div>
      </div>
    </>
  );
}
