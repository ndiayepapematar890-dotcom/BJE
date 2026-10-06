// ==========================================
// BJE - JAVA.JS
// ==========================================


// ==========================================
// 1. PANIER
// ==========================================

let panier = JSON.parse(
    localStorage.getItem("panierBJE")
) || [];


// ==========================================
// 2. COMPTEUR DU PANIER
// ==========================================

const nombrePanier =
    document.querySelector(".nombre-panier");


function mettreAJourNombrePanier() {

    if (!nombrePanier) {
        return;
    }

    let nombre = 0;

    panier.forEach(function(produit) {

        nombre += produit.quantite;

    });

    nombrePanier.textContent = nombre;

}


// ==========================================
// 3. FILTRE DES CATÉGORIES
// ==========================================

const boutonsCategories =
    document.querySelectorAll(".categories a");

const tousLesProduits =
    document.querySelectorAll(".produit");


boutonsCategories.forEach(function(bouton) {

    bouton.addEventListener("click", function(event) {

        event.preventDefault();

        const categorie =
            bouton.dataset.categorie;


        tousLesProduits.forEach(function(produit) {

            if (categorie === "tous") {

    produit.style.display = "";

}

else if (
    produit.classList.contains(categorie)
) {

    produit.style.display = "";

}

else {

    produit.style.display = "none";

}

        });

    });

});


// ==========================================
// 4. FICHE PRODUIT
// ==========================================

const ficheProduit =
    document.querySelector(".fiche-produit");

const fermerFiche =
    document.querySelector(".fermer-fiche");

const imageFiche =
    document.querySelector(".image-fiche");

const nomFiche =
    document.querySelector(".nom-fiche");

const descriptionFiche =
    document.querySelector(".description-fiche");

const prixFiche =
    document.querySelector(".prix-fiche");

const selectTaille =
    document.querySelector(".taille");

const inputQuantite =
    document.querySelector(".quantite");

const boutonAjouter =
    document.querySelector(".ajouter-panier");


// ==========================================
// 5. OUVRIR LA FICHE PRODUIT
// ==========================================

tousLesProduits.forEach(function(produit) {

    produit.addEventListener("click", function(event) {

        if (event.target.closest("a")) {
            return;
        }


        const produitSelectionne =
            event.currentTarget;


        const titre =
            produitSelectionne.querySelector("h3");

        const description =
            produitSelectionne.querySelector("p");

        const prixElement =
            produitSelectionne.querySelector(".prix");

        const imageElement =
            produitSelectionne.querySelector("img");


        if (
            !titre ||
            !description ||
            !prixElement ||
            !imageElement
        ) {

            return;

        }


        const nom =
            titre.textContent.trim();

        const descriptionTexte =
            description.textContent.trim();

        const prix =
            parseInt(
                prixElement.textContent
                    .replace(/\D/g, "")
            );

        const image =
            imageElement.src;


        nomFiche.textContent =
            nom;

        descriptionFiche.textContent =
            descriptionTexte;

        prixFiche.textContent =
            prix + " F";

        imageFiche.src =
            image;


        selectTaille.value =
            "";

        inputQuantite.value =
            1;


        boutonAjouter.dataset.nom =
            nom;

        boutonAjouter.dataset.prix =
            prix;

        boutonAjouter.dataset.image =
            image;


        ficheProduit.style.display =
            "flex";

    });

});


// ==========================================
// 6. FERMER LA FICHE
// ==========================================

if (fermerFiche) {

    fermerFiche.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();

            ficheProduit.style.display =
                "none";

        }
    );

}


// ==========================================
// 7. CLIQUER EN DEHORS DE LA FICHE
// ==========================================

if (ficheProduit) {

    ficheProduit.addEventListener(
        "click",
        function(event) {

            if (
                event.target === ficheProduit
            ) {

                ficheProduit.style.display =
                    "none";

            }

        }
    );

}


// ==========================================
// 8. AJOUTER AU PANIER
// ==========================================

if (boutonAjouter) {

    boutonAjouter.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();


            const nom =
                boutonAjouter.dataset.nom;

            const prix =
                Number(
                    boutonAjouter.dataset.prix
                );

            const image =
                boutonAjouter.dataset.image;

            const taille =
                selectTaille.value;

            const quantite =
                Number(
                    inputQuantite.value
                );


            if (
                !nom ||
                !prix ||
                !image
            ) {

                alert(
                    "Veuillez sélectionner un produit."
                );

                return;

            }


            if (taille === "") {

                alert(
                    "Veuillez choisir une taille."
                );

                return;

            }


            if (quantite < 1) {

                alert(
                    "La quantité doit être au moins de 1."
                );

                return;

            }


            const produitPanier = {

                nom: nom,

                prix: prix,

                image: image,

                taille: taille,

                quantite: quantite

            };


            panier.push(
                produitPanier
            );


            localStorage.setItem(
                "panierBJE",
                JSON.stringify(panier)
            );


            mettreAJourNombrePanier();


            alert(
                nom +
                " a été ajouté au panier !"
            );


            ficheProduit.style.display =
                "none";


            boutonAjouter.dataset.nom =
                "";

            boutonAjouter.dataset.prix =
                "";

            boutonAjouter.dataset.image =
                "";

            imageFiche.src =
                "";

            nomFiche.textContent =
                "";

            descriptionFiche.textContent =
                "";

            prixFiche.textContent =
                "";

            selectTaille.value =
                "";

            inputQuantite.value =
                1;

        }
    );

}


