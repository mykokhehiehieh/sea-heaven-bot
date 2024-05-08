
const fishes = [
    {name: "Ikan Bilis", id: "ikanBilis", spawnRate: 0.1, dieChance: 0.4, tokenDrop: 1},
    {name: "Tilapia", id: "tilapia", spawnRate: 0.1, dieChance: 0.33, tokenDrop: 1.5},
    {name: "Starfish", id: "starfish", spawnRate: 0.07, dieChance: 0.25, tokenDrop: 2},
    {name: "Seahorse", id: "seahorse", spawnRate: 0.07, dieChance: 0.25, tokenDrop: 2},
    {name: "Lobster", id: "lobster", spawnRate: 0.065, dieChance: 0.23, tokenDrop: 2.5},
    {name: "Jellyfish", id: "jellyfish", spawnRate: 0.065, dieChance: 0.23, tokenDrop: 2.5},
    {name: "Flying fish", id: "flyingFish", spawnRate: 0.06, dieChance: 0.2, tokenDrop: 4},
    {name: "Turtle", id: "turtle", spawnRate: 0.06, dieChance: 0.2, tokenDrop: 4},
    {name: "Stingray", id: "stingray", spawnRate: 0.053, dieChance: 0.15, tokenDrop: 5},
    {name: "Fossil", id: "fossil", spawnRate: 0.054, dieChance: 0.15, tokenDrop: 5},
    {name: "Squid", id: "squid", spawnRate: 0.05, dieChance: 0.14, tokenDrop: 6},
    {name: "Lionfish", id: "lionfish", spawnRate: 0.05, dieChance: 0.13, tokenDrop: 7.5},
    {name: "Sunfish", id: "sunfish", spawnRate: 0.05, dieChance: 0.1, tokenDrop: 9},
    {name: "Anglerfish", id: "anglerfish", spawnRate: 0.05, dieChance: 0.08, tokenDrop: 10},
    {name: "Pink one", id: "pinkOne", spawnRate: 0.02, dieChance: 0.06, tokenDrop: 12.5},
    {name: "Crocodile", id: "crocodile", spawnRate: 0.02, dieChance: 0.04, tokenDrop: 15},
    {name: "Hammerfish", id: "hammerfish", spawnRate: 0.02, dieChance: 0.02, tokenDrop: 20},
    {name: "Dolphin", id: "dolphin", spawnRate: 0.02, dieChance: 0.01, tokenDrop: 25},
    {name: "Blue Whale", id: "blueWhale", spawnRate: 0.01, dieChance: 0.005, tokenDrop: 50},
    {name: "Red Whale", id: "redWhale", spawnRate: 0.008, dieChance: 0.003},
    {name: "Gold Whale", id: "goldWhale", spawnRate: 0.005, dieChance: 0.001}
];

const special = [
    {name: "Pufferfish", id: "pufferfish", spawnRate: 0.7, dieChance: 0.003},
    {name: "Electric Ball", id: "electricBall", spawnRate: 0.7, dieChance: 0.002},
    {name: "Octopus", id: "octopus", spawnRate: 0.7, dieChance: 0.0005},
    {name: "Piranha", id: "piranha", spawnRate: 0.7, dieChance: 0.0005}
];

const aoe = 5;
const MAX_TOKEN = 10;
const dmg = 1;
const luckyFishRate = 0.001;
piranhaToken = 100;
field = [];

