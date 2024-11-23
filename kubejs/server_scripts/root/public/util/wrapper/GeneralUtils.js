const GeneralUtils = {
    /**
     * 
     * @param {Map<T, number>} weightMap 
     * @param {Internal.RandomSource} random 
     */
    getRandomEntry: function (weightMap, random) {
        let totalWeight = 0.0;
        let arrayPair = Array.from(weightMap.entries()).map(entry => new $Pair(entry[0], entry[1]));
        for (const pair of arrayPair) {
            totalWeight += pair.getSecond()
        }

        let index = 0;
        for (let randomWeightPicked = random.nextFloat() * totalWeight; index < arrayPair.length - 1; index++) {
            randomWeightPicked -= arrayPair[index].getSecond();
            if (randomWeightPicked <= 0.0) break;
        }

        return arrayPair[index].getFirst();

    }
}

