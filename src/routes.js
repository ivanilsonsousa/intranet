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
import NotFound from "./components/NotFound";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/home/gallery" component={Gallery} />
        <Route path="/home/videos" component={VideoGallery} />
        <Route path="/home/persons" component={Persons} />
        <Route path="/home/fones" component={Fones} />
        <Route path="/home/pops" component={Pops} />
        <Route path="/home/documents" component={Documents} />
        <Route path="/home/login" component={Login} authTo="/home/dashboard" />
        <Route path="/home/company" component={Company} />
        <Route path="/home/dashboard" exact component={DashBoad} isPrivate />
        <Route path="/home/dashboard/photos" component={Photos} isPrivate />
        <Route path="/home/dashboard/posts" component={Posts} isPrivate />
        <Route path="/home/dashboard/notices" component={Notices} isPrivate />
        <Route path="/home/dashboard/fones" component={Phones} isPrivate />
        <Route path="/home/dashboard/users" component={Users} isPrivate />
        <Route path="/home/dashboard/videos" component={Videos} isPrivate />
        <Route path="*/" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
