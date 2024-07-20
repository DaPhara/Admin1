import React, { useEffect, useState } from "react";
import { Sport_Club_BASE_URL } from "../../lib/constant";
import DataTable from "react-data-table-component";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function SportClub() {
  const [clubs, setClubs] = useState([]);
  const [clubDetails, setClubDetails] = useState({});
  const [showClubModal, setShowClubModal] = useState(false); // Club details modal
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Delete confirmation modal
  const [clubToDelete, setClubToDelete] = useState(null); // Club to delete

  const [nextPage, setNextPage] = useState(
    `${Sport_Club_BASE_URL}sportclubs/all/`
  );
  useEffect(() => {
    const fetchClubs = async () => {
      let allClubs = [];
      let nextUrl = nextPage;

      while (nextUrl) {
        const response = await fetch(nextUrl);
        const data = await response.json();
        allClubs = [...allClubs, ...data.results];
        nextUrl = data.next;
        console.log("all data of clubs", data.results);
      }
      setClubs(allClubs);
    };

    fetchClubs();
  }, [nextPage]);

  // Handle view club details
  const handleClubDetails = (club) => {
    setClubDetails(club);
    setShowClubModal(true); // Show club details modal
  };

  // Handle delete club
  const handleDeleteClub = (id) => {
    setClubToDelete(id); // Set the club to delete
    setShowDeleteModal(true); // Show delete confirm modal
  };

  // Confirm delete club
  const confirmDeleteClub = () => {
    const newClubs = clubs.filter((club) => club.id !== clubToDelete);
    setClubs(newClubs);
    setShowDeleteModal(false); // Close delete confirm modal
  };

  // Table columns
  const columns = [
    {
      name: "Club Name",
      selector: (row) => row.sport_name,
    },
    {
      name: "Sport Category",
      selector: (row) => row.sport_category_name,
    },
    {
      name: "Image",
      selector: (row) => (
        <div>
          <img
            src={row.image}
            alt={row.name}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </div>
      ),
    },
    {
      name: "Seat Number",
      selector: (row) => row.seat_number,
      sortable: true,
    },

    {
      name: "Price (USD)",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleClubDetails(row)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          >
            View
          </button>
          <button
            onClick={() => handleDeleteClub(row.id)}
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
    <section className="mt-14 xl:ml-64 p-0 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">All Sport Clubs</h1>
        <DataTable
          className="no-scrollbar"
          columns={columns}
          data={clubs}
          fixedHeader
          pagination
          pointerOnHover
          highlightOnHover
          customStyles={customStyles} 
        />
      </div>

      {/* Club details modal */}
      <Modal show={showClubModal} onClose={() => setShowClubModal(false)}>
        <Modal.Header>Club Details</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <img
                className="w-40 h-40 object-cover rounded-lg"
                src={
                  clubDetails?.image ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s"
                }
                alt="no images"
              />
            </div>
            <h2>{clubDetails?.sport_name || "Unknown"}</h2>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {clubDetails?.description}
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
              Are you sure you want to delete this club?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={confirmDeleteClub}>
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
