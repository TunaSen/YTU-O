import { Container, Content, ClosedSideBar, OpenSideBar } from "./styles";
import { MdSettings } from "react-icons/md";
import { IoNotificationsSharp } from "react-icons/io5";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { MdEventNote } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { AiOutlineLogin } from "react-icons/ai";
import { validateToken } from "../repositories/AuthService";
import { FaRunning, FaGamepad } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logoImg from "../../assets/images/ytu.jpg";
import userImg from "../../assets/images/ytu.jpg";
import  { useEffect, useState } from "react";
import { ProfileProps } from "../Interfaces";
export function SideBar() {
  const [sideBar, setSideBar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<ProfileProps| null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Token doğrulaması yap
        const isValidToken = await validateToken();
        setIsLoggedIn(isValidToken);
        const storedProfile = localStorage.getItem("profile");
        if (storedProfile) {
          setProfile(JSON.parse(storedProfile)); // Veriyi state'e kaydet
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  function handleChangeSideBar() {
    setSideBar((prevState) => !prevState);
  }

  function handleLogout() {
    // Show confirmation dialog
    const confirmLogout = window.confirm("Çıkış yapmak istediğinizden emin misiniz?");
    if (confirmLogout) {
      // Remove token from local storage
      localStorage.clear(); // Clears all localStorage data
      setIsLoggedIn(false); // Update the state to reflect the logged-out status
      setProfile(null); // Clear the user state
      navigate("/signin"); // Redirect to sign-in page or another appropriate page
    }
  }

  return (
    <Container>
      <Content>
        {!sideBar ? (
          <ClosedSideBar>
            <nav>
              <button onClick={handleChangeSideBar}>
                <BsArrowRight />
              </button>
              <img
                src={userImg}
                alt="Profile"
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
              />
              <ul>
                <li>
                  <a href="/athletes" title="Sporcular">
                    <FaRunning />
                  </a>
                </li>
                <li>
                  <a href="/events" title="Etkinlikler">
                    <MdEventNote />
                  </a>
                </li>
                <li>
                  <a href="/origames" title="Origames">
                    <FaGamepad />
                  </a>
                </li>
              </ul>
            </nav>
            <div>
              <ul>
                <li>
                  <a href="/notifications" title="Bildirimler">
                    <IoNotificationsSharp />
                  </a>
                </li>
                <li>
                  <a href="/settings" title="Ayarlar">
                    <MdSettings />
                  </a>
                </li>
                <li>
                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      title="Çıkış Yap"
                      style={{ background: "none", border: "none", cursor: "pointer" }}
                    >
                      <RiLogoutCircleRLine />
                    </button>
                  ) : (
                    <a href="/signin" title="Giriş Yap">
                      <AiOutlineLogin />
                    </a>
                  )}
                </li>
              </ul>
              {/* <span>
                {isLoggedIn && user ? (
                  <img src={'http://127.0.0.1:8000'+user.profile_picture || userImg} alt="Profile" />
                ) : (
                  <img src={userImg} alt="Profile" />
                )}
              </span> */}
            </div>
          </ClosedSideBar>
        ) : (
          <OpenSideBar>
            <section>
              <nav>
                <span>
                  <button onClick={handleChangeSideBar}>
                    <BsArrowLeft />
                  </button>
                </span>
                <div>
                  <img src={logoImg} alt="Logo" />
                  <h1>YTU - O</h1>
                </div>
                <ul>
                  <li>
                    <a href="/athletes" title="Sporcular">
                      <FaRunning />
                      <p>Sporcular</p>
                    </a>
                  </li>
                  <li>
                    <a href="/events" title="Etkinlikler">
                      <MdEventNote />
                      <p>Etkinlikler</p>
                    </a>
                  </li>
                  <li>
                    <a href="/origames" title="Origames">
                      <FaGamepad />
                      <p>Origames</p>
                    </a>
                  </li>
                </ul>
              </nav>
              <div>
                <ul>
                  <li>
                    <a href="/notifications">
                      <IoNotificationsSharp />
                      <p>Bildirimler</p>
                    </a>
                  </li>
                  <li>
                    <a href="/settings">
                      <MdSettings />
                      <p>Ayarlar</p>
                    </a>
                  </li>
                  <li>
                    {isLoggedIn ? (
                      <button onClick={handleLogout} style={{ background: "none", border: "none", cursor: "pointer" }}>
                        <RiLogoutCircleRLine />
                        <p>Çıkış Yap</p>
                      </button>
                    ) : (
                      <a href="/signin">
                        <AiOutlineLogin />
                        <p>Giriş Yap</p>
                      </a>
                    )}
                  </li>
                </ul>
                <span>
                  {isLoggedIn && profile ? (
                    <>
                      <img src={'http://127.0.0.1:8000'+profile.profile_picture || userImg} alt="Profile" />
                      <p>{profile.user?.first_name} {profile.user?.last_name}</p>
                    </>
                  ) : (
                    <>
                      <img src={userImg} alt="Profile" />
                      <p>Guest</p>
                    </>
                  )}
                </span>
              </div>
            </section>
            <aside onClick={handleChangeSideBar} />
          </OpenSideBar>
        )}
      </Content>
    </Container>
  );
}
