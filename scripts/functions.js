function updateAllDisplays() {
    // updates queen population
    counts.populations.queen.element.textContent = `Queen: ${counts.populations.queen.count}`;
    // updates queen box name
    box.queen.boxNameElement.innerHTML= `Queen ${counts.populations.queen.count}`;
    // updates worker population
    counts.populations.worker.element.textContent = `Workers: ${format(counts.populations.worker.count)}`;
     // updates worker box name
    box.worker.boxNameElement.innerHTML = `Worker ${format(counts.populations.worker.count)}`;
    // updates nectar count
    counts.ingredients.nectar.element.textContent = `Nectar: ${format(counts.ingredients.nectar.count.toFixed(1))}`;
    // updates pollen count
    counts.ingredients.pollen.element.textContent = `Pollen: ${format(counts.ingredients.pollen.count.toFixed(1))}`;
    // updates nectarPerSecond in worker box
    counts.populations.worker.nectarPerSecond.element.innerHTML = `Nectar: +${format(counts.populations.worker.nectarPerSecond.count)}/s`;
    // updates pollenPerSecond in worker box
    counts.populations.worker.pollenPerSecond.element.innerHTML = `Pollen: +${format(counts.populations.worker.pollenPerSecond.count)}/s`;
    // updates gotNectar in worker box button
    box.worker.boxButtons.gotNectars.element.textContent = `${format(counts.populations.worker.nectarPerSecond.gotNectar.toFixed(1))} Nectars`;
    // updates gotNectar in worker box button
    box.worker.boxButtons.gotPollens.element.textContent = `${format(counts.populations.worker.pollenPerSecond.gotPollen.toFixed(1))} Pollens`;
}

function increaseButtonAmount(multi, cost) {
    let newCost = multi * cost
    return newCost;
}

// increases the amount of action in a button
function increaseAmount() {
    multi = {
      1: 5,
      5: 10,
      10: 50,
      50: 100,
      100: 1000,
      1000: "Ma",
      Ma: 1
    }[multi];
    box.queen.boxButtons.produce.element.textContent = (multi === "Ma") ? `Spawn Worker ${multi}x` : `Spawn Worker ${multi}x`
    document.getElementById("multiplierButton").textContent = (multi === "Ma") ? `${multi}x` : `${multi}x`
  }

  //converting to the Amount of the min-Max
function applyAmount(currencyCount, baseCosts, multi) {
    let roundedValue = Math.floor(currencyCount / 10) * 10;
    let newCosts = ((multi === "Ma") ? ((roundedValue == 0) ? baseCosts : roundedValue) : (multi*baseCosts))
    return newCosts;
}

//apply shake to buttons when clicked if error and put insuficient type of product in the button.
function applyShakeButton(buttonElement) {
    buttonElement.classList.add('shake');
    setInterval(function() {
        buttonElement.addEventListener('animationend', function() {
            this.classList.remove('shake');
          });
    }, 500);
}