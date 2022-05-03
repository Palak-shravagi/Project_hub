import React from "react";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import navigate, { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
function Rightsection() {
  const navigate = useNavigate();
  return (
    <>
      <title>Glassmorphism login Form Tutorial in html css</title>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap"
        rel="stylesheet"
      />

      {}
      {/* <div className="gradient__bg">
        <div className="shape" />
        <div className="shape" />
      </div > */}
      <div
        style={{
          color: "#ffffff",
          border: "1px solid rgb(138,149,158)",
          borderRadius: "5px",
          paddingLeft: "0px",
          paddingRight: "0px",
        }}
      >
        <div
          style={{
            padding: "30px",
            backgroundColor: "rgb(23,26,34)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            // alignContent: "center",
          }}
          className="d-flex d-lg-block flex-items-center"
        >
          <div>
            <img
              src="https://picsum.photos/seed/picsum/200/300"
              alt="img"
              style={{
                height: "80px",
                width: "100px",
                borderRadius: "50%",
              }}
            />
          </div>
          <br />
          <div style={{}}>username</div>
          <br />
          <div>
            <button
              style={{ fontSize: "15px" }}
              onClick={() => navigate("/info")}
              className="btn btn-success btn-sm"
            >
              <i className="fa fa-plus" style={{ fontSize: "14px" }}></i> Add
              Project
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Rightsection;
