import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GameDetail from '../Components/GameDetail'; // Adjust path as needed
import { GameRepository } from '../repositories/OrigamesRepository'; // Adjust path as needed
import { Game,ErrorType } from '../Interfaces';




const gameRepository = new GameRepository();

const GamePage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Ensure id is of type string
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const gameData = await gameRepository.getById(id as string); // Ensure id is cast to string
        setGame(gameData);
      } catch (err) {
        if (err instanceof Error) {
          setError({ message: err.message });
        } else {
          setError({ message: 'An unknown error occurred' });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!game) return <p>No game data available.</p>; // Add a fallback if game is still null

  return <GameDetail game={game} />;
};

export default GamePage;
