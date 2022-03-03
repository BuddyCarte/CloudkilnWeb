
export abstract class ScadaData {
  abstract getDataFactory(): any[];
  abstract getDataSnapshot(): any[];
  abstract getDataChamber(): any[];
  abstract getDataDevices(): any[];
  abstract getDataChamberDetails();
}
