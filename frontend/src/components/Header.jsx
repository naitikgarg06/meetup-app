import { Link } from "react-router";

const Header = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid ps-sm-4">
          <Link class="navbar-brand" to="/">
            Meetup
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
