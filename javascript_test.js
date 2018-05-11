// function Employe(nom){
//   this.nom = nom;
//   this.branche="commun";
//   this.titre = "employé";
// }
//
// function Manager(){
//   this.rapports=[]¢
//   this.titre = "manager";
// }
//
// Manager.prototype = new Employe("Lionel");
//
// class Vehicule{
//   constructor(modele){
//     this.modele = modele;
//   }
//
//   toString(){
//     return "Je suis un véhicule de modèle " + this.modele;
//   }
// }
//
// var v = new Vehicule("bonjour");
// console.log(v.toString());

// var promise = new Promise(function(resolve, reject){
//
// })

// var ajouterdeux = (n) => { console.log("premier truc") ; return Promise.resolve(n+2) };
// var multiplierdeux = (n) => { console.log("deuxieme truc") ; return n*2};
// var mettreaucarre = (n) => {console.log("troisème truc") ; return n*n};
//
// const promise = new Promise(function(resolve, reject){
//   resolve(2);
// });
//
// var val = promise.then(ajouterdeux)
//                 .then(multiplierdeux)
//                 .then(mettreaucarre)
//                 .then( (n) => { console.log(n) })
//                 .catch(function(e){ console.log(e.message) });


var test = { prenom:"Lionel"}

console.log(test.prenom);
