import { SideBar } from '../Components/SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {update } from "../repositories/AuthService";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfile } from '../Interfaces';



function Settings() {

    const [userProfile, setUserProfile] = useState<UserProfile>({
        first_name: '',
        last_name: '',
        email: '',
        bio: '',
        location: '',
        birthday: '',
        club: '',
        role: '',
        profileImage: 'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon', // Default placeholder image
    });
    const navigate = useNavigate();

    const approveAction = async () => {
        try {
            const success = await update(userProfile); // Await the update function
            if (success) {
                // Show popup or feedback for success
                alert('Profile updated successfully!');
            } else {
                // Show popup or feedback for failure
                alert('Failed to update profile.');
            }
        } catch{
            alert('Failed to update profile.');
            
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedUser = localStorage.getItem("profile");
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setUserProfile({
                        first_name: parsedUser.user?.first_name || '',
                        last_name: parsedUser.user?.last_name || '',
                        email: parsedUser.user?.email || '',
                        bio: parsedUser.bio || '',
                        location: parsedUser.location || '',
                        birthday: parsedUser.birth_date || '',
                        club: parsedUser.club || '',
                        role: parsedUser.role || '',
                        profileImage: parsedUser.profile_picture || 'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon',
                    });
                } else {
                    navigate("/signin");
                }
            } catch (err) {
                console.error(err);
                navigate("/signin");
            }
        };

        fetchData();
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUserProfile((prevProfile) => ({
                    ...prevProfile,
                    profileImage: event.target?.result as string,
                }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-2">
                    <SideBar />
                </div>

                {/* Main content */}
                <div className="col-md-9">
                    <div className="container mt-4">
                        <h1 className="display-4">Settings</h1>
                        <div className="card mt-4">
                            <div className="card-body">
                                <div className="row">
                                    {/* Profile Image */}
                                    <div className="col-md-3 d-flex justify-content-center align-items-center position-relative">
                                        <img
                                            src={`http://127.0.0.1:8000${userProfile.profileImage}`}  // Use template literal for string concatenation
                                            alt="Profile"
                                            className="img-fluid rounded-circle mb-3"
                                            style={{ maxWidth: '150px', cursor: 'pointer' }}
                                            onClick={() => document.getElementById('imageInput')?.click()}
                                        />
                                        <input
                                            type="file"
                                            id="imageInput"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            style={{ display: 'none' }} // Hide the input
                                        />
                                    </div>

                                    {/* User Info */}
                                    <div className="col-md-9">
                                        <div className="mb-3">
                                            <label className="form-label">First Name</label>
                                            <input
                                                type="text"
                                                name="first_name"
                                                className="form-control"
                                                value={userProfile.first_name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Last Name</label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                className="form-control"
                                                value={userProfile.last_name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                value={userProfile.email}
                                                onChange={handleChange}
                                                readOnly
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Bio</label>
                                            <textarea
                                                name="bio"
                                                className="form-control"
                                                value={userProfile.bio}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Location</label>
                                            <input
                                                type="text"
                                                name="location"
                                                className="form-control"
                                                value={userProfile.location}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Birthday</label>
                                            <input
                                                type="date"
                                                name="birthday"
                                                className="form-control"
                                                value={userProfile.birthday}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Club</label>
                                            <input
                                                type="text"
                                                name="club"
                                                className="form-control"
                                                value={userProfile.club}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Role</label>
                                            <input
                                                type="text"
                                                name="role"
                                                className="form-control"
                                                value={userProfile.role}
                                                readOnly // Role is not editable
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-4 d-flex justify-content-end">
                                    <button className="btn btn-danger me-2">Delete Profile</button>
                                    <button className="btn btn-primary" onClick={approveAction}>Approve Profile</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
