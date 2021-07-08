//import react-bootstrap components
import { Button, Modal, Card, Container, Row, Col, Form } from 'react-bootstrap';
//imports needed to use state
import React, { useState} from 'react';
import API from '../API';

const addMeme = (newMeme, setDirty) => {
    API.addNewMeme(newMeme).then(()=>setDirty?setDirty(true):null);
}

function SentenceField(props) {
    return (<Form.Row>
        <Form.Group as={Col} xs="12" controlId={"sentence" + props.id}>
            <Form.Label>Sentence {props.id}</Form.Label>
            <Form.Control type="text" placeholder="Write here..." value={props.sentence}
                onChange={(event) => props.setSentence(event.target.value)} />
        </Form.Group>
    </Form.Row>)
}

function MemeForm(props) {
    let tempId = 1;
    return (<>
        <Form>
            <p className="details-text">
                Customize your meme
            </p>
            <Form.Row>
                <Form.Group as={Col} xs="12" controlId="titleForm">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Write here..." value={props.title}
                        onChange={(event) => props.setTitle(event.target.value)} />
                </Form.Group>
            </Form.Row>
            {props.image.cssSentencesPosition[0] !== "" && <SentenceField id={tempId++} sentence={props.sentence1} setSentence={props.setSentence1} />}
            {props.image.cssSentencesPosition[1] !== "" && <SentenceField id={tempId++} sentence={props.sentence2} setSentence={props.setSentence2} />}
            {props.image.cssSentencesPosition[2] !== "" && <SentenceField id={tempId++} sentence={props.sentence3} setSentence={props.setSentence3} />}
            <Form.Row>
                <Form.Group as={Col} xs="6" controlId="fontForm">
                    <Form.Label>Set font</Form.Label>
                    <Form.Control as="select" value={props.font} onChange={(event) => props.setFont(event.target.value)}>
                        <option >Impact</option>
                        <option>Arial</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} xs="6" controlId="colorForm">
                    <Form.Label>Set color</Form.Label>
                    <Form.Control as="select" value={props.color} onChange={(event) => props.setColor(event.target.value)}>
                        <option >White</option>
                        <option>Black</option>
                        <option>Green</option>
                        <option>Red</option>
                    </Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} xs="12" controlId="visibilityForm">
                    <Form.Label>Set visibility status</Form.Label>
                    <Form.Control as="select" value={props.visibilityStatus} onChange={(event) => props.setVisibilityStatus(event.target.value)} disabled={props.visibilityConstraint===true}>
                        <option >Protected</option>
                        <option>Public</option>
                    </Form.Control>
                </Form.Group>
            </Form.Row>
        </Form>
    </>)
}

function ModalCreate(props) {
    const modalTitle = (props.meme.title === "" ? "New meme" : "Copy meme");
    let tempId = 0;
    let tempIdButton = 0;

    const [currentImage, setCurrentImage] = useState(props.images.filter(element => element.url === props.meme.url)[0]);
    const [title, setTitle] = useState(props.meme.title);
    const [font, setFont] = useState(props.meme.font);
    const [color, setColor] = useState(props.meme.color);
    const [sentence1, setSentence1] = useState(props.meme.sentences[0]);
    const [sentence2, setSentence2] = useState(props.meme.sentences[1]);
    const [sentence3, setSentence3] = useState(props.meme.sentences[2]);
    const [visibilityStatus, setVisibilityStatus] = useState(props.meme.prot);
    const [visibilityConstraint, setVisibilityConstraint] = useState(props.meme.visibilityConstraint);

    const addMemeThenCloseModal = () => {
        const newMeme = {title:title, imageId:currentImage.id, sentences:sentence1+"&&&&&"+sentence2+"&&&&&"+sentence3, cssFontClass:"font-" + font.toLowerCase(), cssColourClass:"color-"+color.toLowerCase(), prot:visibilityStatus==="Protected"};
        addMeme(newMeme, props.setDirty);
        props.setModal(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //Check if the form is valid, if so add/edit the task and close the modal
        //First case: description long enough, both date and time set, deadline is set
        if (title.length >= 5 && (sentence1!=="" || sentence2!=="" || sentence3!=="")) {
            addMemeThenCloseModal();
        }
        else {
            //Form is not valid, but perform validation and update states accordingly so that messages are shown on the form
            //Validation for description:
            // if (taskDesc.length === 0) {
            //     setEmptyDesc(true);
            //     setLongDesc(false);
            // }
            // else if (taskDesc.length < 5 && taskDesc.length > 0) {
            //     setEmptyDesc(false);
            //     setLongDesc(false);
            // }
            // else {
            //     setEmptyDesc(false);
            //     setLongDesc(true);
            // }
            // //Validation for deadline:
            // if (taskDeadline !== "" && taskTime === "") {
            //     setEmptyDate(false);
            //     setEmptyTime(true);
            // }
            // else if (taskDeadline === "" && taskTime !== "") {
            //     setEmptyDate(true);
            //     setEmptyTime(false);
            // }
            // else if (taskDeadline !== "" && taskTime !== "") {
            //     setEmptyDate(false);
            //     setEmptyTime(false);
            // }
            // else {
            //     setEmptyDate(true);
            //     setEmptyTime(true);
            // }
            // //From the first time that the user clicks on the Save button the validated state is set to true
            // setValidated(true);
        }
    };

    return (
        <Modal show={true} onHide={() => props.setModal(false)} backdrop="static" keyboard={false} centered animation={false} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className="align-items-center">
                        {modalTitle === "New meme" && <Col xs={3}>
                            <Row>
                                <p className="details-text">Choose a background image for the meme</p>
                            </Row>
                            <div className="custom-previews">
                                {props.images.map((i) => (<Button key={tempIdButton++} width={145} height={145} variant="link outline-light" as="img" src={i.url} onClick={() => {
                                    setCurrentImage(i);
                                    setTitle("");
                                    setFont("Impact");
                                    setColor("White");
                                    setSentence1("");
                                    setSentence2("");
                                    setSentence3("");
                                    setVisibilityStatus("Protected");
                                }} />))}
                            </div>
                        </Col>
                        }
                        <Col xs={6}>
                            <Row>
                                <Col>
                                    <p className="details-text">
                                        Preview
                                    </p>
                                </Col>
                            </Row>
                            <Card>
                                <Container className="card-relative" >
                                    <Card.Img variant="top" src={currentImage.url}></Card.Img>
                                    <Card.ImgOverlay className="text-center">
                                        <Card.Text className={"standard-text font-" + font.toLowerCase() + " color-" + color.toLowerCase() + " " + currentImage.cssSentencesPosition[0]}>{sentence1}</Card.Text>
                                        <Card.Text className={"standard-text font-" + font.toLowerCase() + " color-" + color.toLowerCase() + " " + currentImage.cssSentencesPosition[1]}>{sentence2}</Card.Text>
                                        <Card.Text className={"standard-text font-" + font.toLowerCase() + " color-" + color.toLowerCase() + " " + currentImage.cssSentencesPosition[2]}>{sentence3}</Card.Text>
                                    </Card.ImgOverlay>
                                </Container>
                            </Card>
                        </Col>
                        <Col>
                            <MemeForm visibilityConstraint={visibilityConstraint} image={currentImage} title={title} setTitle={setTitle} font={font} setFont={setFont} color={color} setColor={setColor} sentence1={sentence1} setSentence1={setSentence1} sentence2={sentence2} setSentence2={setSentence2} sentence3={sentence3} setSentence3={setSentence3} visibilityStatus={visibilityStatus} setVisibilityStatus={setVisibilityStatus} />
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.setModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalCreate;