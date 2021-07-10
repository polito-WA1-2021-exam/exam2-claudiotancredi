function Meme(id, title, url, sentence1, sentence2, sentence3, cssSentencesPosition, cssFontClass, cssColourClass, prot, creatorName, creatorId, temp=false){
    this.id=id;
    this.title=title;
    this.url=url;
    this.sentence1=sentence1;
    this.sentence2=sentence2;
    this.sentence3=sentence3;
    this.cssSentencesPosition = cssSentencesPosition;
    this.cssFontClass=cssFontClass;
    this.cssColourClass=cssColourClass;
    this.prot=prot;
    this.creatorName=creatorName;
    this.creatorId=creatorId;
    this.temp=temp;
}

export default Meme;