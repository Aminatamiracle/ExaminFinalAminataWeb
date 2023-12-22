// créer un constructeur Pour la recette qu'on appellera lors du l'ajout d'une recette
function Recette( Nom ="" ,Ing1 ="",
                  Ing2= "", Ing3 ="",instruct=""){
    this.nom = Nom;
    this.Ingredient1 =Ing1;
    this.Ingredient2 =Ing2;
    this.Ingredients3 = Ing3;
    this.Instruction =instruct
}
const recette = new Recette()

// Créér L'affiche de la reccette
function creerCarteRecette(recette) {
    $("#LesRecettes").append(`
    <li class = "card col-3 m-2">
  
  <div class="card-body">
    <h2 class="card-title h5">${recette.nom}</h2>
    <div class = "card-text">
        <li> IngredientA : ${recette.Ingredient1}</li>
        <li> IngredientB : ${recette.Ingredient2}</li>
        <li> IngredientC : ${recette.Ingredients3}</li>
        <p> Instruction : ${recette.Instruction}</p>
        <input type = "button" onclick="supprimer(${recette.nom})" class="btn btn-primary" value="Supprimer">
    </div>
      </div>
</li>`)

let bouton = document.getElementById("AjouterRecette")
bouton.addEventListener("click",AjouterRecette)
function AjouterRecette(){
    event.preventDefault();
    const recette1 = new Recette()
    // Ajouter la recette
    let nom = $("#nom").val()
    let ing1 = $("#ingredient1").val()
    let ing2 = $("#ingredient2").val()
    let ing3 = $("#ingredient3").val()
    let quant1 = $("#quant1").val()
    let quant2 = $("#quant2").val()
    let quant3 = $("#quant3").val()
    let instruction = $("#instrunction")
    // Ajouter c'est variable au constructeur si le nom n'est pas vide et au moins un ingredients et sa qauntité  ajouter
    if(nom !=="" && ing1 > 0 && instruction !=="" ){
        recette.nom = nom
        recette.ing1 = ing1;
        recette.ing2 = ing2;
        recette.ing3 = ing3;
        recette.quant1 = quant1
        recette.quant2 = quant2
        recette.quant3 = quant3
        creerCarteRecette(recette1)
        AfficherTout()
    }
    else  {
        $("#ErreureAffiche").text("Vérifier vos entrer : vous devez au moin rentrer le" +
            "nom de la recettes un ingredients, sa qauntité puis l'instruction").css("color" ,"red")
    }

}}

//  Celui-ci qui ajoute dans Moka
function AjouterJsonMoka(){

    event.preventDefault();

    fetch("https://6570708709586eff6641625c.mockapi.io/Recette", {
        method:"POST",
        headers:{"content-type":"application/json"},
        // sender your data in the request body as JSON
        body: JSON.stringify(recette)
    }).then(res =>{
        if (res.ok){
            return res.json();
        }
        // Handle error
        throw new Error("Erreur" + res.status);
    }).then(task =>{
        // do something with the new task
        creerCarteRecette(recette)
    }).catch(error =>{
        // handler error
        $(".alert").text(error.message).removeClass("d-none");
    })

}
function AfficherTout() {
    $("#LesRecettes").text("")
    $.getJSON('https://6570708709586eff6641625c.mockapi.io/Recette/')
        .done(function(chat){
            chat.forEach(function(chat) {
                creerCarteRecette(recette);
            });
        })
        .fail(function(error){
            $('.alert').text(error.status).removeClass('d-none');
        });

}
// On supprimer avec le nom de la recette
function supprimer(Nom){

    fetch('https://6570708709586eff6641625c.mockapi.io/Recette/'+Nom, {
        method: 'DELETE',
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error("Erreur" +res.status)
    }).then(chat => {

    }).catch(error => {
        // handle error
        $('.alert').text(error.message).removeClass('d-none')
    })
}