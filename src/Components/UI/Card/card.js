import React from 'react';
import {
    Card,
    Button
} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const CardBoi = props => {
    let button = <Button href={props.link} target='_blank' variant="primary">Visit Site</Button>

    if(props.component==='Application'){
        button = <Button as={Link} to={props.link} variant="dark">Visit app</Button>
    }
    return (
        <Card style={props.styleObj}>
            <Card.Img variant="top" src={props.img} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.content}
                </Card.Text>
                {button}
            </Card.Body>
        </Card>
    )
}
export default CardBoi
