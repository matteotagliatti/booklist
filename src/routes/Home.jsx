import { Link } from "react-router-dom";
import Header from "../components/Header";
import Create from "../components/Create";
import List from "../components/List";
import Login from "../components/Login";

export default function Home({ user, pb, setUser, booklist, getBooklist }) {
  const headerTitle = "(Basic) Booklist";
  const headerButtons = [
    <button className="w-fit" onClick={logout}>
      Logout
    </button>,
    <Link to={"add"}>Add</Link>,
  ];

  function logout() {
    localStorage.removeItem("authData");
    setUser(null);
    pb.authStore.clear();
  }

  return (
    <>
      <Header
        title={user ? `${user.record.name}'s ${headerTitle}` : `${headerTitle}`}
        subtitle={user ? "Your booklist" : " A basic booklist. Login to start"}
        buttons={user ? headerButtons : null}
      />
      {user ? (
        <>
          <Create pb={pb} userID={user.record.id} getBooklist={getBooklist} />
          <List booklist={booklist} />
        </>
      ) : (
        <Login pb={pb} setUser={setUser} />
      )}
    </>
  );
}
