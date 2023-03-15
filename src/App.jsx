import { useState, useEffect } from "react";
import PocketBase from "pocketbase";

import Header from "./components/Header";
import Create from "./components/Create";
import List from "./components/List";
import { LoginLogout } from "./components/LogInLogout";
const pb = new PocketBase("http://127.0.0.1:8090");

function App() {
  const [booklist, setBooklist] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      getBooklist();
    }
  }, [user]);

  async function getBooklist() {
    const records = await pb.collection("books").getFullList({
      filter: "owner.name = " + '"' + user.record.name + '"',
    });
    setBooklist(records);
  }

  const logUser = () => {
    console.log(user);
  };

  return (
    <main className="w-full max-w-xl mx-auto py-10 md:py-20 p-5">
      <button onClick={logUser}>LogUser</button>
      <Header />
      {user ? (
        <>
          <Create pb={pb} getBooklist={getBooklist} />
          <List booklist={booklist} />
        </>
      ) : (
        <LoginLogout pb={pb} setUser={setUser} />
      )}
    </main>
  );
}

export default App;
