/**
 * email-login.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService, Logger, LoginModalService } from '../../core/index';

@Component({
    moduleId: module.id,
    selector: 'gn-email-login',
    templateUrl: 'email-login.component.html',
    styleUrls: ['email-login.component.css']
})
export class EmailLoginComponent {
    /* Taken from HTML5 Specification */
    HTML5_EMAIL_REGEX: string = '[a-z0-9!#$%&\'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*';

    credentials: any = {
        email: '',
        password: ''
    };

    formErrors: string[] = [];

    constructor(private logger: Logger, private router: Router, private loginService: LoginService, private loginModal: LoginModalService) {
    }

    onSetModalView(view: string): void {
        this.loginModal.setActiveView(view);
    }

    onSubmit(): void {
        this.logger.debug(`[${this.constructor.name}]: onSubmit()`, this.credentials);

        this.loginService.login(this.credentials).subscribe((res) => {
            /*{
                "id": 2244994983,
                "id_str": "2244994983",
                "lang": "en",
                "profile_image_url": "XXX",
                "default_profile_image": false
            }*/

            this.logger.debug(res);
            this.logger.info(res.headers);


            this.router.navigate(['dashboard']).then((success) => {
                if (success) {
                    this.logger.debug('Navigation success');
                    this.loginModal.hideModal();
                } else {
                    this.logger.warn('Navigation failed');
                }
            }).catch((reason) => {
                this.logger.warn(reason);
            });
        });
    }
}
