const {
  Application,
  Graphics,
  Container,
  Text,
  TextStyle,
  Assets,
  Sprite,
  Texture,
  Ticker,
  Rectangle,
} = PIXI;

let artifacts = [];
let textures1 = [];
let textures2 = [];
let textures3 = [];
let RArrow;
let tick;
let cross;

const artifactLinks = ['assets/images/thigh.jpg', 'assets/images/jaw.png'];
const textures1Links = ['assets/images/giant.jpg', 'assets/images/parrot.jpg']
const textures2Links = ['assets/images/unicorn.jpg', 'assets/images/lizard.jpg']
const textures3Links = ['assets/images/phoenix.jpg', 'assets/images/cat.jpg']

async function preloadImages() {
    await Assets.load(artifactLinks);
    artifacts = artifactLinks.map(url => Texture.from(url));
    await Assets.load(textures1Links);
    textures1 = textures1Links.map(url => Texture.from(url));
    await Assets.load(textures2Links);
    textures2 = textures2Links.map(url => Texture.from(url));
    await Assets.load(textures3Links);
    textures3 = textures3Links.map(url => Texture.from(url));
    await Assets.load('assets/images/RArrow.png');
    RArrow = Texture.from('assets/images/RArrow.png');
    await Assets.load('assets/images/tick.png');
    tick = Texture.from('assets/images/tick.png');
    await Assets.load('assets/images/cross.png');
    cross = Texture.from('assets/images/cross.png');
}

let app;


