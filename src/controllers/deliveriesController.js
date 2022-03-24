import firestore from '../db.js';

/**
 * Delivery Controllers
*/
export default class DeliveryController {
    /**
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} Deliveries object
    */
    static async createDelivery(req, res) {
        const data = req.body;
        const newData = {
            ...data,
            created_at: new Date()
        }

        firestore.collection('deliveries')
                .add(await newData)
                .then(response => {
                    const retrievedData = newData;
                    retrievedData.id = response.id;
                    return res.status(201).json({
                        message: 'Deliveries created successfully!',
                        data: retrievedData
                    })
                })
                .catch(err => {
                    console.log('====err====>', err);
                });
    }

    /**
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} deliveries object
    */
    static async getAllDeliveries(req, res) {
        let responseData = [];
        firestore.collection('deliveries')
            .orderBy('creation_date', 'desc')
            .get()
            .then(data => {
                if (data.empty) {
                    return res.status(404).json({
                        error: 'No delivery created yet!'
                    });
                } else {
                    data.forEach(doc => {
                        responseData.push({
                            id: doc.id,
                            zone_id: doc.data().zone_id,
                            state: doc.data().state,
                            creation_date: doc.data().creation_date,
                            pickup: doc.data().pickup,
                            dropoff: doc.data().dropoff,
                            created_at: doc.data().created_at,
                        });
                    });
                    return res.status(200).json({ 
                        message: 'Deliveries retrieved successfully',
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
     * @returns {Object} return deliveries object data
    */
    static async getDelivery(req, res) {
        try {
            const { id } = req.params;
            const findDelivery = await firestore.collection('deliveries').doc(id);

            const data = await findDelivery.get();

            if(!data.exists) {
                return res.status(404).json({
                    error: `Delivery with ${id} ID not found!`
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
    static async updateDelivery(req, res) {
        try {
            const { id } = req.params;
            const {
                zone_id,
                state,
                creation_date,
                pickup,
                dropoff,
            } = req.body;

            const findDelivery = await firestore.collection('deliveries').doc(id);
            const data = await findDelivery.get();

            if(!data.exists) {
                return res.status(404).json({
                    error: `Delivery with ${id} ID not found!`
                });
            } else {
                const dataInfo = {
                    zone_id: zone_id  || findDelivery.zone_id,
                    state: state  || findDelivery.state,
                    creation_date: creation_date  || findDelivery.creation_date,
                    pickup: pickup  || findDelivery.pickup,
                    dropoff: dropoff  || findDelivery.dropoff,
                };

                await findDelivery.update(dataInfo);

                return res.status(200).json({
                    message: 'Delivery updated successfully!'
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
    static async deleteDelivery(req, res) {
        try {
            const { id } = req.params;
            const findDelivery = await firestore.collection('deliveries').doc(id);
            const data = await findDelivery.get();

            if(!data.exists) {
                return res.status(404).json({
                    error: `Delivery with ${id} ID not found!`
                });
            } else {
                await findDelivery.delete();

                return res.status(200).json({
                    message: 'Delivery deleted successfully!'
                });
            } 
        } catch (error) {
            return res.status(400).json({
                error: error.message
            });
        }
    };
}
