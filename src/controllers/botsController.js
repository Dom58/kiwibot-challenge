import firestore from '../db.js';



/**
 * Bot Controllers
*/
export default class BotController {
    /**
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} bots object
    */
    static async createBot(req, res) {
        const data = req.body;
        const newData = {
            ...data,
            created_at: new Date()
        }

        firestore.collection('bots')
                .add(await newData)
                .then(response => {
                    const retrievedData = newData;
                    retrievedData.id = response.id;
                    return res.status(201).json({
                        message: 'Bot created successfully!',
                        data: retrievedData
                    })
                })
                .catch(err => {
                    console.log('====err====>', err);
                    return res.json({
                        error: 'something went wrong!'
                    });
                });
    }

    /**
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} bots object
    */
    static async getAllBots(req, res) {
        let responseData = [];
        firestore.collection('bots')
            .orderBy('created_at', 'desc')
            .get()
            .then(data => {
                if (data.empty) {
                    return res.status(404).json({
                        error: 'No bot created yet!'
                    });
                } else {
                    data.forEach(doc => {
                        responseData.push({
                            id: doc.id,
                            status: doc.data().status,
                            location: doc.data().location,
                            zone_id: doc.data().zone_id,
                            created_at: doc.data().created_at,
                        });
                    });
                    return res.status(200).json({ 
                        message: 'Bots retrieved successfully',
                        data: responseData
                    });
                }
            })
            .catch(err => console.log('====err====>', err));
    }

    /**
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} return bot object data
    */
    static async getBot(req, res) {
        try {
            const { id } = req.params;
            const findBot = await firestore.collection('bots').doc(id);

            const data = await findBot.get();

            if(!data.exists) {
                return res.status(404).json({
                    error: `Bot with ${id} ID not found!`
                });
            } else {
                return res.status(200).json({
                    data: data.data()
                });
            } 
        } catch (error) {
            return res.status(400).json({
                error: error.message
            });
        }
    };

    /**
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} return object message
    */
     static async updateBot(req, res) {
        try {
            const { id } = req.params;
            const {
                status,
                zone_id,
                location
            } = req.body;

            const findBot = await firestore.collection('bots').doc(id);
            const data = await findBot.get();

            if(!data.exists) {
                return res.status(404).json({
                    error: `Bot with ${id} ID not found!`
                });
            } else {
                const dataInfo = {
                    status: status  || findBot.status,
                    zone_id: zone_id  || findBot.status,
                    location: location  || findBot.location,
                };

                await findBot.update(dataInfo);

                return res.status(200).json({
                    message: 'Bot updated successfully!'
                });
            } 
        } catch (error) {
            return res.status(400).json({
                error: error.message
            });
        }
    };

    /**
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} return object message
    */
     static async deleteBot(req, res) {
        try {
            const { id } = req.params;
            const findBot = await firestore.collection('bots').doc(id);
            const data = await findBot.get();

            if(!data.exists) {
                return res.status(404).json({
                    error: `Bot with ${id} ID not found!`
                });
            } else {
                await findBot.delete();

                return res.status(200).json({
                    message: 'Bot deleted successfully!'
                });
            } 
        } catch (error) {
            return res.status(400).json({
                error: error.message
            });
        }
    };
}
