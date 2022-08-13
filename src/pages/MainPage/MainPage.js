import React from 'react'

import { Container, Row, Col } from 'react-bootstrap';

import Appointment from '../../components/Appointment/Appointment'

import './MainPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MainPage() {
  return (
    <>
      <Container fluid className='mainPage'>
        <Row>
          <Col className='leftSide'>
            <h1 className='mainText'>BARBER</h1>
          </Col>
          <Col className='rightSide'>
            <Appointment />
          </Col>
        </Row>
      </Container>
        {/* <div className='leftSide'>
          <p>hello</p>
        </div>         */}
    </>
  )
}