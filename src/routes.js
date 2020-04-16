import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import Route from './services/Route'

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
import Company from './pages/Company'
import NotFound from './pages/NotFound'

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
                <Route path="/login" component={Login} authTo="/dashboard" />
                <Route path="/company" component={Company}/>
                <Route path="/dashboard" exact component={DashBoad} isPrivate />
                <Route path="/dashboard/photos" component={Photos} isPrivate />
                <Route path="/dashboard/posts" component={Posts} isPrivate />
                <Route path="/dashboard/notices" component={Notices} isPrivate />
                <Route path="/dashboard/fones" component={Phones} isPrivate />
                <Route path="/dashboard/users" component={Users} isPrivate />
                <Route path="*" component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}