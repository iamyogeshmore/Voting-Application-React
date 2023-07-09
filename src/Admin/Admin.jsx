import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  let navigate = useNavigate();
  const [candidateData, setCandidateData] = useState([]);

  useEffect(() => {
    fetchAllCandidateVotes();
    console.log(localStorage.getItem("AdminID"));
  }, []);

  const logOutHandler = () => {
    axios
      .post(
        `http://localhost:8081/AdminPage/Logout?adminID=${localStorage.getItem(
          "AdminID"
        )}`
      )
      .then((res) => {
        toast.success(res.data.message);
        localStorage.clear();
        setTimeout(() => {
          navigate("/AdminLogin");
        }, 2000);
      })
      .catch((error) => {
        toast.error(error.response.data);
        console.log(error);
      });
  };

  const fetchAllCandidateVotes = () => {
    axios
      .get(
        `http://localhost:8081/AdminPage/Show_All_Candidates?adminId=${localStorage.getItem(
          "AdminID"
        )}`
      )
      .then((res) => {
        console.log(res.data.obj);
        setCandidateData(res.data.obj);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <table>
          <tr>
            <th>CANDIDATE ID</th>
            <th>CANDIDATE NAME</th>
            <th>TOTAL VOTES</th>
          </tr>
          {candidateData.length > 0
            ? candidateData.map((candidateAllVotes) => {
                return (
                  <tr key={candidateAllVotes.candidateId}>
                    <td>{candidateAllVotes.candidateId}</td>
                    <td>{candidateAllVotes.candidateName}</td>
                    <td>{candidateAllVotes.votingCount}</td>
                  </tr>
                );
              })
            : "No record Found"}
        </table>
      </div>
      <button onClick={logOutHandler} className="Button">
        Logout
      </button>
    </div>
  );
};

export default Admin;
