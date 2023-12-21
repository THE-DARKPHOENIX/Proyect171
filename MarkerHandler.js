AFRAME.registerComponent("markerhandler",{
    init: async function() {
        this.el.addEventListener("markerFound", ()=>{
            console.log("Se encontró el marcador");
            this.handlerMarkerFound();
        }),
        this.el.addEventListener("markerLost", ()=> {
            console.log("Se perdió el marcador");
            this.handlerMarkerLost();
        })
    },
    handlerMarkerFound: function(){
        var buttonDiv = document.getElementById("button-div");
        buttonDiv.style.display = "flex";

        var orderButton = document.getElementById("order-button");
        var orderSummaryButton = document.getElementById("order-summary-button");

        orderButton.addEventListener("click", () => {
            swal({
                icon: "",
                title: "¡Gracias por tu orden!",
                text: "",
                timer: 2000,
                buttons: false
            });
        });

        orderSummaryButton.addEventListener("click", () => {
            swal({
                icon: "warning",
                title: "Resumen de la orden",
                text: "Operacion en curso",
            });
        });
        
    },
    handleMarkerLost: function () {
        
        var buttonDiv = document.getElementById("button-div");
        buttonDiv.style.display = "none";
    },
    getAllToys: async function(){
        return await firebase
          .firestore()
          .collection("toys")
          .get()
          .then(snap => {
            return snap.docs.map(doc => doc.data());
          });
    },
    handleOrder: function (uid, toy) {
        
        firebase
          .firestore()
          .collection("users")
          .doc(tNumber)
          .get()
          .then(doc => {
            var details = doc.data();
    
            if (details["current_orders"][toy.id]) {
              
              details["current_orders"][toy.id]["quantity"] += 1;
    
              
              var currentQuantity = details["current_orders"][toy.id]["quantity"];
    
              details["current_orders"][dish.id]["subtotal"] =
                currentQuantity * toy.price;
            } else {
              details["current_orders"][dish.id] = {
                item: toys.toys_name,
                price: toy.price,
                quantity: 1,
                subtotal: toy.price * 1
              };
            }
    
            details.total_bill += toy.price;
    
            
            firebase
              .firestore()
              .collection("users")
              .doc(doc.id)
              .update(details);
          });
      }, 
      askUserld: function () {
        var iconUrl = "https://raw.githubusercontent.com/whitehatjr/menu-card-app/main/hunger.png";
        swal({
          title: "¡¡Bienvenido!!",
          icon: iconUrl,
          content: {
            element: "input",
            attributes: {
              placeholder: "Escribe tu juguete",
              type: "array",
              min: 1
            }
          },
          closeOnClickOutside: false,
        }).then(inputValue => {
            toys_name = inputValue;
          });
        },
})