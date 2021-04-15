import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Route from "./services/Route";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import VideoGallery from "./pages/VideoGallery";
import Persons from "./pages/Persons";
import Fones from "./pages/Fones";
import Pops from "./pages/Pops";
import Documents from "./pages/Documents";
import Login from "./pages/Login";
import DashBoad from "./pages/DashBoad";
import Photos from "./pages/Adm/Photos";
import Posts from "./pages/Adm/Posts";
import Notices from "./pages/Adm/Notices";
import Phones from "./pages/Adm/Fones";
import Users from "./pages/Adm/Users";
import Videos from "./pages/Adm/Videos";
import Company from "./pages/Company";
import Link from "./pages/Link";
import Playlist from "./pages/Playlists";

const DIR = process.env.REACT_APP_DIR;

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path={`/${DIR}`} exact component={Home} />
        <Route path={`/${DIR}/gallery`} component={Gallery} />
        <Route path={`/${DIR}/videos`} component={VideoGallery} />
        <Route path={`/${DIR}/playlists`} component={Playlist} />
        <Route path={`/${DIR}/persons`} component={Persons} />
        <Route path={`/${DIR}/fones`} component={Fones} />
        <Route path={`/${DIR}/pops/:parent`} component={Pops} />
        <Route path={`/${DIR}/documents/:parent`} component={Documents} />
        <Route path={`/${DIR}/login`} component={Login} authTo={`/${DIR}/dashboard`} />
        <Route path={`/${DIR}/company`} component={Company} />
        <Route path={`/${DIR}/link`} component={Link} />
        <Route path={`/${DIR}/dashboard`} exact component={DashBoad} isPrivate />
        <Route path={`/${DIR}/dashboard/photos`} component={Photos} isPrivate />
        <Route path={`/${DIR}/dashboard/posts`} component={Posts} isPrivate />
        <Route path={`/${DIR}/dashboard/notices`} component={Notices} isPrivate />
        <Route path={`/${DIR}/dashboard/fones`} component={Phones} isPrivate />
        <Route path={`/${DIR}/dashboard/users`} component={Users} isPrivate />
        <Route path={`/${DIR}/dashboard/videos`} component={Videos} isPrivate />
        <Route path={`*`} component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
