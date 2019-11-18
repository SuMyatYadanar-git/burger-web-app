import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import HomeContainer from './features/home/container/HomeContainer'
import BurgerContainer from './features/burgers/containers/BurgerContainer'
import AboutContainer from './features/about/container/AboutContainer'
import ContactContainer from './features/contant/container/ContactContainer'
import * as route from './config/route.config'
import Navbar from './features/app/Navbar'
import BurgerInfo from './features/burgers/components/BurgerInfo'
import DeliverContainer from './features/delivery/container/DeliverContainer'
import Footer from './features/app/footer'
import ToTop from './features/app/toTopButton'
import LoginContainer from './features/admin/login/loginContainer'

// import BurgerImage from './Images/burgerBackground/bg1.jpg'

const AppRoute = props => {
    return (
        <Router>
            <ToTop />
            <Navbar />
            <Switch>
                <Route path={`/${route.admin}`} component={LoginContainer} />
                <Route path={`/${route.delivery}`} component={DeliverContainer} />
                <Route path={`/${route.burgerInfo}`} component={BurgerInfo} />
                <Route path={`/${route.contant}`} component={ContactContainer} />
                <Route path={`/${route.about}`} component={AboutContainer} />
                <Route path={`/${route.burger}`} component={BurgerContainer} />
                <Route path={`${route.home}`} component={HomeContainer} />

            </Switch>
            <Footer />
        </Router>
    )
}

export default AppRoute

