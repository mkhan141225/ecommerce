import React from 'react'
import { Layout } from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import {useAuth} from '../../context/auth'
const Dashboard = () => {

const [auth]= useAuth()

  return (

    <Layout title={"Dashboard - Ecommerce"}>
      <div class="container-fluid m-3 p-3">
        <div class="row">
          <div class="col-3">
            <UserMenu />
          </div>
          <div class="col-9">
<div className='card w-70 p-3 m-3'>
       <h1> {auth?.user?.name}</h1> 
       <h1> {auth?.user?.email}</h1> 
       <h1> {auth?.user?.address}</h1> 
          </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard