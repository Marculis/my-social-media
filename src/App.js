import { Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { getAuth } from "./redux/appReducer";
import { useEffect } from "react";
import Dialogs from "./appPages/dialogsPage/dialogs";
import Settings from "./appPages/settingsPage/settings";
import css from "./App.module.css";
import Nav from "./appPages/nav/nav";
import Header from "./appPages/header/header";
import FriendsContainer from "./appPages/friendsPage/friendsContainer";
import ProfileContainer from "./appPages/profilePage/profileContainer";
import Login from "./appPages/login/login";
import Chat from "./appPages/dialogsPage/chat/chat";
import Preloader from "./appPages/components/preloader";

let App = (props) => {
  useEffect(() => {
    props.getAuth();
  }, [props.isAuth]);

  return (
    <div>
      <Header />
      <div>
        {props.isAuth && props.myId && <Nav myId={props.myId} />}
        <div className={css.pagesWrapper}>
          {props.isAuth && !props.myId && <Preloader />}
          {props.isAuth && props.myId ? (
            <Routes>
              <Route
                path="/"
                element={<Navigate to={`/profile/${props.myId}`} replace />}
              />
              <Route
                path="/friends/:pageNumber"
                element={<FriendsContainer />}
              />
              <Route
                path="/friends"
                element={
                  <Navigate to={`/friends/${props.pageNumber}`} replace />
                }
              />
              <Route path="/profile/:id" element={<ProfileContainer />} />
              <Route
                path="/profile"
                element={<Navigate to={`/profile/${props.myId}`} replace />}
              />
              <Route path="/dialogs" element={<Dialogs />} />
              <Route path="/dialogs/:id" element={<Dialogs />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
              <Route path="/chat/:id" element={<Chat />} />
            </Routes>
          ) : (
            <Login />
          )}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuth: state.app.isAuth,
  myId: state.app.id,
  pageNumber: state.users.page,
});

App = connect(mapStateToProps, { getAuth })(App);

export default App;
