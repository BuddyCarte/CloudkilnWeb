export class PmxlFileAttach {
    systemCode: string;
    resultInfo: ResultInfo;
    lstFileTrVhkt: LstFileTrVhkt[];
}

export class PmxlTaskRequest {
    systemCode: string;
    resultInfo: ResultInfo;
    lstWOInfoVhkt: LstWOInfoVhkt[];
}

export class PmxlSolarCommon {
    systemCode: string;
    managerName: string;
    longitude: number;
    latitude: number;
    address: string;
    detailAddress: string;
    payUpDate: Date;
    startDate: Date;
    designPower: number;
}

export class ResultInfo {
    status: string;
    message: string;
}


export class LstFileTrVhkt {
    fileName: string;
    fileData: string;
}

export class LstWOInfoVhkt {
    alarmID: number;
    trCode: string;
    trName: string;
    woCode: string;
    woName: string;
    trStart: string;
    woStart: string;
    woEndStr: string;
    trEndStr: string;
    trState: string;
    woCreate: string;
    woDeadlineStr: string;
    trStateNameStr: string;
}
export class FileInfoDto {
    fileName: string;
    fileUrl: string;
}
