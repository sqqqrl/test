const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const askQuestion = (questionText) => {
    return new Promise((resolve, reject) => {
        rl.question(questionText, (input) => resolve(input))
    })
}

(async () => {
    const playersCount = await askQuestion('How many players do you need? ')
    const totalAmount = await askQuestion('How many dollars to the player? ')

    console.log('---------------')
    console.log(`
        Players: ${playersCount},
        Amount of money for each player: ${totalAmount}
    `)
    console.log('---------------')


    const winner = start(playersCount, totalAmount)
    

    console.log('----------------------')
    console.log(`Winner id: ${winner.id}`)
    console.log({ winner })
    console.log('----------------------')
})()

const initPlayer = (id, totalAmount) => {
    return {
        id: id,
        money: totalAmount
    }
}

function start(playersCount, totalAmount) {
    let players = new Array(Number(playersCount))

    for (let i = 0; i < players.length; i++) {
        players[i] = initPlayer(i, Number(totalAmount))
    }

    while (players.length !== 1) {
        const firstPlayer = getRandomInt(players.length, 0)
        let secondPlayer = getRandomInt(players.length, 0)

        while (firstPlayer === secondPlayer) {
            secondPlayer = getRandomInt(players.length, 0)
        }

        const firstPlayerSelectedSide = !!getRandomInt(2, 0)
        const coinSide = !!getRandomInt(2, 0)

        if (firstPlayerSelectedSide === coinSide) {
            players = modifyArray(players, firstPlayer, secondPlayer)
        } else {
            players = modifyArray(players, secondPlayer, firstPlayer)
        }
    }

    return players[0]
}

function modifyArray(players, winner, loser) {
    players[winner].money++
    players[loser].money--

    if (players[loser].money === 0) {
        return players.filter(el => el.money > 0)
    }

    return players
}

function getRandomInt(max, min) {
    return Math.floor(Math.random() * (max - min) + min)
}
