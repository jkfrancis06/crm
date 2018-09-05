import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantServiceService {
  // public SERVER_ADDRESS = 'http://197.255.237.253:8001';
  // public SERVER_ADDRESS = 'http://192.168.43.195';
  public SERVER_ADDRESS = 'http://http://ec2-13-59-236-64.us-east-2.compute.amazonaws.com';

  constructor() { }
}
