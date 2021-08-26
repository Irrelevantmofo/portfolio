import React from 'react';
import Aux from '../../Hoc/Auxiliary/auxiliary';
import {
    Row,
    Col,
    Container
} from 'react-bootstrap';

const footer = (props) => (
    <Aux>
        <Container style={{backgroundColor:'#f3f7fa'}}>
            <Row>
                <Col>
                    <small>Developed by: Joshua Fabricante</small>
                </Col>
            </Row>
        </Container>
    </Aux>
);

export default footer;