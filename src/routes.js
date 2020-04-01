import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Gallery from './pages/Gallery'
import VideoGallery from './pages/VideoGallery'
import Persons from './pages/Persons'
import Fones from './pages/Fones'
import Activities from './pages/Activities'
import Pops from './pages/Pops'
import Documents from './pages/Documents'
import Login from './pages/Login'
import DashBoad from './pages/DashBoad'
import Photos from './pages/Adm/Photos'
import Posts from './pages/Adm/Posts'
import Notices from './pages/Adm/Notices'
import Phones from './pages/Adm/Fones'
import Users from './pages/Adm/Users'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/gallery" component={Gallery}/>
                <Route path="/videos" component={VideoGallery}/>
                <Route path="/persons" component={Persons}/>
                <Route path="/fones" component={Fones}/>
                <Route path="/activities" component={Activities}/>
                <Route path="/pops" component={Pops}/>
                <Route path="/documents" component={Documents}/>
                <Route path="/login" component={Login}/>
                <Route path="/dashboard" exact component={DashBoad}/>
                <Route path="/dashboard/photos" component={Photos}/>
                <Route path="/dashboard/posts" component={Posts}/>
                <Route path="/dashboard/notices" component={Notices}/>
                <Route path="/dashboard/fones" component={Phones}/>
                <Route path="/dashboard/users" component={Users}/>
            </Switch>
        </BrowserRouter>
    )
}