(async () => {

    app = new Application();
    await app.init({
<<<<<<< Updated upstream
        backgroundAlpha:0.3

=======
        backgroundAlpha: 0.2
>>>>>>> Stashed changes
    });

        document.getElementById("FirstGame").appendChild(app.canvas);

    await preloadImages();
    resize();

    resize();

    var questionNo = 0;
    const questions = ["Which mythical creature could this bone belong to?", "Which real life creature could this belong to?"];
    const answers1 = ["Giant", "Parrot"];
    const answers2 = ["Unicorn", "Lizard"];
    const answers3 = ["Phoenix", "Cat"];
    

    //question box initialied
    const questionBox = new Container();
    app.stage.addChild(questionBox);
    //loads image
    const questionSprite = Sprite.from(artifacts[questionNo]);
    questionBox.addChild(questionSprite);
    //size question box
    questionBox.width=250;
    questionBox.height=200;
    //sets up text
    const question = new Text({
        text: questions[questionNo],
        style: {
            fill: 0x000000,
            fontSize: 100,
            fontFamily: 'Montserrat Medium',
        }
    });
    //places question box and text within it
    questionBox.addChild(question);
    questionBox.x = 500-(questionBox.width/2);
    questionBox.y = 100;
    question.y = 1200;


    //answer 1 box
    const ans1Box = new Container();
    app.stage.addChild(ans1Box);

    const ans1Sprite = Sprite.from(textures1[questionNo]);
    ans1Box.addChild(ans1Sprite);
    ans1Box.width=250;
    ans1Box.height=200;

    const answer1 = new Text({
        text: answers1[questionNo],
        style: {
            fill: 0x000000,
            fontSize: 200,
            fontFamily: 'Montserrat Medium',
        }
    });

    ans1Box.addChild(answer1);
    ans1Box.x = 50
    ans1Box.y = 400;
    answer1.y = 900;

    ans1Box.eventMode = "static";
    ans1Box.on("pointerdown", () => {
    showAnswer(answers1[questionNo]);
  });
    

    //answer 2 box
    const ans2Box = new Container();
    app.stage.addChild(ans2Box);

    const ans2Sprite = Sprite.from(textures2[questionNo]);
    ans2Box.addChild(ans2Sprite);
    ans2Box.width=250;
    ans2Box.height=200;

    const answer2 = new Text({
        text: answers2[questionNo],
        style: {
            fill: 0x000000,
            fontSize: 200,
            fontFamily: 'Montserrat Medium',
        }
    });

    ans2Box.addChild(answer2);
    ans2Box.x = 375
    ans2Box.y = 400;
    answer2.y = 700;

    ans2Box.eventMode = "static";
    ans2Box.on("pointerdown", () => {
    showAnswer(answers2[questionNo]);
  });

    //answer 3 box
    const ans3Box = new Container();
    app.stage.addChild(ans3Box);

    const ans3Sprite = Sprite.from(textures3[questionNo]);
    ans3Box.addChild(ans3Sprite);
    ans3Box.width=250;
    ans3Box.height=200;

    const answer3 = new Text({
        text: answers3[questionNo],
        style: {
            fill: 0x000000,
            fontSize: 200,
            fontFamily: 'Montserrat Medium',
        }
    });

    ans3Box.addChild(answer3);
    ans3Box.x = app.stage.width-75;
    ans3Box.y = 400;
    answer3.y = 600;

    ans3Box.eventMode = "static";
    ans3Box.on("pointerdown", () => {
    showAnswer(answers3[questionNo]);
  });
    
    
    //next question button

    const pageButton = Sprite.from(RArrow);
    app.stage.addChild(pageButton);
    pageButton.x=800;
    pageButton.y=0;
    pageButton.width = 150;
    pageButton.height= 150;
    pageButton.eventMode="static";
    pageButton.on('pointerdown', () => {
    nextPage();
  });


    function nextPage(){
        answerPage1.visible=false;
        console.log(questionNo)
        if (questionNo == 1){
            questionNo = 0;
        }
        else {
            questionNo += 1;
        }
        questionSprite.texture = artifacts[questionNo];
        ans1Sprite.texture = textures1[questionNo];
        ans2Sprite.texture = textures2[questionNo];
        ans2Sprite.width=700;
        ans2Sprite.height=600;
        ans3Sprite.texture = textures3[questionNo];
        question.text = questions[questionNo];
        answer1.text = answers1[questionNo];
        answer2.text = answers2[questionNo];
        answer3.text = answers3[questionNo];
    }

    const corrects = ["Giant", "Lizard"];
    const facts = ["That's right! The original finders of this thigh bone(scrotum humanum) believed it to belong to a giant from the bible",
        "That's right! When they found this bone. They thought it resembled the jaws of a lizard. Megalosaurus means big lizard and this is how they got the name"
    ]
    const corrections = ["Actually, The original finders of this thigh bone(scrotum humanum) believed it to belong to a giant from the bible",
        "Actually, When they found this bone. They thought it resembled the jaws of a lizard. Megalosaurus means big lizard and this is how they got the name"
    ];

    const answerPage1 = new Container();
    app.stage.addChildAt(answerPage1, 5);
    answerPage1.visible = false;
    answerPage1.x = 100;
    answerPage1.y = 100;

    const answerBack = new Graphics();
    answerBack.rect(0, 0, 700, 500); 
    answerBack.fill(0xff9999);
    answerPage1.addChild(answerBack);

    const tickCross = new Sprite(tick);
    tickCross.anchor.set(0.5);
    tickCross.x=answerPage1.width/2;
    tickCross.y=80;
    tickCross.width=150;
    tickCross.height=150;
    answerPage1.addChildAt(tickCross, 1);
    
    const answerText = new Text({
        text :"That's right! The original finders of this thigh bone(scrotum humanum) believed it to belong to a giant from the bible",
        style: {
            fill: 0x000000,
            fontSize: 40,
            wordWrap: true,
            wordWrapWidth: 600,
            fontFamily: 'Montserrat Medium',
        }
    })
    
    answerText.x=50;
    answerText.y=200;
    answerPage1.addChildAt(answerText, 1);
    


    function showAnswer(x){
        if (corrects.includes(x)){
            tickCross.texture = tick;
            answerText.text=facts[questionNo];
        }
        else{
            tickCross.texture = cross;
            answerText.text=corrections[questionNo];
        }
        answerPage1.visible=true;
    };
    

})();


window.addEventListener('resize', resize);

function resize() {

  const parent = app.view.parentNode;
  
  app.renderer.resize(parent.clientWidth, parent.clientHeight+400);
  
}

window.onload = function(){
  resize();
};