function shoot(player, token, target){
    totalTokens = 0;
    if (token == null || token > MAX_TOKEN){
        token = MAX_TOKEN;
    }
    killMessage = [`Tokens spent: ${token}` , "__You have killed:__"];
    for (a = 0; a < token; a++){
        if (0.1 > Math.random()){
            piranhaToken += getRndInteger(10, 30);
            if (piranhaToken >= 300){
                piranhaToken = 300;
            }
        }
        hitList = generateHitList(aoe, target);
        //console.log(hitList);
        killList = generateKillList(hitList);
        //console.log(killList);
        if (killList.length > 0){
            extra = [];
            for (j = 0; j < killList.length; j++){
                if (field[killList[j]].id == "redWhale" || field[killList[j]].id == "goldWhale"){
                    whaleToken = (field[killList[j]].id == "redWhale") ? 50 : 150;
                    loops = (field[killList[j]].id == "redWhale") ? 4 : 6;
                    for (b = 0; b < loops; b++){
                        if (0.75 > Math.random()){
                            whaleToken += 25;
                        } else {
                            break;
                        }
                    }
                    if (luckyFishRate > Math.random()){
                        luckyFishMultiplier = luckyFish();
                        tokenGet = whaleToken * luckyFishMultiplier;
                        killMessage.push(`**${field[killList[j]].name}: Lucky Fish x${luckyFishMultiplier} ${tokenGet}x Token**`); 
                    } else{
                        tokenGet = whaleToken;
                        killMessage.push(`**${field[killList[j]].name} ${tokenGet}x Token**`);
                    }
                    totalTokens += tokenGet;
                } else if (field[killList[j]].id == "pufferfish"){
                    if (0.1 > Math.random()){
                        extra.push("pufferfish");
                    } else {
                        totalTokens += 25;
                        killMessage.push(`${field[killList[j]].name} 25x Token`);
                    }
                } else if (field[killList[j]].id == "octopus"){
                    extra.push("octopus");
                } else if (field[killList[j]].id == "electricBall"){
                    extra.push("electricBall");
                } else if (field[killList[j]].id == "piranha"){
                    if (luckyFishRate > Math.random()){
                        luckyFishMultiplier = luckyFish();
                        tokenGet = piranhaToken * luckyFishMultiplier;
                        totalTokens += tokenGet;
                        killMessage.push(`**${field[killList[j]].name}: Lucky Fish x${luckyFishMultiplier} ${tokenGet}x Token**`);
                    } else {
                        totalTokens += piranhaToken;
                        killMessage.push(`**${field[killList[j]].name} ${piranhaToken}x Token**`);
                    }
                    piranhaToken = 100;
                } else {
                    if (luckyFishRate > Math.random()){
                        luckyFishMultiplier = luckyFish();
                        tokenGet = field[killList[j]].tokenDrop * luckyFishMultiplier;
                        totalTokens += tokenGet;
                        killMessage.push(`${field[killList[j]].name}: Lucky Fish x${luckyFishMultiplier} ${tokenGet}x Token`);
                    } else {
                        totalTokens += field[killList[j]].tokenDrop;
                        killMessage.push(`${field[killList[j]].name} ${field[killList[j]].tokenDrop}x Token`);
                    }
                }
            }
            newField = [];
            for (k = 0; k < field.length; k++){
                if (!killList.includes(k)){
                    newField.push(field[k]);
                }
            }
            field = newField;
        }
    }
    if (killMessage.length == 2){
        killMessage.push("Nothing......");
        return killMessage.join("\n");
    } else {
        killMessage.push(`**Total: ${totalTokens} Token**`);
        return killMessage.join("\n");
    }
}

function refresh(){
    field = [];
    for (i = 0; i < 100; i++){
        field.push(spawnAttempt());
    }
    special.forEach(fish => {
        if (fish.spawnRate > Math.random()){
            field.push(fish);
        }
    });
    console.log(`Field refreshed with ${field.length} fishes`);
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

function spawnAttempt(){
    while (true){
        fishChoice = getRndInteger(0, fishes.length);
        if (fishes[fishChoice].spawnRate > Math.random()){
            return fishes[fishChoice];
        }
    }
}

function countField(array){
    const counter = {};
    
    array.forEach(ele => {
        if (counter[ele.name]) {
            counter[ele.name] += 1;
        } else {
            counter[ele.name] = 1;
        }
    })
    return counter;
}

function count(array, itemId){
    itemCount = 0;
    array.forEach(element => {
        if (element.id == itemId){
            itemCount++;
        }
    })
    return itemCount;
}

function generateHitList(aoe, target){
    hitList = [];
    targetLeft = aoe;
    if (aoe >= field.length){
        for (i = 0; i < field.length; i++){
            hitList.push(i);
        }
        return hitList;
    }
    if (target != null){
        if (aoe >= count(field, target)){
            for (i = 0; i < field.length; i++){
                if (field[i].id == target){
                    hitList.push(i);
                    targetLeft--;
                }
            }
            while (targetLeft > 0){
                hitTarget = getRndInteger(0, field.length);
                if (!hitList.includes(hitTarget)){
                    hitList.push(hitTarget);
                    targetLeft--;
                }
            }
            
        } else {
            while (targetLeft > 0){
                hitTarget = getRndInteger(0, field.length);
                if (field[hitTarget].id == target && !hitList.includes(hitTarget)){
                    hitList.push(hitTarget);
                    targetLeft--;
                }
            }
        }
    } else {
        while (targetLeft > 0){
            hitTarget = getRndInteger(0, field.length);
            if (!hitList.includes(hitTarget)){
                hitList.push(hitTarget);
                targetLeft--;
            }
        }
    }
    return hitList;
}

function generateKillList(hitList){
    killList = [];
    for (i = 0; i < hitList.length; i++){
        if (field[hitList[i]].dieChance * dmg > Math.random()){
            killList.push(hitList[i]);
        }
    }
    return killList;
}

function fieldMessage(){
    message = ["Fishes in the field:"];
    for (i = 0; i < fishes.length; i++){
        if (field.includes(fishes[i])){
            message.push(fishes[i].name + " x" + count(field, fishes[i].id));
        }
    }
    for (i = 0; i < special.length; i++){
        if (field.includes(special[i])){
            if (special[i].id == "piranha"){
                message.push(special[i].name + ` [${piranhaToken}]`);
            } else {
                message.push(special[i].name + " x" + count(field, special[i].id));
            }
        }
    }
    return message.join("\n");
}

function luckyFish(){
    if (0.2 > Math.random()){
        if (0.05 > Math.random()){
            if (0.01 > Math.random()){
                return 10;
            }
            return 5;
        }
        return 3;
    }
    return 2;
}

module.exports = { fieldMessage, shoot, refresh};