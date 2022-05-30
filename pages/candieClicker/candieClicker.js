        // candy counter and get candy button
        let candyAmount = 0;
        let lollypopAmount = 0;
        let candyGeneratorMultiplier = 0;
        let candyGeneratorSpeed = 1000;

        const container = document.querySelector(".container")
        const candyCount = document.querySelector(".candyCount");

        const buttons = document.querySelector(".buttons");  

        const candyGeneratorDisplay = document.querySelector(".candyGeneratorDisplay")
        const lollypopDisplay = document.querySelector(".lollypops");
        const alerts = document.querySelector(".alerts");

        //setup
        candyGeneratorDisplay.innerHTML = `Candy Genarator: ${candyGeneratorMultiplier} candies/${candyGeneratorSpeed/1000}second for every 10 lollypop`

        // button events
        buttons.addEventListener("click", (event) =>{
            
            // console.log(event.target);

            let buttonClass = event.target.className ;

            if(event.shiftKey === true && buttonClass === "getCandy"){
                addCandy(99);
            }

            if (buttonClass === "getCandy") addCandy(1);
            if (buttonClass === "buyLollypop") buyLollypop();
            if (buttonClass === "makeItRain") makeItRain();


            //display
            candyGeneratorDisplay.innerHTML = `Candy Genarator: ${candyGeneratorMultiplier} candies/${candyGeneratorSpeed/1000}second for every 10 lollypop`
            candyCount.innerHTML = `Candies Amount: ${candyAmount}`
            lollypopDisplay.innerHTML = "🍭".repeat(lollypopAmount)

        })

        // events

        candyGenerator() // generate candy: starts with 1*0

        setInterval( ()=> { // update candy display 
            candyCount.innerHTML = `Candies Amount: ${candyAmount}`
            if (candyAmount >= 10000) {
                container.innerHTML = "YOU WON"
            }
        }, candyGenerator)

        // help and win screens
        const helpButton = document.querySelector(".helpButton");
        const helpWindow = document.querySelector(".helpWindow");

        helpButton.addEventListener("click", () => {
            helpWindow.classList.toggle("hidden")
        })

        helpWindow.addEventListener("click", () => {
            helpWindow.classList.toggle("hidden")
        })

        // functions
        // add 1 new candy button
        function addCandy(amount) {
            candyAmount += amount;
            alertsUpdate(`+ candy`,"green")
            
        }

        // but lollypop button
        function buyLollypop() {
            if(candyAmount >= 100) {
                lollypopAmount += 1;
                candyAmount -= 100;
                addLollypop()
                alertsUpdate("bought lollypop","green")
            } else {
                alertsUpdate(`!!!! not enough candy !!!!`,"red")
            }
        }

        // add lollypop to display, check if have 10, adjust generator
        function addLollypop() {


            if (lollypopAmount%10 === 0) {
                candyGeneratorMultiplier++
                // console.log(candyGeneratorMultiplier)
            }


        }

        // candy generator
        function candyGenerator() {
            candyAmount += 1*candyGeneratorMultiplier
            setTimeout(candyGenerator,candyGeneratorSpeed)
        }

        // makeItRain candy generation speed x10
        let rainAmount = 0
        function makeItRain() {

            if (rainAmount <= 2) {
                if (lollypopAmount>=20) {
                    candyGeneratorSpeed /=10
                    lollypopAmount-=20
                    candyGeneratorMultiplier -=2
                    // console.log(candyGeneratorMultiplier)
                    alertsUpdate("made it rain !!!","green")
                    rainAmount++
    
                } else {
                    alertsUpdate("!!!! not enough lollypops !!!!","red")
                }
            } else {
                alertsUpdate("!!!! You can only make it rain 3 times sorry !!!!","red")
            }

        }

        function alertsUpdate(message,color) {
            alerts.innerHTML = message
            if(color === "green") {
                alerts.classList.add("green")
                alerts.classList.remove("red")
            } 
            if(color === "red") {
            alerts.classList.add("red")
                alerts.classList.remove("green")
            }
        }
