import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Athlete.css'; // Import custom CSS for additional styling



// Define the AthleteProps interface
interface ProfileProps {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  club: string;
  profile_picture: string;
}

// Define the Athlete component with typed props
const Athlete: React.FC<ProfileProps> = ({ id, email, first_name,last_name,club, profile_picture }) => {
  // Add a fallback if user is not provided
  if (!id) {
    return <div>Error: User data is not available.</div>;
  }

  return (
    <div className="col-md-3 mb-4">
      <div className="card athlete-card">
        <img src={profile_picture} className="card-img-top" alt={`${id}`} />
        <div className="card-body" id={id}>
          <p className="card-text"><strong>Name:</strong> {first_name} {last_name}</p>
          <p className="card-text"><strong>Email:</strong> {email}</p>
          <p className="card-text"><strong>Club:</strong> {club}</p>
        </div>
      </div>
    </div>
  );
}

export default Athlete;
