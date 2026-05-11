import API_BASE_URL from '../Utils/apiConfig.js';
// import React, { useState, useEffect } from "react";
// import axios from "axios"; // Ensure axios is installed
// import * as XLSX from "xlsx";
// import { formatCurrency } from "../Utils/formateCurrency";

// const Adashbord = () => {
//   const [products, setProducts] = useState(() => {
//     const savedProducts = localStorage.getItem("products");
//     return savedProducts ? JSON.parse(savedProducts) : [];
//   });

//   console.log(products);


//   const [productName, setProductName] = useState("");
//   const [productPrice, setProductPrice] = useState("");
//   const [productImage, setProductImage] = useState("");
//   const [productCategory, setProductCategory] = useState("");
//   const [sku, setSku] = useState("");
//   const [name, setName] = useState("");

//   // Save products to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem("products", JSON.stringify(products));
//   }, [products]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newProduct = {
//       id: sku,
//       title: name,
//       price: productPrice,
//       image01: productImage,
//       category: productCategory,
//     };

//     setProducts([...products, newProduct]);
//     setProductName("");
//     setProductPrice("");
//     setProductImage("");
//     setProductCategory("");
//     setSku("")
//     setName("")
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet);

//       const newProducts = jsonData.map((row) => ({
//         id: row.SKU,
//         // ttl: row.Title,
//         title: row.title,
//         price: row.price || 0,
//         image01: row.image01 || "",
//         category: row.category || "Miscellaneous",
//       }));

//       // Filter out duplicate products
//       const filteredProducts = newProducts.filter((newProduct) => {
//         return !products.some(
//           (existingProduct) =>
//             existingProduct.title === newProduct.title &&
//             existingProduct.category === newProduct.category
//         );
//       });

//       // Add only the new products (non-duplicates)
//       setProducts([...products, ...filteredProducts]);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const handleDelete = (index) => {
//     const updatedProducts = products.filter((_, i) => i !== index);
//     setProducts(updatedProducts);
//     localStorage.setItem("products", JSON.stringify(updatedProducts));
//   };

//   const handleUploadToBackend = async () => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/v1/upload/post_upload`, {
//         products,
//       });
//       alert("Data uploaded successfully!");
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error uploading data:", error);
//       alert("Failed to upload data. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <div className="container my-4">
//         {/* <h2 className="mb-4">Add New Product</h2> */}
//         {/* <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="productName" className="form-label">
//               Product Name
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="productName"
//               value={productName}
//               onChange={(e) => setProductName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="productPrice" className="form-label">
//               Price (₹)
//             </label>
//             <input
//               type="number"
//               className="form-control"
//               id="productPrice"
//               value={productPrice}
//               onChange={(e) => setProductPrice(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="productImage" className="form-label">
//               Product Image URL
//             </label>
//             <input
//               type="url"
//               className="form-control"
//               id="productImage"
//               value={productImage}
//               onChange={(e) => setProductImage(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="productCategory" className="form-label">
//               Category
//             </label>
//             <select
//               className="form-select"
//               id="productCategory"
//               value={productCategory}
//               onChange={(e) => setProductCategory(e.target.value)}
//               required
//             >
//               <option value="">Select Category</option>
//               <option value="Ring">Ring</option>
//               <option value="Earring">Earring</option>
//               <option value="Bracelet">Bracelet</option>
//               <option value="Pendents">Pendents</option>
//             </select>
//           </div>
//           <button type="submit" className="btn btn-primary">
//             Add Product
//           </button>
//         </form> */}
//         <div className="mt-4">
//           <label htmlFor="fileUpload" className="form-label">
//             Upload Excel File
//           </label>
//           <input
//             type="file"
//             id="fileUpload"
//             accept=".xlsx, .xls"
//             className="form-control"
//             onChange={handleFileUpload}
//           />
//         </div>
//         <button className="btn btn-success" onClick={handleUploadToBackend}>
//           Upload to Backend
//         </button>
//         <h2 className="mt-5 mb-4">Product List</h2>
//         <div className="row g-4" id="productList">
//           {products.map((product, index) => (
//             <div key={index} className="col-md-3">
//               <div className="product-card">
//                 <img
//                   src={product.image01 || "https://via.placeholder.com/150"}
//                   alt={product.title}
//                   className="img-fluid"
//                 />
//                 <div className="product-info">
//                   {/* <p>{product.id}</p> */}
//                   <h5>{product.title}</h5>
//                   {/* <p>Category: {product.ttl}</p> */}
//                   {/* <p>SKU: {product.id}</p> */}
//                   <p className="price">{formatCurrency(product.price)}</p>
//                   <button
//                     className="btn btn-danger mt-2"
//                     onClick={() => handleDelete(index)}
//                   >
//                     Delete Product
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Adashbord;


import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { formatCurrency } from "../Utils/formateCurrency";

