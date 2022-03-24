class Bot {
    constructor(
        status,
        zone_id,
        created_at,
        location
    ) {
        this.status = status;
        this.location = location;
        this.zone_id = zone_id;
        this.created_at = created_at;
    }
}

export default Bot;
