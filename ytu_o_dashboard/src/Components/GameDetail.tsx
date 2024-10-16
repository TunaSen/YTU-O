import 'bootstrap/dist/css/bootstrap.min.css';
import './GameDetail.css'; // Import custom CSS for additional styling
import {Game , Runner} from '../Interfaces'
import { GameRepository } from '../repositories/OrigamesRepository';
import { validateToken } from '../repositories/AuthService';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const GameDetail = ({ game }: { game: Game }) => {
  const navigate = useNavigate();
  const [team, setSelectedRunners] = useState<Runner[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const gameRepository = new GameRepository();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Token doğrulaması yap
        const isValidToken = await validateToken();
        console.log(isValidToken)
        if (!isValidToken) {
          navigate('/signin/'); // Geçersiz token ile yönlendirme
          return;
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [navigate]);

  const handleCheckboxChange = (runner: Runner, isChecked: boolean) => {
    if (isChecked) {
      setSelectedRunners([...team, runner]);
    } else {
      setSelectedRunners(team.filter(item => item.id !== runner.id));
    }
  };

  const totalCost = team.reduce((total, runner) => total + runner.cost, 0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Perform your submit logic here
    if (totalCost <= 40) {
      console.log({
        name,
        email,
        team,
        totalCost
      });
      // Reset form
      gameRepository.submitGame(game.id, {
        name: name,
        email: email,
        team: team,
      });

      alert("Başarıyla Gönderildi");
    } else {
      alert("Para yetmedi");
    }
  };

  // Separate runners based on gender
  const maleRunners = game.runners.filter(runner => runner.gender === 'male');
  const femaleRunners = game.runners.filter(runner => runner.gender === 'female');

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <h1 className="display-4">{game.name}</h1>
          <p className="lead">{game.description}</p>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6">
          <h4>Game Details</h4>
          <ul className="list-group">
            <li className="list-group-item"><strong>ID:</strong> {game.id}</li>
            <li className="list-group-item"><strong>Date:</strong> {new Date(game.date).toLocaleDateString()}</li>
            <li className="list-group-item"><strong>Creator:</strong> {game.creator}</li>
            <li className="list-group-item"><strong>Max Coin:</strong> {game.max_coin}</li>
          </ul>
        </div>
      </div>

      {game.runners && game.runners.length > 0 && (
        <div className="row mt-3">
          <div className="col-md-6">
            <h4>Male Runners</h4>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {maleRunners.map((runner, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        onChange={(e) => handleCheckboxChange(runner, e.target.checked)}
                      />
                    </td>
                    <td>{runner.id}</td>
                    <td>{runner.name}</td>
                    <td>{runner.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="col-md-6">
            <h4>Female Runners</h4>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {femaleRunners.map((runner, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        onChange={(e) => handleCheckboxChange(runner, e.target.checked)}
                      />
                    </td>
                    <td>{runner.id}</td>
                    <td>{runner.name}</td>
                    <td>{runner.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <div className="row mt-3">
        <div className="col-md-6">
          <h4>Total Cost of Selected Runners</h4>
          <p>{totalCost}</p>
        </div>
        
        <div className="col-md-6">
          <h4>Contact Information</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
      
      <div className="row mt-3">
        <div className="col-md-12">
          <h4>Activity</h4>
          <p>{game.activity ? game.activity : 'No activity assigned'}</p>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
