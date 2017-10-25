/**
 * study.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

import { StudySessionService } from '../core/study-session/study-session.service';
import { NavbarService } from '../core/navbar/navbar.service';
import { environment } from '../../environments/environment';
import { Logger } from '../core/logger/logger';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'study.component.html',
    styleUrls: ['study.component.scss']
})
export class StudyComponent implements OnInit, OnDestroy {

    flags = {
        isProd: environment.production,
        isModalVisible: false
    };

    quitURL: string;

    constructor(private logger: Logger, private navbar: NavbarService, private session: StudySessionService, private router: Router) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
        this.navbar.showProgressBar();
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        this.navbar.hideProgressBar();
    }

    onClickSkip(): void {
        this.logger.debug(this, 'skipping to next section');
        this.session.forceSectionEnd();
    }

    onClickCloseModal(): void {
        this.flags.isModalVisible = false;
    }

    onClickQuit(): void {
        this.logger.debug(this, 'onClickQuit');

        if (!this.quitURL) {
            this.logger.debug(this, 'Tried to navigate without setting quitURL');
            return;
        }

        this.router.navigateByUrl(this.quitURL);
    }

    onClickCancel(): void {
        this.logger.debug(this, 'onClickCancel');
        this.flags.isModalVisible = false;
    }

}