// ==========================================
// 9. ÉLÉMENTS DU PANIER
// ==========================================

const contenuPanier =
    document.querySelector(".contenu-panier");

const totalPanier =
    document.querySelector(".total-panier");

const boutonViderPanier =
    document.querySelector(".vider-panier");


// ==========================================
// 10. BOUTON PASSER LA COMMANDE
// ==========================================

const boutonCommande =
    document.querySelector(".bouton-commande");


if (boutonCommande) {

    boutonCommande.addEventListener(
        "click",
        function(event) {

            // Si le panier est vide
            if (panier.length === 0) {

                // Empêcher l'ouverture de commande.html
                event.preventDefault();

                alert(
                    "Votre panier est vide. Ajoutez d'abord un produit."
                );

                return;

            }

            // Si le panier contient un produit,
            // le lien vers commande.html fonctionne normalement.

        }
    );

}


// ==========================================
// 11. AFFICHER LE PANIER
// ==========================================

function afficherPanier() {

    if (!contenuPanier) {
        return;
    }


    contenuPanier.innerHTML =
        "";


    let total = 0;


    if (panier.length === 0) {

        contenuPanier.innerHTML = `
            <p>
                Votre panier est vide.
            </p>
        `;


        if (totalPanier) {

            totalPanier.textContent =
                "0 F";

        }

        return;

    }


    panier.forEach(
        function(produit, index) {

            const sousTotal =
                produit.prix *
                produit.quantite;


            total +=
                sousTotal;


            const article =
                document.createElement("div");


            article.classList.add(
                "article-panier"
            );


            article.innerHTML = `

                <img
                    src="${produit.image}"
                    alt="${produit.nom}"
                >

                <div>

                    <h3>
                        ${produit.nom}
                    </h3>

                    <p>
                        Taille :
                        ${produit.taille}
                    </p>

                    <p>
                        Quantité :

                        <input
                            type="number"
                            class="quantite-panier"
                            data-index="${index}"
                            value="${produit.quantite}"
                            min="1"
                        >

                    </p>

                    <p>
                        Prix :
                        ${produit.prix} F
                    </p>

                    <p>
                        Sous-total :
                        ${sousTotal} F
                    </p>

                    <button
                        class="supprimer-produit"
                        data-index="${index}"
                    >
                        Supprimer
                    </button>

                </div>

            `;


            contenuPanier.appendChild(
                article
            );

        }
    );


    if (totalPanier) {

        totalPanier.textContent =
            total + " F";

    }


    const boutonsSupprimer =
        document.querySelectorAll(
            ".supprimer-produit"
        );


    boutonsSupprimer.forEach(
        function(bouton) {

            bouton.addEventListener(
                "click",
                function() {

                    const index =
                        Number(
                            bouton.dataset.index
                        );


                    supprimerProduit(
                        index
                    );

                }
            );

        }
    );


    const champsQuantite =
        document.querySelectorAll(
            ".quantite-panier"
        );


    champsQuantite.forEach(
        function(champ) {

            champ.addEventListener(
                "change",
                function() {

                    const index =
                        Number(
                            champ.dataset.index
                        );


                    const nouvelleQuantite =
                        Number(
                            champ.value
                        );


                    if (
                        nouvelleQuantite < 1
                    ) {

                        champ.value =
                            1;

                        panier[index].quantite =
                            1;

                    }

                    else {

                        panier[index].quantite =
                            nouvelleQuantite;

                    }


                    localStorage.setItem(
                        "panierBJE",
                        JSON.stringify(panier)
                    );


                    mettreAJourNombrePanier();


                    afficherPanier();

                }
            );

        }
    );

}


// ==========================================
// 12. SUPPRIMER UN PRODUIT
// ==========================================

function supprimerProduit(index) {

    panier.splice(
        index,
        1
    );


    localStorage.setItem(
        "panierBJE",
        JSON.stringify(panier)
    );


    mettreAJourNombrePanier();


    afficherPanier();

}


// ==========================================
// 13. VIDER LE PANIER
// ==========================================

if (boutonViderPanier) {

    boutonViderPanier.addEventListener(
        "click",
        function() {

            if (panier.length === 0) {

                alert(
                    "Votre panier est déjà vide."
                );

                return;

            }


            const confirmation =
                confirm(
                    "Voulez-vous vraiment vider votre panier ?"
                );


            if (!confirmation) {

                return;

            }


            panier = [];


            localStorage.setItem(
                "panierBJE",
                JSON.stringify(panier)
            );


            mettreAJourNombrePanier();


            afficherPanier();


            alert(
                "Votre panier a été vidé."
            );

        }
    );

}


