//variables for counters
const counts = {
    populations: {
        queen: {
            count: 1,
            element: document.getElementById("queenCount"),
        },
        worker: {
            count: 0,
            element: document.getElementById("workerCount"),
            nectarPerSecond: {
                count: 0,
                gotNectar: 0,
                element: document.getElementById("nectarsPerSecond"),
            },
            pollenPerSecond: {
                count: 0,
                gotPollen: 0,
                element: document.getElementById("pollensPerSecond"),
            },
        },
    },
    ingredients: {
        nectar: {
            count: 0,
            element: document.getElementById("nectarCount"),
        },
        pollen: {
            count: 0,
            element: document.getElementById("pollenCount"),
        },
        honey: {
            count: 0,
            element: document.getElementById("honeyCount"),
        },
    },
    materials: {
        beeswax: {
            count: 0,
            element: document.getElementById("beeswaxrCount"),
        },
        royalJelly: {
            count: 0,
            element: document.getElementById("royalJellyCount"),
        },
    },
    buildings: {
        honeyComb: {
            count: 0,
            element: document.getElementById("honeyCombCount"),
        },
    },
    hives: {
        hive: {
            count: 0,
            element: document.getElementById("hiveCount"),
        },
    },
}

var multi = 1;

//variables for the contents inside the Boxes
const box = {
    queen: {
        boxElement: document.getElementById("queenBox"),
        boxNameElement: document.getElementById("queenBeeName"),
        boxInfoElement: document.getElementById("queenBoxInfo"),
        boxButtons: {
            eatRoyal: { 
                element: document.getElementById("eatRoyalJellyButton"),
                function: () => { // beeBox.queen.boxButtons.eatRoyal.function()
                    box.queen.boxInfoElement.classList.remove("hidden");
                    box.queen.boxButtons.eatRoyal.element.classList.add("hidden");
                    box.queen.boxButtons.work.element.classList.remove("hidden");
                    box.queen.boxButtons.produce.element.classList.remove("hidden");
                    document.getElementById("queenOthers").classList.add("hidden");
                    updateAllDisplays()
                },
            },
            work: {
                element: document.getElementById("queenWorkButton"),
                function: () => {
                    counts.ingredients.nectar.count++;
                    document.getElementById("ingredients").classList.remove("hidden");
                    document.getElementById("nectarCountSpan").classList.remove("hidden");
                    updateAllDisplays()
                },
            },
            produce: {
                element: document.getElementById("queenProduceButton"),
                function: () => {
                    let newCosts = applyAmount(counts.ingredients.nectar.count, 10, multi);
                    if (counts.ingredients.nectar.count >= newCosts) {
                        counts.ingredients.nectar.count -= newCosts;
                        counts.populations.worker.count += (newCosts/10);
                        let newNps = counts.populations.worker.count * 0.1;
                        counts.populations.worker.nectarPerSecond.count = parseFloat(newNps.toFixed(2));
                        let newPps = counts.populations.worker.count * 0.01;
                        counts.populations.worker.pollenPerSecond.count = parseFloat(newPps.toFixed(3));
                        box.worker.boxButtons.gotNectars.allowProduction = true;
                        box.worker.boxElement.classList.remove("hidden");//opens the worker bee box
                        document.getElementById("populations").classList.remove("hidden");
                        document.getElementById("workerCountSpan").classList.remove("hidden");
                        updateAllDisplays()
                    } else {
                        applyShakeButton(box.queen.boxButtons.produce.element)
                        box.queen.boxButtons.produce.element.textContent = `Need ${parseFloat((newCosts - counts.ingredients.nectar.count).toFixed(1))} More Nectars`
                        setTimeout(function() {
                            box.queen.boxButtons.produce.element.textContent = (multi === "Ma") ? `Spawn Worker ${multi}x` : `Spawn Worker ${multi}x`
                          }, 1000);
                        console.log(`Insufficient Nectar, Need ${newCosts - counts.ingredients.nectar.count} More`)
                    }
                },
            },
        },
    },
    worker: {
        boxElement: document.getElementById("workerBox"),
        boxNameElement: document.getElementById("workerBeeName"),
        boxInfoElement: document.getElementById("workerBoxInfo"),
        generateProduct: () => {
            if (box.worker.boxButtons.gotNectars.allowProduction == true) {
                    counts.populations.worker.nectarPerSecond.gotNectar += counts.populations.worker.nectarPerSecond.count;
                    counts.populations.worker.pollenPerSecond.gotPollen += counts.populations.worker.pollenPerSecond.count;
                    updateAllDisplays()
                }
        },
        boxButtons: {
            gotNectars: { 
                allowProduction: false,
                element: document.getElementById("collectNectarsButton"),
                collect: () => {
                    counts.ingredients.nectar.count += counts.populations.worker.nectarPerSecond.gotNectar;
                    counts.populations.worker.nectarPerSecond.gotNectar = 0;
                    updateAllDisplays()
                } ,
            } ,
            gotPollens: { 
                element: document.getElementById("collectPollensButton"),
                collect: () => {
                    counts.ingredients.pollen.count += counts.populations.worker.pollenPerSecond.gotPollen;
                    counts.populations.worker.pollenPerSecond.gotPollen = 0;
                    document.getElementById("pollenCountSpan").classList.remove("hidden");
                    updateAllDisplays()
                } ,
            } ,
        },
    },
}