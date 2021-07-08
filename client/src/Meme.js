function Meme(id, title, url, sentences, cssSentencesPosition, cssFontClass, cssColourClass, prot, creatorName, temp=false){
    this.id=id;
    this.title=title;
    this.url=url;
    this.sentences=sentences;
    this.cssSentencesPosition = cssSentencesPosition;
    this.cssFontClass=cssFontClass;
    this.cssColourClass=cssColourClass;
    this.prot=prot;
    this.creatorName=creatorName;
    this.temp=temp;
}

export default Meme;