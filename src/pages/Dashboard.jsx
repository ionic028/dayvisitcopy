import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { database } from '../firebase'; // Adjust the path as needed
import { ref, set, push } from 'firebase/database'; // Import functions from Firebase
const Dashboard = () => {
    const navigate = useNavigate();
    // const [entries, setEntries] = useState([]);
    const [checkInDate, setCheckInDate] = useState('');
    const [guestName, setGuestName] = useState('');
    const [guestNumber, setGuestNumber] = useState('');
    const [place, setPlace] = useState('');
    const [zone, setZone] = useState('Bijrani');
    const [day, setDay] = useState('Morning');
    const [gypsyNumber, setGypsyNumber] = useState('');
    const [gypsyOwner, setGypsyOwner] = useState('');
    const [driverName, setDriverName] = useState('');
    const [gypsyBy, setGypsyBy] = useState('');
    const [gypsyPayment, setGypsyPayment] = useState('');
    const [advancePayment, setAdvancePayment] = useState('');
    const [blancePayment, setBlancePayment] = useState('');
    const [collection, setCollection] = useState('');
    const [expense, setExpense] = useState('');
    const [petrol, setPetrol] = useState('');
    const [paidMoney, setPaidMoney] = useState('');
    const [paidDate, setPaidDate] = useState('');


    useEffect(() => {
        const isAdminLoggedIn = localStorage.getItem('loggedInAdmin');
        if (!isAdminLoggedIn) {
            navigate('/'); // Redirect to Admin Panel if not logged in
            return;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const newEntry = {
            checkInDate: formatDate(checkInDate),
            guestName,
            guestNumber,
            place,
            zone,
            day,
            gypsyNumber,
            gypsyOwner,
            driverName,
            gypsyBy,
            gypsyPayment,
            advancePayment,
            blancePayment,
            collection,
            expense,
            petrol,
            paidMoney,
            paidDate: formatDate(paidDate),
        };
    
        try {
            // Create a new entry in the 'entries' path
            const newEntryRef = push(ref(database, 'entries'));
            await set(newEntryRef, newEntry);
            resetForm();
            toast.success("Entry Created Successfully");
            navigate('/entries'); // Redirect to EntryList page
        } catch (error) {
            toast.error("Error saving entry: " + error.message);
        }
    };

    const resetForm = () => {
        setCheckInDate('');
        setGuestName('');
        setGuestNumber('');
        setPlace('');
        setZone('Bijrani');
        setDay('Morning');
        setGypsyNumber('');
        setGypsyOwner('');
        setDriverName('');
        setGypsyBy('');
        setGypsyPayment('');
        setAdvancePayment('');
        setBlancePayment('');
        setCollection('');
        setExpense('');
        setPetrol('');
        setPaidMoney('');
        setPaidDate('');
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInAdmin');
        navigate('/');
        toast("You are Logged Out ");
    };

    const handleEntries = () => {
        navigate('/entries');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
        <div className="container mx-auto max-w-4xl">
            <div className="flex justify-between items-center mb-6">
            <h1 className="sm:text-3xl text-2xl font-semibold select-none text-gray-800 ">Corbett Tiger Roar Day Visit Dashboard</h1>
                <div className="space-x-4 sm:space-y-0 space-y-2">
                    <button 
                        onClick={handleEntries} 
                        className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
                    >
                       All Entries  
                    </button>
                    <button 
                        onClick={handleLogout} 
                        className="px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Existing fields */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Safari Date</label>
                        <input 
                            type="date" 
                            className="w-full p-3 border border-gray-300 rounded-md mt-1"
                            value={checkInDate}
                            onChange={e => setCheckInDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Guest Name</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border capitalize  border-gray-300 rounded-md mt-1"
                            placeholder="Enter Guest Name"
                            value={guestName}
                            onChange={e => setGuestName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Guest Number</label>
                        <input 
                            type="number" 
                            className="w-full p-3 border border-gray-300 rounded-md mt-1"
                            placeholder="Enter Guest Number"
                            value={guestNumber}
                            onChange={e => setGuestNumber(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Pickup Point</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border capitalize border-gray-300 rounded-md mt-1"
                            placeholder="Enter Place"
                            value={place}
                            onChange={e => setPlace(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Safari Zone</label>
                        <select 
                            className="w-full p-3 border border-gray-300 rounded-md mt-1"
                            value={zone}
                            onChange={e => setZone(e.target.value)}
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
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Slot</label>
                        <select 
                            className="w-full p-3 border border-gray-300 rounded-md mt-1"
                            value={day}
                            onChange={e => setDay(e.target.value)}
                        >
                            <option value="Morning">Morning</option>
                            <option value="Afternoon">Afternoon</option>
                            
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium  text-gray-700">Gypsy Number</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border capitalize border-gray-300 rounded-md mt-1"
                            placeholder="Enter Gypsy Number"
                            value={gypsyNumber}
                            onChange={e => setGypsyNumber(e.target.value)}
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gypsy Owner</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border capitalize  border-gray-300 rounded-md mt-1"
                            placeholder="Enter Gypsy Owner"
                            value={gypsyOwner}
                            onChange={e => setGypsyOwner(e.target.value)}
                        />
                    </div>
                   
                   
                    
                    
                    
                    
                    <div>
                        <label className="block text-sm font-medium capitalize text-gray-700">Driver Name</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border capitalize border-gray-300 rounded-md mt-1"
                            placeholder="Enter Driver Name"
                            value={driverName}
                            onChange={e => setDriverName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm capitalize font-medium text-gray-700">Agent Name</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border capitalize border-gray-300 rounded-md mt-1"
                            placeholder="Enter Gypsy By"
                            value={gypsyBy}
                            onChange={e => setGypsyBy(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gypsy Payment</label>
                        <input 
                            type="number"
                            className="w-full p-3 border border-gray-300 rounded-md mt-1"
                            placeholder="Enter Gypsy Payment"
                            value={gypsyPayment}
                            onChange={e => setGypsyPayment(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Advance Payment</label>
                        <input 
                            type="number"
                            className="w-full p-3 border border-gray-300 rounded-md mt-1"
                            placeholder="Enter Gypsy Payment"
                            value={advancePayment}
                            onChange={e => setAdvancePayment(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Balance Payment</label>
                        <input 
                            type="number"
                            className="w-full p-3 border border-gray-300 rounded-md mt-1"
                            placeholder="Enter Gypsy Payment"
                            value={blancePayment}
                            onChange={e => setBlancePayment(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Total Collection</label>
                        <input 
                            type="number"
                            className="w-full p-3 border border-gray-300 rounded-md mt-1"
                            placeholder="Enter Collection"
                            value={collection}
                            onChange={e => setCollection(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Expense</label>
                        <input 
                            type="number"
                            className="w-full p-3 border border-gray-300 rounded-md mt-1"
                            placeholder="Enter Expense"
                            value={expense}
                            onChange={e => setExpense(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Petrol</label>
                        <input 
                            type="number" 
                            className="w-full p-3 border border-gray-300 rounded-md mt-1"
                            placeholder="Enter Petrol"
                            value={petrol}
                            onChange={e => setPetrol(e.target.value)}
                        />
                    </div>

                    {/* New fields */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Paid Money</label>
                        <input 
                            type="number" 
                            className="w-full p-3 border border-gray-300 rounded-md mt-1"
                            placeholder="Enter Paid Money"
                            value={paidMoney}
                            onChange={e => setPaidMoney(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Paid Date</label>
                        <input 
                            type="date" 
                            className="w-full p-3 border border-gray-300 rounded-md mt-1"
                            value={paidDate}
                            onChange={e => setPaidDate(e.target.value)}
                        />
                    </div>
                </div>
                <button 
                    type="submit" 
                    className="w-full py-3 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    </div>  
    );
};

export default Dashboard;
