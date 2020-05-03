export interface SoftwareInterface {
  id: number;
  name: String;
  nickname: String;
  publicKey: String;
  privateKey: String;
  urlUserManual: String;
  emailContact: String;
  mobileVersion: String;
  active: boolean;
  inMaintenance: boolean;
  consideration: String;
  updateList: any;
}
