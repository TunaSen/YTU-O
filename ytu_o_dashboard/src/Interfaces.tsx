
export interface Runner {
    id: number;
    cost: number;
    name: string;
    gender: string;
  }
  


  export interface UserProfile {
    first_name: string;
    last_name: string;
    email: string;
    bio: string;
    location: string;
    birthday: string;
    club: string;
    role: string;
    profileImage: string;
}


export interface Player{
    name:string;
    email:string;
    team:Array<any>;
}

export interface UserProps {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface ProfileProps {
  id: string;
  user: UserProps;
  club: string;
  profile_picture: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  club: string;
  profile_picture_url: string;
}
// export interface GameProps {
//   id: string;
//   name: string;
//   date: string;
//   description: string;
//   creator: string;
//   status: boolean; 
//   action?: JSX.Element;
// }
export interface Game {
  id: number;
  name: string;
  description: string;
  date: string;
  creator: string;
  max_coin: number;
  runners: Runner[];
  activity?: string;
  status: boolean; 
  action?: JSX.Element;
}

export interface ErrorType {
  message: string;
}