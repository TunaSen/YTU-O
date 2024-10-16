import './MainPage.css';
import { SideBar } from '../Components/SideBar';

function MainPage() {


  return (
    <>
    <div className="container-fluid d-flex justify-content-center ">
      <h1 className="text-primary pt-4 display-1 handwritten-title">YTÜ - O</h1>
    </div>
    <SideBar></SideBar>
    </>
  );
}

export default MainPage;
