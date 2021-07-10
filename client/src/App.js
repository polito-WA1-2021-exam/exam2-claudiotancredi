//import my CSS
import './mycss/custom.css';
//import bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
//import react-bootstrap components
import { Container } from 'react-bootstrap';
//imports needed to use state
import React, { useState, useEffect } from 'react';
//import my components
import NavBar from './components/Navbar';
import LoginForm from './components/Login';
import MainContent from './components/MainContent'
//import react-router-dom components
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
//import APIs
import API from './API';
//import images
import Meme from "./Meme";
import HashLoader from "react-spinners/HashLoader";

function App() {
  //Define a state to manage login. undefined -> request not satisfied yet, false -> user not logged in, true -> user logged in
  const [loggedIn, setLoggedIn] = useState(undefined);
  //Define a state to manage user information (its name, which will be displayed on the navbar)
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(undefined);
  //Define a state for a message to show ("incorrect username and/or password")
  const [message, setMessage] = useState('');
  const [goToLogin, setGoToLogin] = useState(false);
  const [memeList, setMemeList] = useState([]);
  const [dirty, setDirty] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      API.getUserInfo().then((user) => { setLoggedIn(true); setUserName(user.name); setUserId(user.id)}).catch((err) => { console.error(err.error); setLoggedIn(false) }).finally(() => setDirty(true));
    }
    checkAuth();
  }, []);

  // Used at App component mount and triggered every time dirty state changes. 
  // If dirty is true it performs a request to GET the tasks' list from the backend and updates the current taskList state.
  // Then set the dirty and the loading states to false. 
  useEffect(() => {
    //Variable used to avoid slow responses errors/fast filter changes caused by the user
    let isMounted = true;
    //Map each filter to the corresponding API function. This is useful to avoid code repetition
    if (dirty && loggedIn===false) {
      //Call the proper API function
      API.loadPublicMemes().then(newMemesList => {
        if (isMounted) {
          newMemesList = newMemesList.map(m => new Meme(m.id, m.title, m.url, m.sentence1, m.sentence2, m.sentence3, m.cssSentencesPosition, m.cssFontClass, m.cssColourClass, m.prot, m.creatorName, m.creatorId));
          setMemeList(newMemesList);
        }
      }).catch((err) => { if (isMounted) { setMemeList([]); } }).finally(() => {
        if (isMounted) {
          setLoading(false);
          setDirty(false);
        }
      })
    }
    else if (dirty && loggedIn===true) {
      API.loadAllMemes().then(newMemesList => {
        if (isMounted) {
          newMemesList = newMemesList.map(m => new Meme(m.id, m.title, m.url, m.sentence1, m.sentence2, m.sentence3, m.cssSentencesPosition, m.cssFontClass, m.cssColourClass, m.prot, m.creatorName, m.creatorId));
          setMemeList(newMemesList);
        }
      }).catch((err) => { if (isMounted) { setMemeList([]); } }).finally(() => {
        if (isMounted) {
          setLoading(false);
          setDirty(false);
        }
      })
    }
    //cleanup function
    return () => {
      isMounted = false;
    };
  }, [dirty, loggedIn]);

  const doLogIn = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setUserName(user.name);
      setUserId(user.id)
      setLoggedIn(true);
      setMessage('');
    } catch (err) {
      setMessage({ msg: err, type: 'danger' });
    } finally {
      setLoading(true);
      setDirty(true);
    }
  }

  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    setMemeList([]);
    setUserName('');
    setUserId(undefined);
    setMessage('');
    setGoToLogin(false);
    setLoading(true);
    setDirty(true);
  }

  const override = `
  margin       : 0;
  position     : absolute;
  top          : 50%;
  left         : 50%;
  -ms-transform: translate(-50%, -50%);
  transform    : translate(-50%, -50%);
`;

  return (
    <Router>
      <Container fluid>
        {loggedIn === true ? (<NavBar username={userName} loggedIn={loggedIn} doLogOut={doLogOut} />) : <></>}

        {loggedIn === false ? (<NavBar username={userName} loggedIn={loggedIn} setGoToLogin={setGoToLogin} />) : <></>}
        {goToLogin && <Redirect to="/login" />}
        <Switch>
          <Route exact path="/login" render={() =>
            <>{loggedIn === true ? <Redirect to="/" /> : <></>}
              {loggedIn === false ? <LoginForm setLoading={setLoading} login={doLogIn} message={message} setMessage={setMessage} setGoToLogin={setGoToLogin} setDirty={setDirty} /> : <></>}
            </>} />
          <Route exact path="/" render={() =>
            <>
              <HashLoader size={150} css={override} loading={loading} color={"#007bff"} />
              {loading === false ? <MainContent userId={userId} loggedIn={loggedIn} memes={memeList} constr={Meme} setMemesList={setMemeList} setDirty={setDirty} username={userName} setLoading={setLoading} /> : <></>}
            </>
          } />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
