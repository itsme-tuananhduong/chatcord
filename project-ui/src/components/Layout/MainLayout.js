import Search from "../../pages/Search/Search";

function MainLayout(props) {
  const { children } = props;

  return (
    <div className="MainLayout">
      <Search />
    </div>
  );
}

export default MainLayout;
