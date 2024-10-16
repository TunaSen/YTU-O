import 'bootstrap/dist/css/bootstrap.min.css';
import Athlete from '../Components/Athlete';
import { SideBar } from '../Components/SideBar';
import { getAll } from '../repositories/ProfileRepository';
import { validateToken } from '../repositories/AuthService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import {ProfileProps}  from '../Interfaces'
// Adjusted interfaces for type safety


function AthleteList() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<ProfileProps[]>([]); // Added type for profiles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Token validation
        const isValidToken = await validateToken();
        if (!isValidToken) {
          navigate('/signin'); // Redirect if token is invalid
          return;
        }
        
        // Fetch profiles if token is valid
        const data = await getAll();
        setProfiles(data);
      } catch (err) {
        setError('Bir hata oluştu.');
        console.error(err);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="container-fluid d-flex justify-content-center">
        <h1 className="text-primary pt-4 display-1 handwritten-title">SPORCULARIMIZ</h1>
      </div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          {profiles.map((p) => (
            <Athlete
              key={p.id} // React key attribute
              id={p.id}
              username={p.user.username}
              email={p.user.email}
              first_name={p.user.first_name}
              last_name={p.user.last_name}
              club={p.club}
              profile_picture={p.profile_picture}
            />
          ))}
        </div>
      </div>
      <SideBar />
    </>
  );
}

export default AthleteList;
