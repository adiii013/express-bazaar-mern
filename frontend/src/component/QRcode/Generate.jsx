import React, { useState , useEffect } from "react";
import QRCode from "react-qr-code";
import { useDispatch } from "react-redux";

const Generate = ({ history, match }) => {
    const dispatch = useDispatch();
    const [productId,setProductId] = useState("");
    //const productId = product.productId;
    useEffect(() => {
        
          const productIdTemp = match.params.id;
          setProductId(productIdTemp)
          
    }, [
        dispatch,
      ]);
  return (
    <div
      style={{
        margin: "0 auto",
        width: "80%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3 style={{ marginBottom: "3rem" }}>
        Use this QR Code for the product verification
      </h3>
      {
        (productId!=null) ? <QRCode value={productId} /> : <p></p>
      }
      
      <h5 style={{ marginTop: "2.5rem", color: "#6c757d" }}>Scan the QR code</h5>
      <p style={{ marginTop: "0.3rem" }}></p>
    </div>
  );
};

export default Generate;
