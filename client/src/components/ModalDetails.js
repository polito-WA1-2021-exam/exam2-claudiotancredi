//import react-bootstrap components
import { Modal, Card, Container, Row, Col } from 'react-bootstrap';

function ModalDetails(props) {
    return (
        <Modal show={true} onHide={() => {
            props.setModal(false);
            props.setLoading(true);
            props.setDirty(true);
        }} backdrop="static" keyboard={false} centered animation={false}  size="lg">
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
                                        <Card.Text className={"standard-text " + props.meme.cssFontClass + " " + props.meme.cssColourClass + " " + props.meme.cssSentencesPosition[0]}>{props.meme.sentence1}</Card.Text>
                                        <Card.Text className={"standard-text " + props.meme.cssFontClass + " " + props.meme.cssColourClass + " " + props.meme.cssSentencesPosition[1]}>{props.meme.sentence2}</Card.Text>
                                        <Card.Text className={"standard-text " + props.meme.cssFontClass + " " + props.meme.cssColourClass + " " + props.meme.cssSentencesPosition[2]}>{props.meme.sentence3}</Card.Text>
                                    </Card.ImgOverlay>
                                </Container>
                            </Card>
                        </Col>
                        <Col>
                            <p className="details-text">
                                Title: {props.meme.title}<br/><br/>
                                Visibility status: {props.meme.prot? "Protected" : "Public"}<br/><br/>
                                Creator: {props.meme.creatorName}
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    )
}

export default ModalDetails;