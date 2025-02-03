import React, { useContext, useEffect } from "react";
import "./verify.css";
import { StoreContext } from "../../context/StoreContext";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Verify = () => {
  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
