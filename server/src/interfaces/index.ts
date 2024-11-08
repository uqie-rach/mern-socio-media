import { Router } from "express";

export interface IRoute {
  path: String;
  route: Router;
  excludeAPIPrefix?: Boolean;
}

export interface DriveData {
  kind: "drive#file";
  id: string;
  name: string;
  mimeType: string;
}
