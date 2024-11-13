import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getDatabase, ref, onValue, set, remove } from "firebase/database";

const EntryList = () => {
  const [entries, setEntries] = useState([]);
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({});
  const [entryKeys, setEntryKeys] = useState([]); // To store entry keys
  const navigate = useNavigate();
  const db = getDatabase(); // Initialize Firebase Realtime Database

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("loggedInAdmin");
    if (!isAdminLoggedIn) {
      navigate("/"); // Redirect to Admin Panel if not logged in
      return;
    }

    // Fetch entries from Firebase
    const entriesRef = ref(db, "entries");
    onValue(entriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const entriesArray = Object.entries(data); // Get entries as an array of [key, value] pairs
        // eslint-disable-next-line no-unused-vars
        setEntries(entriesArray.map(([key, value]) => value)); // Extract values
        setEntryKeys(entriesArray.map(([key]) => key)); // Extract keys
      } else {
        setEntries([]);
        setEntryKeys([]);
      }
    });
  }, [navigate, db]);

  // Format date to "day month year"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  // Handle entry deletion
  const handleDelete = (index) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (confirmed) {
      const entryKey = entryKeys[index];
      remove(ref(db, `entries/${entryKey}`))
        .then(() => {
          toast("Entry deleted successfully");
        })
        .catch((error) => {
          toast.error("Error deleting entry: " + error.message);
        });
    }
  };

  // Handle entry editing
  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(entries[index]);
  };

  // Handle save after editing
  const handleSave = () => {
    const entryKey = entryKeys[editingIndex];
    set(ref(db, `entries/${entryKey}`), formData)
      .then(() => {
        toast.success("Entry updated successfully");
        setEditingIndex(null);
        setFormData({});
      })
      .catch((error) => {
        toast.error("Error updating entry: " + error.message);
      });
  };

  // Handle form data change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Filter entries based on search input
  const filteredEntries = entries.filter(
    (entry) =>
      entry.gypsyOwner.toLowerCase().includes(search.toLowerCase()) ||
      entry.gypsyBy.toLowerCase().includes(search.toLowerCase()) ||
      entry.gypsyNumber.toLowerCase().includes(search.toLowerCase()) ||
      entry.checkInDate.toLowerCase().includes(search.toLowerCase()) ||
      entry.guestName.toLowerCase().includes(search.toLowerCase())
  );

  // Handle logout and navigate to login page
  const handleLogout = () => {
    localStorage.removeItem("loggedInAdmin");
    navigate("/");
    toast("You are Logged Out");
  };

  // Navigate back to the dashboard
  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-center">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold select-none text-gray-800">
          Entry List
        </h1>
        <div className="space-y-2 sm:space-y-0">
          <button
            onClick={handleBackToDashboard}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition mr-2"
          >
            Back to Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
      <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search by Guest Name, Gypsy Owner, Agent Name or Gypsy Number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-md border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-center">
              {[
                "Safari Date",
                "Guest Name",
                "Guest Number",
                "Pickup Point",
                "Safari Zone",
                "Slot",
                "Gypsy Number",
                "Gypsy Owner",
                "Driver Name",
                "Agent Name",
                "Gypsy Payment",
                "Advance Payment",
                "Blance Payment",
                "Total Collection",
                "Expense",
                "Petrol",
                "Paid Money",
                "Paid Date",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="font-semibold text-gray-700 text-sm whitespace-normal"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry, index) =>
              editingIndex === index ? (
                <tr key={index} className="bg-gray-50">
                  {[
                    "checkInDate",
                    "guestName",
                    "guestNumber",
                    "place",
                    "zone",
                    "day",
                    "gypsyNumber",
                    "gypsyOwner",
                    "driverName",
                    "gypsyBy",
                    "gypsyPayment",
                    "advancePayment",
                    "blancePayment",
                    "collection",
                    "expense",
                    "petrol",
                    "paidMoney",
                    "paidDate",
                  ].map((field) => (
                    <td key={field} className="border px-2 py-2">
                      {field === "zone" ? (
                        <select
                          className="w-fit p-1 border border-gray-300 rounded-lg text-sm"
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                        >
                          <option value="Bijrani">Bijrani</option>
                          <option value="Dhela">Dhela</option>
                          <option value="Jhirna">Jhirna</option>
                          <option value="Durga Devi">Durga Devi</option>
                          <option value="Garjia">Garjia</option>
                          <option value="Phato">Phato</option>
                          <option value="Mohaan">Mohaan</option>
                          <option value="Hathi Dager">Hathi Dager</option>
                          <option value="Sitabani">Sitabani</option>
                          <option value="Bhandarpani">Bhandarpani</option>
                          <option value="Kyari">Kyari</option>
                        </select>
                      ) : field === "day" ? (
                        <select
                          className="w-fit p-1 border border-gray-300 rounded-lg text-sm"
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                        >
                          <option value="Morning">Morning</option>
                          <option value="Afternoon">Afternoon</option>
                        </select>
                      ) : (
                        <input
                          type={field.includes("Date") ? "date" : "text"}
                          className="w-fit p-1 border border-gray-300 rounded-lg text-sm"
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                        />
                      )}
                    </td>
                  ))}
                  <td className="border px-2 py-2 flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="px-3 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition text-sm"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={index} className="hover:bg-gray-100">
                  {[
                    "checkInDate",
                    "guestName",
                    "guestNumber",
                    "place",
                    "zone",
                    "day",
                    "gypsyNumber",
                    "gypsyOwner",
                    "driverName",
                    "gypsyBy",
                    "gypsyPayment",
                    "advancePayment",
                    "blancePayment",
                    "collection",
                    "expense",
                    "petrol",
                    "paidMoney",
                    "paidDate",
                  ].map((field) => (
                    <td
                      key={field}
                      className="border capitalize px-2 py-4 text-sm"
                    >
                      {field.includes("Date")
                        ? formatDate(entry[field])
                        : entry[field]}
                    </td>
                  ))}
                  <td className="border px-2 py-2 flex flex-col gap-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="px-3 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-3 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EntryList;
