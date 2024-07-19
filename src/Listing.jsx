import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  orderBy,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Navbar from "./Navbar";
import { storage } from "./firebaseConfig";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import FileSaver from "file-saver";
import EmailSignature from "./email_signature";


const styles = `
  table {
    width: 90%;
    border-collapse: collapse;
    margin: 20px auto;
    font-family: Arial, sans-serif;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  }

  table thead {
    background-color: #BF1E2E;
    color: #ffffff;
  }

  table th,
  table td {
    text-align: left;
    padding: 12px 15px;
  }

  table tbody tr:nth-child(even) {
    background-color: #f2f2f2;
    color: darkslategray;
  }

  table tbody tr:hover {
    background-color: #bbb;
    cursor: default;
  }

  /* Responsive table */
  @media screen and (max-width: 600px) {
    table thead {
      display: none;
    }

    table,
    table tbody,
    table tr,
    table td {
      display: block;
      width: 100%;
    }

    table tr {
      margin-bottom: 15px;
    }

    table td {
      text-align: right;
      padding-left: 50%;
      position: relative;
    }

    table td::before {
      content: attr(data-label);
      position: absolute;
      left: 0;
      width: 50%;
      padding-left: 15px;
      font-weight: bold;
      text-align: left;
    }
  }
`;

function ListingPage() {
  const [signatures, setSignatures] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [isNew, setIsNew] = useState(false);

  const db = getFirestore();

  const fetchList = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "emailSignatures"), orderBy("updated_at", "desc"))
    );
    const fetchedList = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setSignatures(fetchedList);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleCreateNew = () => {
    setEditMode(true);
    setIsNew(true);
    setEditData({});
  };

  const handleOnAllPostersClick = () => {
    setEditMode(false);
    setIsNew(false);
    fetchList();
  };


  const handleDeleteClick = async (post) => {
    if (window.confirm("Are you sure you want to delete this poster?")) {
      try {
        await deleteDoc(doc(db, "emailSignatures", post.id));
        const imageRef = storage.refFromURL(post.image);
        await imageRef.delete();
        toast.success("Poster deleted successfully");
        fetchList();
      } catch (error) {
        console.error("Error deleting poster: ", error);
        toast.error("Failed to delete poster.");
      }
    }
  };


  const exportImage = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const localUrl = URL.createObjectURL(blob);
      FileSaver.saveAs(localUrl, "email-signature.png");
      URL.revokeObjectURL(localUrl);
    } catch (error) {
      console.error("Error exporting image: ", error);
      toast.error("Failed to export image.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <Navbar
        onCreateClick={handleCreateNew}
        onAllPostersClick={handleOnAllPostersClick}
      />
      {editMode ? (
        <div style={{ maxWidth: "1200px", margin: "auto" }}>
          <EmailSignature isNew={isNew} data={editData} />
        </div>
      ) : (
        <div>
          <style>{styles}</style>
          <ToastContainer />
          <br /><br />
          <table>
            <thead>
              <tr>
                <th>SNo</th>
                <th>Name</th>
                <th>Job Title</th>
                <th>Updated By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {signatures.map((post, index) => (
                <tr key={post.id}>
                  <td data-label="SNo">{index + 1}</td>
                  <td data-label="Poster Name">{post.name}</td>
                  <td data-label="Job Title">{post.jobTitle}</td>
                  <td data-label="Updated By">{post.updated_by}</td>
                  <td data-label="Actions">
                    <div style={{ display: "flex" }}>
                      <button onClick={() => exportImage(post.poster)}
                        style={{
                          backgroundColor: "#BF1E2E",
                          padding: "10px", borderRadius: "5px",
                          fontSize: "15px", fontWeight: "bold",
                          color: "white", cursor: "pointer"
                        }}>
                        Export
                      </button>
                      <div style={{ width: "5px" }} />
                      <div style={{ width: "5px" }} />
                      <button onClick={() => handleDeleteClick(post)}
                        style={{
                          backgroundColor: "#BF1E2E",
                          padding: "10px", borderRadius: "5px",
                          fontSize: "15px", fontWeight: "bold",
                          color: "white", cursor: "pointer"
                        }}>
                        Delete
                      </button> 
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ListingPage;
