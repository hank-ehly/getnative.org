/**
 * http.service.spec
 * get-native.com
 *
 * Created by henryehly on 2017/01/29.
 */

import { Http } from '@angular/http';

import { HttpService } from './http.service';
import { STUBLogger, STUBLocalStorageService } from '../index';

export function main() {
    let service = new HttpService(<Http>{}, STUBLogger, STUBLocalStorageService);
    // Todo
}
