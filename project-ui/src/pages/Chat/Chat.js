import Sidebar from "../../components/Sidebar/Sidebar";
import List from "../../components/List/List";
import RandomChat from "../../components/RandomChat/RandomChat";

function Connect() {
  return (
    <div className="Connect">
      <Sidebar />
      <RandomChat />
      <List />
    </div>
  );
}

export default Connect;
