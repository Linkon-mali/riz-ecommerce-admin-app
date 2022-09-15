import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import Layout from '../../components/Layout';

const Home = () => {
  return (
   <Layout sidebar>
      <Jumbotron style={{margin: '5rem', background: '#fff'}} className="text-center">
        <h2>Welcome to Admin Dashboard</h2>
        <p>It is a long established fact that a render will be listen</p>
      </Jumbotron>
   </Layout>
  )
}

export default Home