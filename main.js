//tableau des mots à deviner
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
//compte de cliques sur le bouton 'jouer'
let counter = 0;
//fonction qui determine le mot à deviner
const guessword = () => {
    //nombre entre 0 et 9 avec chiffres derriere la virgule
    const startNumber = Math.random()*10;
    //suppression des chiffres derriere la virgule
    let finalNumber = Math.trunc(startNumber);
    //variable qui contient le mot à deviner
    const word = words[finalNumber];
    //ajout du mot à deviner dans un paragraphe caché
    document.getElementById('word').innerHTML = word;
    //on recupere la longeur du mot à deviner
    let longueur = word.length;
    //pour i est egale à 0, jusqu'a la longueur du mot
    for(let i = 0; i<longueur; i++){
        //on cree un span avec autant de tirets que de lettres dans le mot
        var x = document.createElement('SPAN');
        x.setAttribute('type', 'text');
        x.setAttribute('class', 'responseElement');
        x.setAttribute('id', 'responseElement'+i)
        document.body.appendChild(x);
        console.log(longueur);
        if(i===0 || i===longueur-1){
            document.getElementById('responseElement'+i).innerHTML = word[i];
        }else{
            document.getElementById('responseElement'+i).innerHTML = '_ ';
        }
    }
}
//fonction qui gere le formulaire
const guessInput = () => {
    //on cree un compteur d'erreur
    let mistake = 0;
    //on modifie le contenu fu bouton 'jouer !' en 'Rejouer !'
    document.getElementById('play').innerHTML = 'Rejouer !';
    //on affiche le compteur d'erreur
    document.getElementById('container').style.display = 'block';
    //on affiche le nombre d'erreur (0 au debut)
    document.getElementById('mistake').innerHTML = mistake;
    //on excecute la fonction pour choisir un mot à deviner
    guessword();
    //si on a pas encore joué
    if(counter === 0){
        //on affiche un formumaire
        document.getElementById('lettre').style.display = 'block';
        //le compteur 1 signifie que le formulaire est deja affiche
        counter++;
    }
    //on recupere le contenu du champs
    const input = document.getElementById('lettre');
    //on recupere le mot choisi a partir du paragraphe caché
    const word = document.getElementById('word').innerHTML;
    //on stocke dans une variable la longueur du mot à deviner
    const longueur = word.length;
    // on execute une fonction quand l'utilisateur lache une touche
    input.addEventListener("keyup", function(event) {
        // si la touche lachee est la touche 'entree'
        if (event.keyCode === 13) {
            //on initie un comteur de bonne reponse
            let goodAnswer = 0;
            //si le champs envoyé n'est pas vide
            if(input.value != ''){
                //pour i allant de 0 à la longueur du mot
                for(let i = 0; i<longueur; i++){
                    //si la lettre du champs est identique à une ou plusieurs lettres du mot
                    if(input.value === word[i]){
                        //on affiche la lettre à la place du tiret correspondant
                        document.getElementById('responseElement'+i).innerHTML = input.value;
                        //in incremente le compteur de bonne reponse
                        goodAnswer++;
                    }
                }
                //on vide le champs pour ecrire directement la prochaine lettre
                document.getElementById('lettre').value = '';
            }
            //si il y a pas eu de bonne reponse
            if(goodAnswer === 0){
                //on incremente le compteur d'erreur
                mistake++;
                //on met à jour le compteur d'erreur sur la page
                document.getElementById('mistake').innerHTML = mistake;
            }
            //si l'utilisateur a fait 3 erreurs
            if(mistake >= 3){
                //on desactive le champs
                document.getElementById('lettre').disabled = true;
                //on affiche la phrase à la place du compteur d'erreur
                document.getElementById('container').innerHTML = 'Vous avez perdu après '+mistake+' erreurs. Le mot était '+word+'.';
                //on color la phrase en rouge
                document.getElementById('container').style.color = 'red';
            }
        }
    });
}