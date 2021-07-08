//import react-bootstrap components
import { Button, Modal, Card, Container, Row, Col } from 'react-bootstrap';

function ModalDetails(props) {
    let tempId = 0;
    return (
        <Modal show={true} onHide={() => props.setModal(false)} backdrop="static" keyboard={false} centered animation={false}  size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Properties of the meme</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className="align-items-center">
                        <Col xs={7}>
                            <Card>
                                <Container className="card-relative" >
                                    <Card.Img variant="top" src={props.meme.url}></Card.Img>
                                    <Card.ImgOverlay className="text-center">
                                        {props.meme.sentences.map((s) => (<Card.Text key={tempId++} className={"standard-text " + props.meme.cssFontClass + " " + props.meme.cssColourClass + " " + props.meme.cssSentencesPosition[tempId]}>{s}</Card.Text>))}
                                    </Card.ImgOverlay>
                                </Container>
                            </Card>
                        </Col>
                        <Col>
                            <p className="details-text">
                                Title: {props.meme.title}<br/><br/>
                                Visibility status: {props.meme.prot? "Protected" : "Public"}<br/><br/>
                                Creator name: {props.meme.creatorName}
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.setModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDetails;