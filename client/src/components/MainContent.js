import { Card, CardColumns, Button, Image, Container, Row, Col, Spinner } from 'react-bootstrap';
//import images
import lock from "../myicons/lock.png";
import memes from "../myicons/memes.gif";
import API from '../API';
import ModalDetails from './ModalDetails';
import ModalCreate from './ModalCreate';
//imports needed to use state
import React, { useState } from 'react';

//Callback that receives an old task, update its temp property and performs an API call to delete it from the server
const deleteMeme = (editedMeme, setDirty, setMemesList) => {
    setMemesList((oldList) => {
        //Starting from the oldList check each task, if it matches the one that we're editing then
        //create a new object that will replace it and return it
        const list = oldList.map((meme) => {
            if (meme.id === editedMeme.id) {
                return editedMeme;
            }
            else {
                return meme;
            }
        });
        return list;
    });
    API.deleteMeme(editedMeme.id).then(() => setDirty ? setDirty(true) : null);
}

function MemeCard(props) {
    let tempId = 0;

    return (<Card border={props.meme.temp ? "primary" : ""}>
        <Card.Body>
            <Container>
                <Row>
                    <Col xs={!props.meme.temp && !props.meme.prot ? 12 : 12 - Number(props.meme.temp) - Number(props.meme.prot)}>
                        <Card.Title >{props.meme.title}</Card.Title>
                    </Col>
                    {props.meme.prot && <Col xs={1}>
                        <Image src={lock} width={22} height={22} />
                    </Col>}
                    {props.meme.temp && <Col xs={1}>
                        <Spinner animation="border" variant="primary" />
                    </Col>}
                </Row>
            </Container>
        </Card.Body>
        <Container onClick={props.meme.temp ? null : () => {
            props.setModalDetailsMeme(props.meme);
            //Set modal to true to create and open the modal form
            props.setModal(true);
        }} className="card-list-relative" >
            <Card.Img variant="top" src={props.meme.url}></Card.Img>
            <Card.ImgOverlay className="text-center">
                <Card.Text key={tempId++} className={"standard-text " + props.meme.cssFontClass + " " + props.meme.cssColourClass + " " + props.meme.cssSentencesPosition[0]}>{props.meme.sentence1}</Card.Text>
                <Card.Text key={tempId++} className={"standard-text " + props.meme.cssFontClass + " " + props.meme.cssColourClass + " " + props.meme.cssSentencesPosition[1]}>{props.meme.sentence2}</Card.Text>
                <Card.Text key={tempId++} className={"standard-text " + props.meme.cssFontClass + " " + props.meme.cssColourClass + " " + props.meme.cssSentencesPosition[2]}>{props.meme.sentence3}</Card.Text>
            </Card.ImgOverlay>
        </Container>
        {props.loggedIn && <Card.Footer className="d-flex w-100 justify-content-between">
            <Button size="md" variant="primary" onClick={props.meme.temp ? null : () => {
                const fontMapping = {
                    "font-arial": "Arial",
                    "font-impact": "Impact"
                }
                const colorMapping = {
                    "color-red": "Red",
                    "color-white": "White",
                    "color-black": "Black",
                    "color-green": "Green"
                }
                props.setModalCreateMeme({
                    title: props.meme.title,
                    url: props.meme.url,
                    sentence1: props.meme.sentence1,
                    sentence2: props.meme.sentence2,
                    sentence3: props.meme.sentence3,
                    cssSentencesPosition: props.meme.cssSentencesPosition,
                    font: fontMapping[props.meme.cssFontClass],
                    color: colorMapping[props.meme.cssColourClass],
                    prot: props.meme.prot ? "Protected" : "Public",
                    creatorName: props.username,
                    visibilityConstraint: props.userId !== props.meme.creatorId && props.meme.prot === true
                })
                props.setModalCreate(true);
            }} disabled={props.meme.temp}>Copy meme</Button>
            <Button size="md" variant="primary" onClick={props.meme.temp ? null : () => {
                let editedMeme = new props.constr(props.meme.id, props.meme.title, props.meme.url, props.meme.sentence1, props.meme.sentence2, props.meme.sentence3, props.meme.cssSentencesPosition, props.meme.cssFontClass, props.meme.cssColourClass, props.meme.prot, props.meme.creatorName, props.meme.creatorId, true);
                deleteMeme(editedMeme, props.setDirty, props.setMemesList);
            }} disabled={(props.username !== props.meme.creatorName) || props.meme.temp}>Delete meme</Button>
        </Card.Footer>}
    </Card>)
}

function MainContent(props) {
    const [modalDetails, setModalDetails] = useState(false);

    const [modalDetailsMeme, setModalDetailsMeme] = useState(undefined);

    const [modalCreate, setModalCreate] = useState(false);

    const [modalCreateMeme, setModalCreateMeme] = useState(undefined);

    // //Define a state for ids of TEMPORARY tasks. It will be used like a counter to get a new id every time it is necessary
    const [tempMemeId, setTempMemeId] = useState(1);

    return (<>{props.memes.length === 0 ? <Image className="center" src={memes} /> : <><CardColumns>
        {props.memes.map((m) => (<MemeCard key={m.id} userId={props.userId} constr={props.constr} setModalCreate={setModalCreate} setModalCreateMeme={setModalCreateMeme} setModal={setModalDetails} setModalDetailsMeme={setModalDetailsMeme} username={props.username} loggedIn={props.loggedIn} meme={m} setMemesList={props.setMemesList} setDirty={props.setDirty} />))}
    </CardColumns>
    {modalDetails && (<ModalDetails setLoading={props.setLoading} setDirty={props.setDirty} meme={modalDetailsMeme} setModal={setModalDetails} />)}
    </>}
        {modalCreate && (<ModalCreate setLoading={props.setLoading} tempMemeId={tempMemeId} setTempMemeId={setTempMemeId} setMemesList={props.setMemesList} constr={props.constr} meme={modalCreateMeme} images={props.images} setModal={setModalCreate} username={props.username} userId={props.userId} setDirty={props.setDirty} />)}
        {props.loggedIn && <Button type="button" variant="primary" size="lg" className="fixed-right-bottom" onClick={() => {
            //Add button
            //Update the modalTask state with an empty task that will be passed to the modal form
            setModalCreateMeme({
                title: "",
                url: "http://localhost:3000/static/old.png",
                sentence1: "",
                sentence2: "",
                sentence3: "",
                cssSentencesPosition: ["bottom-single-text", "", ""],
                font: "Impact",
                color: "White",
                prot: "Protected",
                creatorName: props.username
            });
            //Set modal to true to create and open the modal form
            setModalCreate(true);
        }}>+</Button>}
    </>
    )
}

export default MainContent;