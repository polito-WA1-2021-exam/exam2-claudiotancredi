import { Card, CardColumns, Button, Image, Container } from 'react-bootstrap';
//import images
import lock from "../myicons/lock.png";
import API from '../API';
import ModalDetails from './ModalDetails';
import ModalCreate from './ModalCreate';
//imports needed to use state
import React, { useState} from 'react';

function MemeCard(props) {
    let tempId = 0;

    return (<Card>
        <Card.Body>
            <Card.Title className="d-flex w-100 justify-content-between">{props.meme.title} {props.meme.prot && <Image src={lock} width={22} height={22} />}</Card.Title>
        </Card.Body>
        <Container onClick={() => {
            props.setModalDetailsMeme(props.meme);
            //Set modal to true to create and open the modal form
            props.setModal(true);
        }} className="card-list-relative" >
            <Card.Img variant="top" src={props.meme.url}></Card.Img>
            <Card.ImgOverlay className="text-center">
                {props.meme.sentences.map((s) => (<Card.Text key={tempId++} className={"standard-text " + props.meme.cssFontClass + " " + props.meme.cssColourClass + " " + props.meme.cssSentencesPosition[tempId]}>{s}</Card.Text>))}
            </Card.ImgOverlay>
        </Container>
        {props.loggedIn && <Card.Footer className="d-flex w-100 justify-content-between">
            <Button size="md" variant="primary" onClick={()=>{
                const fontMapping={
                    "font-arial":"Arial",
                    "font-impact":"Impact"
                }
                const colorMapping={
                    "color-red":"Red",
                    "color-white":"White",
                    "color-black":"Black",
                    "color-green":"Green"
                }
                props.setModalCreateMeme({
                    title: props.meme.title,
                    url: props.meme.url,
                    sentences: props.meme.sentences,
                    cssSentencesPosition: props.meme.cssSentencesPosition,
                    font: fontMapping[props.meme.cssFontClass],
                    color: colorMapping[props.meme.cssColourClass],
                    prot: props.meme.prot?"Protected":"Public",
                    creatorName: props.username,
                    visibilityConstraint: props.username!==props.meme.creatorName && props.meme.prot===true
                })
                props.setModalCreate(true);
            }
            }>Copy meme</Button>
            <Button size="md" variant="primary" onClick={() => {
                API.deleteMeme(props.meme.id);
                props.setDirty(true);
                }} disabled={props.username !== props.meme.creatorName}>Delete meme</Button>
        </Card.Footer>}
    </Card>)
}

function MainContent(props) {
    const [modalDetails, setModalDetails] = useState(false);

    const [modalDetailsMeme, setModalDetailsMeme] = useState(undefined);

    const [modalCreate, setModalCreate] = useState(false);

    const [modalCreateMeme, setModalCreateMeme] = useState(undefined);
    return (<><CardColumns>
        {props.memes.map((m) => (<MemeCard key={m.id} setModalCreate={setModalCreate} setModalCreateMeme={setModalCreateMeme} setModal={setModalDetails} setModalDetailsMeme={setModalDetailsMeme} username={props.username} loggedIn={props.loggedIn} meme={m} setMemesList={props.setMemesList} setDirty={props.setDirty} />))}
    </CardColumns>
        {modalDetails && (<ModalDetails meme={modalDetailsMeme} setModal={setModalDetails} />)}
        {modalCreate && (<ModalCreate constr={props.constr} meme={modalCreateMeme} images={props.images} setModal={setModalCreate} username={props.username} setDirty={props.setDirty}/>)}
        {props.loggedIn && <Button type="button" variant="primary" size="lg" className="fixed-right-bottom" onClick={() => {
            //Add button
            //Update the modalTask state with an empty task that will be passed to the modal form
            setModalCreateMeme({
                title: "",
                url: "http://localhost:3000/static/old.png",
                sentences: ["", "", ""],
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