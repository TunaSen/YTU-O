import { Game , Player } from '../Interfaces';


  export class GameRepository{
    private allGames = 'http://127.0.0.1:8000/origames/games/';


    async getAll(): Promise<Game[]> {
        const response = await fetch(this.allGames);
        console.log(response)
        return await response.json();
    }

    async getById(id: string): Promise<Game | null> {
        const response = await fetch(`${this.allGames}${id}`);
        if (response.ok) {
            return await response.json();
        }
        return null;
    }

    async create(Game: Game): Promise<void> {
        await fetch(this.allGames, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Game),
        });
    }

    async update(id: string, Game: Game): Promise<void> {
        await fetch(`${this.allGames}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Game),
        });
    }

    async delete(id: string): Promise<void> {
        await fetch(`${this.allGames}/${id}`, { method: 'DELETE' });
    }

    async submitGame(id: number,player:Player):Promise<void> {
        await fetch(`${this.allGames}submit/${id}/`, { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(player)});
    }

}
