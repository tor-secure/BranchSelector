import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCurrentUserInfo } from "../services/userService";
import { LoadingPage } from "./LoadingPage";
import { deleteAccount } from "../services/authService";
import { useNavigate } from "react-router-dom";

const DeleteAccountPage = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const handleDelete = async () => {
        if (!isChecked) {
            toast.error("Please check the checkbox.");
            return;
        }

        const confirmation = confirm(`Are you sure you want to delete your account associated with ${userDetails.email}?`);
        if (confirmation) {
            if (userDetails.authProvider === 'local') {
                setShowModal(true);
            } else {
                const result = await deleteAccount();
                if (result.status === 'success') {
                    toast.success("Your account has been successfully deleted!");
                    navigate('/')
                } else {
                    console.log(result.message);
                }
            }
        }
    };

    const handleModalSubmit = async () => {
        const result = await deleteAccount(password);
        if (result.status === 'success') {
            toast.success("Your account has been successfully deleted!");
            navigate('/')
            setShowModal(false);
        } else {
            console.log(result.message);
        }
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            const userInfo = await getCurrentUserInfo();
            setUserDetails(userInfo);
        };
        fetchUserDetails();
    }, []);

    return (

        <>
            {userDetails ? (
                <div className="flex flex-col max-w-4xl mx-auto p-8 font-poppins text-left">
                    <h1 className="text-3xl font-bold text-red-600">Delete Account</h1>
                    <div className="mt-3">
                        <p>
                            <span className="font-bold">Username:</span> {userDetails.displayName}
                        </p>
                        <p>
                            <span className="font-bold">Email:</span> {userDetails.email}
                        </p>
                    </div>
                    <p className="font-bold mt-3">Deleting your account will remove all your personal data, test history, and test results. Please note that we will retain your transactional records for compliance purposes.</p>
                    <p className="font-bold text-red-600 mt-5">All your unused credits will also be deleted and no refund will be issued.</p>
                    <h2 className="text-xl font-bold mt-5">What Will Be Deleted:</h2>
                    <ul className="list-disc pl-7">
                        <li>Personal data</li>
                        <li>Test history</li>
                        <li>Test results</li>
                        <li>Unused Credits</li>
                    </ul>

                    <h2 className="text-xl font-bold mt-5">What Will Be Retained:</h2>
                    <ul className="list-disc pl-7">
                        <li>Transactional records</li>
                        <li>Appointment records</li>
                    </ul>

                    <p className="mt-5 text-red-600 font-bold">This action cannot be reversed! <br />If you are sure you want to delete your account, please click the button below.</p>
                    <div className="mt-5 flex border border-red-600 p-3 rounded-md">
                        <input
                            type='checkbox'
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                            className="min-h-[20px] min-w-[20px] justify-center items-center"
                            size={200}
                        />
                        <label className="ml-5 font-bold">
                            I understand that deleting is permanent and cannot be undone. I also understand that I will not receive any refund for my unused credits.
                        </label>
                    </div>
                    <button
                        onClick={handleDelete}
                        className="border p-3 bg-red-600 text-white font-bold mt-5 rounded-md">
                        Delete Account
                    </button>

                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay */}
                            <div className="relative bg-white p-10 rounded shadow-lg z-10">
                                <h2 className="text-md font-bold mb-4">Re-Enter Password</h2>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border p-2 w-full mb-4"
                                    placeholder="Password"
                                />
                                <div className="flex justify-end">
                                    <button
                                        onClick={handleModalSubmit}
                                        className="border p-3 bg-red-600 text-white font-bold rounded-md text-sm">
                                        Confirm Delete
                                    </button>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="border p-3 bg-gray-600 text-white font-bold rounded-md ml-3 text-sm">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            ) : (
                <LoadingPage />
            )}
        </>
    );
};

export { DeleteAccountPage };