// ==========================================
// 14. ÉLÉMENTS DE LA COMMANDE
// ==========================================

const contenuCommande =
    document.querySelector(".contenu-commande");

const totalCommande =
    document.querySelector(".total-commande span");

const formulaireCommande =
    document.querySelector("#formulaire-commande");


// ==========================================
// 15. AFFICHER LA COMMANDE
// ==========================================

function afficherCommande() {

    if (!contenuCommande) {
        return;
    }


    contenuCommande.innerHTML =
        "";


    let total = 0;


    if (panier.length === 0) {

        contenuCommande.innerHTML = `
            <p>
                Votre panier est vide.
            </p>
        `;


        if (totalCommande) {

            totalCommande.textContent =
                "0 F";

        }

        return;

    }


    panier.forEach(function(produit) {

        const sousTotal =
            produit.prix *
            produit.quantite;


        total +=
            sousTotal;


        const article =
            document.createElement("div");


        article.classList.add(
            "article-commande"
        );


        article.innerHTML = `

            <img
                src="${produit.image}"
                alt="${produit.nom}"
            >

            <div>

                <h3>
                    ${produit.nom}
                </h3>

                <p>
                    Taille :
                    ${produit.taille}
                </p>

                <p>
                    Quantité :
                    ${produit.quantite}
                </p>

                <p>
                    Prix :
                    ${produit.prix} F
                </p>

                <p>
                    Sous-total :
                    ${sousTotal} F
                </p>

            </div>

        `;


        contenuCommande.appendChild(
            article
        );

    });


    if (totalCommande) {

        totalCommande.textContent =
            total + " F";

    }

}


// ==========================================
// 16. ENVOYER LA COMMANDE SUR WHATSAPP
// ==========================================

if (formulaireCommande) {

    formulaireCommande.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            // Vérifier le panier

            if (panier.length === 0) {

                alert(
                    "Votre panier est vide."
                );

                return;

            }


            // Informations du client

            const nom =
                document.querySelector(
                    "#nom-client"
                ).value.trim();


            const telephone =
                document.querySelector(
                    "#telephone-client"
                ).value.trim();


            const adresse =
                document.querySelector(
                    "#adresse-client"
                ).value.trim();


            const commentaire =
                document.querySelector(
                    "#commentaire-client"
                ).value.trim();


            // Vérifier les champs obligatoires

            if (
                !nom ||
                !telephone ||
                !adresse
            ) {

                alert(
                    "Veuillez remplir tous les champs obligatoires."
                );

                return;

            }


            // Construire le message

            let message =
                "🛍️ *NOUVELLE COMMANDE BJE*";


            message +=
                "\n━━━━━━━━━━━━━━━━━━";


            message +=
                "\n👤 *Client :* " +
                nom;


            message +=
                "\n📞 *Téléphone :* " +
                telephone;


            message +=
                "\n📍 *Adresse de livraison :* " +
                adresse;


            if (commentaire !== "") {

                message +=
                    "\n📝 *Commentaire :* " +
                    commentaire;

            }


            message +=
                "\n\n🛒 *ARTICLES COMMANDÉS*";


            message +=
                "\n━━━━━━━━━━━━━━━━━━";


            let total = 0;


            panier.forEach(function(produit, index) {

                const sousTotal =
                    produit.prix *
                    produit.quantite;


                total +=
                    sousTotal;


                message +=
                    "\n\n🔹 *Article " +
                    (index + 1) +
                    "*";


                message +=
                    "\nProduit : " +
                    produit.nom;


                message +=
                    "\nTaille : " +
                    produit.taille;


                message +=
                    "\nQuantité : " +
                    produit.quantite;


                message +=
                    "\nPrix unitaire : " +
                    produit.prix +
                    " F";


                message +=
                    "\nSous-total : " +
                    sousTotal +
                    " F";

            });


            message +=
                "\n\n━━━━━━━━━━━━━━━━━━";


            message +=
                "\n💰 *TOTAL : " +
                total +
                " F*";


            message +=
                "\n━━━━━━━━━━━━━━━━━━";


            message +=
                "\n\nMerci pour votre confiance. 🙏";


            // Numéro WhatsApp BJE

            const numeroWhatsApp =
                "221781473815";


            // Créer le lien WhatsApp

            const lienWhatsApp =
                "https://wa.me/" +
                numeroWhatsApp +
                "?text=" +
                encodeURIComponent(message);


            // Ouvrir WhatsApp

            window.open(
                lienWhatsApp,
                "_blank"
            );

        }
    );

}


// ==========================================
// 17. AFFICHAGE INITIAL
// ==========================================

afficherPanier();

afficherCommande();

mettreAJourNombrePanier();