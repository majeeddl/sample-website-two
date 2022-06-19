import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Products = lazy(() => import("./Products"));
const ProductsView = lazy(() => import("./View"));
const ProductsEdit = lazy(() => import("./Edit"));

const ProductsIndex = () => {
  return (
    <Routes>
      <Route index element={<Products />} />
      <Route path="view/:id" element={<ProductsView />} />
      <Route path="create" element={<ProductsEdit />} />
      <Route path="update/:id" element={<ProductsEdit />} />
    </Routes>
  );
};

export default ProductsIndex;
