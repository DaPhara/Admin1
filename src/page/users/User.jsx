import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../lib/constant";
import DataTable from "react-data-table-component";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function User() {
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [showUserModal, setShowUserModal] = useState(false); // User details modal
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Delete confirmation modal
  const [userToDelete, setUserToDelete] = useState(null); // User to delete

  useEffect(() => {
    fetch(`${BASE_URL}users/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched users:", data); // Log data for debugging
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Handle view user details
  const handleUserDetails = (user) => {
    setUserDetails(user);
    setShowUserModal(true); // Show user details modal
  };

  // Handle delete user
  const handleDeleteUser = (id) => {
    setUserToDelete(id); // Set the user to delete
    setShowDeleteModal(true); // Show delete confirm modal
  };

  // Confirm delete user
  const confirmDeleteUser = () => {
    const newUsers = users.filter((user) => user.id !== userToDelete);
    setUsers(newUsers);
    setShowDeleteModal(false); // Close delete confirm modal
  };

  // Table columns
  const columns = [
    {
      name: "User Name",
      selector: (row) => row.name,
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleUserDetails(row)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          >
            View
          </button>
          <button
            onClick={() => handleDeleteUser(row.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
          >
            Remove
          </button>
        </div>
      ),
    },
  ];

  // Custom styles for the table header
  const customStyles = {
    headCells: {
      style: {
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
  };

  return (
    <section className="mt-14 xl:ml-64 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">All Users</h1>
        <DataTable
          columns={columns}
          data={users}
          fixedHeader
          pagination
          pointerOnHover
          highlightOnHover
          customStyles={customStyles}
        />
      </div>

      {/* User details modal */}
      <Modal show={showUserModal} onClose={() => setShowUserModal(false)}>
        <Modal.Header>User Details</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <img
                className="w-40 h-40 object-cover rounded-lg"
                src={
                  userDetails?.avatar ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s"
                }
                alt="no images"
              />
            </div>
            <h2>{userDetails?.name || "Unknown"}</h2>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {userDetails?.email}
            </p>
          </div>
        </Modal.Body>
      </Modal>

      {/* Delete confirmation modal */}
      <Modal
        show={showDeleteModal}
        size="md"
        onClose={() => setShowDeleteModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={confirmDeleteUser}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setShowDeleteModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
}
