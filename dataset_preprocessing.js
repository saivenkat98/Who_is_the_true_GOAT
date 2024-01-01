function preprocessData(callback) {

d3.csv("datasets/main.csv").then(data => {
    // Preprocessing: removing unnecessary columns
    data.forEach(d => {
        delete d[""];
        delete d.Pos;
        delete d.Age;
        delete d.Tm;
        delete d.GS;
        delete d.MP;
        
    });

    // Group the players
    const groupedPlayers = new Map();
    data.forEach(d => {
        const playerName = d.Player;
        if (groupedPlayers.has(playerName)) {
            groupedPlayers.get(playerName).push(d);
        } else {
            groupedPlayers.set(playerName, [d]);
        }
    });

    // Remove players with fewer than 10 seasons
    groupedPlayers.forEach((value, key) => {
        if (value.length < 10) {
            groupedPlayers.delete(key);
        }
    });

    // Remove players with any null attribute values
    groupedPlayers.forEach((seasons, playerName) => {
        for (const season of seasons) {
            let hasNullValue = false;
            for (const attribute in season) {
                if (season[attribute] === null || season[attribute] === "") {
                    hasNullValue = true;
                    break;
                }
            }
            if (hasNullValue) {
                groupedPlayers.delete(playerName);
                break;
            }
        }
    });
    callback(groupedPlayers);
    
});


}

export { preprocessData };