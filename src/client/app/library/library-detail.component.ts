/**
 * library-detail.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NavbarService } from '../core/navbar/navbar.service';
import { HttpService } from '../core/http/http.service';
import { APIHandle } from '../core/http/api-handle';
import { Logger } from '../core/logger/logger';
import { Video } from '../core/entities/video';

import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/pluck';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'gn-library-detail',
    templateUrl: 'library-detail.component.html',
    styleUrls: ['library-detail.component.css']
})
export class LibraryDetailComponent implements OnInit, OnDestroy {
    likedChange$ = new Subject<boolean>();
    liked: boolean;

    queued: boolean;

    likeCount: number;

    subscriptions: Subscription[] = [];

    video$ = this.route.params.pluck('id').map(_.toNumber).switchMap(id => {
        return this.http.request(APIHandle.VIDEO, {
            params: {
                id: id
            }
        });
    }).share().do((v: Video) => {
        this.liked     = v.liked;
        this.likeCount = v.like_count;
    });

    constructor(private logger: Logger, private navbar: NavbarService, private http: HttpService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.logger.debug(this, 'OnInit');

        const params = {
            params: {
                id: _.toNumber(this.route.snapshot.params['id'])
            }
        };

        this.navbar.backButtonTitle$.next('Back');
        this.navbar.studyOptionsVisible$.next(true);

        this.subscriptions.push(
            this.video$
                .pluck('subcategory', 'name')
                .subscribe((t: string) => this.navbar.title$.next(t)),

            this.likedChange$
                .filter(_.isBoolean)
                .do(this.updateLikeCount.bind(this))
                .do(this.updateLiked.bind(this))
                .debounceTime(300)
                .distinctUntilChanged()
                .map(liked => liked ? APIHandle.LIKE_VIDEO : APIHandle.UNLIKE_VIDEO)
                .mergeMap(handle => this.http.request(handle, params))
                .subscribe(),

            this.navbar.onClickQueue$
                .do(() => this.queued = !this.queued)
                .do(() => this.navbar.studyOptionsEnabled$.next(false))
                .map(() => this.queued ? APIHandle.QUEUE_VIDEO : APIHandle.DEQUEUE_VIDEO)
                .mergeMap(handle => this.http.request(handle, params))
                .do(() => this.navbar.studyOptionsEnabled$.next(true))
                .map(() => this.queued ? 'DEQUEUE' : 'ADD TO QUEUE')
                .subscribe(this.navbar.queueButtonTitle$),

            this.video$
                .map(_.isPlainObject)
                .subscribe(this.navbar.studyOptionsEnabled$),

            this.video$
                .pluck('cued')
                .do((cued: boolean) => this.queued = cued)
                .map((cued: boolean) => cued ? 'DEQUEUE' : 'ADD TO QUEUE')
                .subscribe(this.navbar.queueButtonTitle$)
        );
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');

        this.navbar.studyOptionsVisible$.next(false);
        this.navbar.backButtonTitle$.next(null);
        this.navbar.queueButtonTitle$.next('JUST A SEC..');

        _.each(this.subscriptions, s => s.unsubscribe());
    }

    private updateLikeCount(liked: boolean) {
        this.likeCount = liked ? this.likeCount + 1 : this.likeCount - 1;
    }

    private updateLiked(liked: boolean) {
        this.liked = liked;
    }
}
