const words = [
    'bonjour', 
    'maison', 
    'voiture', 
    'ecole', 
    'ordinateur', 
    'javascript', 
    'developpeur', 
    'paris', 
    'voyage', 
    'soleil'
];
let counter = 0;
const guessword = () => {
    const startNumber = Math.random()*10;
    let finalNumber = Math.trunc(startNumber);
    const word = words[finalNumber];
    document.getElementById('word').innerHTML = word;
    console.log(word);
    let longueur = word.length;
    for(let i = 0; i<longueur; i++){
        var x = document.createElement('SPAN');
        x.setAttribute('type', 'text');
        x.setAttribute('class', 'responseElement');
        x.setAttribute('id', 'responseElement'+i)
        document.body.appendChild(x);
        document.getElementById('responseElement'+i).innerHTML = '_ ';
    }
    //console.log(word);
    
}
const guessInput = () => {
    let mistake = 0;
    let goodAnswer;
    document.getElementById('play').innerHTML = 'Rejouer !';
    document.getElementById('container').style.display = 'block';
    document.getElementById('mistake').innerHTML = mistake;
    guessword();
    if(counter === 0){
        document.getElementById('lettre').style.display = 'block';
        counter++;
    }
    const input = document.getElementById('lettre');
    const word = document.getElementById('word').innerHTML;
    const longueur = word.length;
    console.log(word);
    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // on recupere la valeur du champs
            if(input.value != ''){
                for(let i = 0; i<longueur; i++){
                    if(input.value === word[i]){
                        goodAnswer = 0;
                        document.getElementById('responseElement'+i).innerHTML = input.value;
                        goodAnswer++;
                    }else if(goodAnswer === 0){
                            mistake++;
                            document.getElementById('mistake').innerHTML = mistake;
                            console.log('C\'est faux !');
                            break;
                    }
                }
                document.getElementById('lettre').value = '';
            }
        }
    });
}