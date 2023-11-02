const { GRAwardsService } = require("../service/GRAwardsService");

class GRAwardsController
{
    findAll(req, res)
    {
        (new GRAwardsService).findAllWinners()
        .then((producerWinners) => {
            res.status(200)
            .send(producerWinners);
        })
        .catch((err) => {
            res.status(500)
            .send({
                error: err.error,
                message: err.message
            })
        });
    }
};

module.exports = {
    GRAwardsController
};