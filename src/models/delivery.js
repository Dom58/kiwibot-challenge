class Delivery {
    constructor(
        zone_id,
        state,
        creation_date,
        pickup_lat,
        pickup_lon,
        dropoff_lat,
        dropoff_lon,
        created_at,
    ) {
        this.zone_id = zone_id;
        this.state = state;
        this.creation_date = creation_date;
        this.pickup_lat = pickup_lat;
        this.pickup_lon = pickup_lon;
        this.dropoff_lat = dropoff_lat;
        this.dropoff_lon = dropoff_lon;
        this.created_at = created_at;
    }
}

export default Delivery;
