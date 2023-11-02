const MovieORM = require("../models/Movie");

class GRAwardsService
{

    // Step-3: Now we build the Min and Max Objects
    _buildMinMaxObjects(winnersInformationData)
    {
        winnersInformationData.sort((a, b) => {
            return ((a.interval > b.interval) ? 1: -1);
        });

        return {
            "min": winnersInformationData.filter(winnerData => winnerData.interval == winnersInformationData[0].interval),
            "max": winnersInformationData.filter(winnerData => winnerData.interval == winnersInformationData[winnersInformationData.length-1].interval),
        };
    }

    // Step-2: Build winner info based on producerData
    _buildWinnersInformation(producersData)
    {
        let winnersInformationData = [];
        Object.keys(producersData).forEach(producerName => {
            let firstWin = 0;
            producersData[producerName].yearsParticipated.forEach((yearAwarded) => {
                if(firstWin) {
                    winnersInformationData.push({
                        "producer": producerName,
                        "interval": yearAwarded - firstWin,
                        "previousWin": firstWin,
                        "followingWin": yearAwarded
                    });
                }
                firstWin = yearAwarded;
            });
        });
        return winnersInformationData;
    }

    // Step-1: Build the producers data to work on it
    _buildProducersData(movieListData)
    {
        let producersData = [];
        movieListData.forEach((rowData) => {
            rowData.producers.forEach((producerName) => {
                let trimmedProducerName = producerName.trim();
                if(producersData[`${trimmedProducerName}`] === undefined) {
                    producersData[`${trimmedProducerName}`] = {
                        'name': trimmedProducerName,
                        'awardsCounter': 0,
                        'yearsWinner': [],
                        'yearsParticipated': []
                    };
                }
                producersData[`${trimmedProducerName}`]['yearsParticipated'].push(parseInt(rowData.year));
                if(rowData.winner) {
                    producersData[`${trimmedProducerName}`]['awardsCounter'] += 1;
                    producersData[`${trimmedProducerName}`]['yearsWinner'].push(parseInt(rowData.year));
                }
            });
        });
        return producersData;
    }

    findAllWinners()
    {
        return new Promise(async (resolve, reject) => {
            try {
                const movieList = await MovieORM.findAll({
                    where: {
                        winner: true
                    },
                    order: [
                        ["year", "ASC"]
                    ]
                });
                const producersData = this._buildProducersData(movieList);
                const winnersInfoData = this._buildWinnersInformation(producersData);
                const minMaxInfoData = this._buildMinMaxObjects(winnersInfoData);
                resolve(minMaxInfoData);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
};

module.exports = {
    GRAwardsService
};