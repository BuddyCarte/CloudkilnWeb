export class Factory {
    id: number;
    fullname: string;
    factory_name: string;
}

export class Snapshot {
    snap_id: number;
    log_time: string;
    log_day: string;
}

export class Chamber {
    id: number;
    name: string;
    code: string;
    status: number;
}

export class Device {
    id: number;
    chamber: string;
    device_name: string;
    log_time: string;
    log_day: string;
    value: number;

    device_desc: string;
    img: string;
    state: string;
    desc: string;
    backgroundColor: string;
    checked: number;
}


export class Sensors {
    id: number;
    value: number;
    chamber: string;
    device_name: string;
    device_attribute: string;
    device_desc: string;
    img: string;
    background: string;
    type: string;
}

export class Dashboard {
    code: number;
    desc: string;
    factory: number;
    chamber: number;
    notification: 57924;
    notification_detail: [{
        success: number,
        failed: number,
        expired: number,
    }];
    REASON: [];
    TGS_DATA: [];
    CHAMBER_INFO: [];
    SNAPSHOT_DATA: [{
        chamber: string,
        data: [{
            chamber: string,
            log_time: string,
            total: number,
        }]
    }];
}