const Adashbord = () => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const newProducts = jsonData.map((row) => ({
        id: row.SKU,
        title: row.Title,
        gender: row.Gender,
        price14KT: row["Gprice(14)"] || 0,
        price18KT: row["Gprice(18)"] || 0,
        diamondprice: row["Dprice"] || 0,
        makingCharge14KT: row["MC(14)"] || 0,
        makingCharge18KT: row["MC(18)"] || 0,
        gst14KT: row["GST(14)"] || 0,
        gst18KT: row["GST(18)"] || 0,
        total14KT: row["Total(14)"] || 0,
        total18KT: row["Total(18)"] || 0,
        netWeight14KT: row["NetWeight(14)"] || 0,
        netWeight18KT: row["NetWeight(18)"] || 0,
        grossWt: row["GrossWt"] || 0,
        image01: row.Image01 || "", // Add image fields
        image02: row.Image02 || "",
        image03: row.Image03 || "",
        image04: row.Image04 || "",
        image05: row.Image05 || "",
        video: row.Video || "", // Add video field
        category: row.Category || "category",
        subCategory: row.SubCategory || "subCategory",
        material: row.Material || "material",
        gift: row.Gift || "gift",
        priceType: "14KT", // Default price type
      }));


      const filteredProducts = newProducts.filter((newProduct) => {
        return !products.some(
          (existingProduct) =>
            existingProduct.title === newProduct.title &&
            existingProduct.category === newProduct.category &&
            existingProduct.gender === newProduct.gender
        );
      });

      setProducts([...products, ...filteredProducts]);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const togglePriceType = (index, type) => {
    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, priceType: type } : product
    );
    setProducts(updatedProducts);
  };

  const handleUploadToBackend = async () => {
    try {
      console.log("Uploading products:", products);

      const formattedProducts = products.map((product) => ({
        title: product.title,
        gender: product.gender,
        category: product.category,
        subCategory: product.subCategory,
        material: product.material,
        gift: product.gift,
        price14KT: product.price14KT,
        price18KT: product.price18KT,
        diamondprice: product.diamondprice,
        makingCharge14KT: product.makingCharge14KT,
        makingCharge18KT: product.makingCharge18KT,
        gst14KT: product.gst14KT,
        gst18KT: product.gst18KT,
        total14KT: product.total14KT,
        total18KT: product.total18KT,
        netWeight14KT: product.netWeight14KT,
        netWeight18KT: product.netWeight18KT,
        grossWt: product.grossWt,
        img: product.image01,
        image02: product.image02,
        image03: product.image03,
        image04: product.image04,
        image05: product.image05,
        video: product.video,
        id: product.id,
      }));


      console.log("Formatted products:", formattedProducts);

      const response = await axios.post(
        `${API_BASE_URL}/v1/upload/post_upload`,
        { products: formattedProducts }
      );

      alert("Data uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Failed to upload data. Please try again.");
    }
  };

  return (
    <div>
      <div className="container my-4">
        <div className="mt-4">
          <label htmlFor="fileUpload" className="form-label">
            Upload Excel File
          </label>
          <input
            type="file"
            id="fileUpload"
            accept=".xlsx, .xls"
            className="form-control"
            onChange={handleFileUpload}
          />
        </div>
        <button className="btn btn-success mt-3" onClick={handleUploadToBackend}>
          Upload to Backend
        </button>

        <h2 className="mt-5 mb-4">Product List</h2>
        <div className="row g-4" id="productList">
          {products.map((product, index) => (
            <div key={index} className="col-md-3">
              <div className="product-card">
                <img
                  src={product.image01 || "https://via.placeholder.com/150"}
                  alt={product.title}
                  className="img-fluid"
                />
                {product.image02 && (
                  <img
                    src={product.image02}
                    alt={`${product.title} - Image02`}
                    className="img-fluid mt-2"
                  />
                )}
                {product.image03 && (
                  <img
                    src={product.image03}
                    alt={`${product.title} - Image03`}
                    className="img-fluid mt-2"
                  />
                )}
                {product.image04 && (
                  <img
                    src={product.image04}
                    alt={`${product.title} - Image04`}
                    className="img-fluid mt-2"
                  />
                )}
                {product.image05 && (
                  <img
                    src={product.image05}
                    alt={`${product.title} - Image05`}
                    className="img-fluid mt-2"
                  />
                )}
                {product.video && (
                  <video controls width="100%" className="mt-2">
                    <source src={product.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                <div className="product-info">
                  <h6>SKU: <span style={{ fontSize: "13px" }}>{product.id}</span></h6>
                  <h5>{product.title}</h5>

                  {/* Toggle Buttons for Each Product */}
                  <div className="my-3">
                    <button
                      className={`btn ${product.priceType === "14KT" ? "btn-primary" : "btn-outline-primary"} mx-2`}
                      onClick={() => togglePriceType(index, "14KT")}
                    >
                      14KT
                    </button>
                    <button
                      className={`btn ${product.priceType === "18KT" ? "btn-primary" : "btn-outline-primary"} mx-2`}
                      onClick={() => togglePriceType(index, "18KT")}
                    >
                      18KT
                    </button>
                  </div>
                  <p><strong>Purity:</strong> {product.priceType}</p>
                  <p><strong>Category:</strong> {product.category}</p>
                  <p><strong>Subcategory:</strong> {product.subCategory}</p>
                  <p><strong>Material:</strong> {product.material}</p>
                  <p><strong>Gift:</strong> {product.gift}</p>
                  <p><strong>Gender:</strong> {product.gender}</p>
                  <p><strong>Gross Weight:</strong> {product.grossWt}</p>
                  <p>
                    <strong>Net Weight: </strong>
                    {product.priceType === "14KT" ? product.netWeight14KT : product.netWeight18KT}
                  </p>
                  <p className="price">
                    <strong>Gold Price:</strong>{" "}
                    {formatCurrency(product.priceType === "14KT" ? product.price14KT : product.price18KT)}
                  </p>
                  <p><strong>Diamond Price: </strong>{formatCurrency(product.diamondprice)}</p>
                  <p>
                    <strong>Making Charges: </strong>
                    {formatCurrency(product.priceType === "14KT" ? product.makingCharge14KT : product.makingCharge18KT)}
                  </p>
                  <p>
                    <strong>GST: </strong>
                    {formatCurrency(product.priceType === "14KT" ? product.gst14KT : product.gst18KT)}
                  </p>
                  <p>
                    <strong>Total Price: </strong>
                    {formatCurrency(product.priceType === "14KT" ? product.total14KT : product.total18KT)}
                  </p>
                  <button className="btn btn-danger mt-2" onClick={() => handleDelete(index)}>
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Adashbord;
