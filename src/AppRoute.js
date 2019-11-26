import React from 'react'
import { BrowserRouter as Router, withRouter, Route, Switch, Redirect } from 'react-router-dom'

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
import adminHomeContainer from './features/admin/admin-home/adminHomeContainer'
import categoryTable from './features/admin/admin-table/categoryTable'
import adminCategoryTable from './features/admin/admin-table/admin-category-table'
import adminProductTable from './features/admin/admin-table/admin-product-table'
import AdminProfileTable from './features/admin/admin-table/admin-profile-table'
// import BurgerImage from './Images/burgerBackground/bg1.jpg'

const AppRoute = props => {
    const { history } = props
    const routeName = ['/admin', '/admin-home', '/admin-category','/admin-product','/admin-profile']
    return (
        <Router>
            {
                <div>
                    {!routeName.includes(history.location.pathname) && <ToTop />}
                    {!routeName.includes(history.location.pathname) && <Navbar />}
                    <Switch>
                        <Route path={`/${route.admin}`} component={LoginContainer} />
                        <Route path={`/${route.delivery}`} component={DeliverContainer} />
                        <Route path={`/${route.burgerInfo}`} component={BurgerInfo} />
                        <Route path={`/${route.contant}`} component={ContactContainer} />
                        <Route path={`/${route.about}`} component={AboutContainer} />
                        <Route path={`/${route.burger}`} component={BurgerContainer} />
                        <Route path={`${route.home}`} exact component={HomeContainer} />
                        <Route path={`/${route.adminProfile}`} component={AdminProfileTable} />
                        <Route path={`/${route.adminProducts}`} component={adminProductTable} />
                        <Route path={`/${route.adminCategory}`} component={adminCategoryTable} />
                        <Route path={`/${route.adminHome}`} component={adminHomeContainer} />
                        <Redirect to={`${route.home}`} />
                    </Switch>
                    {!routeName.includes(history.location.pathname) && <Footer />}

                </div>
            }
        </Router>
    )
}

export default withRouter(AppRoute)
