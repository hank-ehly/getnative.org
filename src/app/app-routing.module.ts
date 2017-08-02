/**
 * app-routing.module
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfirmEmailResolver } from './core/auth/confirm-email-resolver.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './core/auth/auth-guard.service';
import { PageNotFoundComponent } from './static-pages/page-not-found/page-not-found.component';
import { TOSComponent } from './static-pages/tos/tos.component';
import { PrivacyComponent } from './static-pages/privacy/privacy.component';
import { HelpComponent } from './static-pages/help/help.component';
import { HomeComponent } from './static-pages/home/home.component';
import { LibraryDetailComponent } from './library/library-detail.component';
import { LibraryComponent } from './library/library.component';
import { SecurityComponent } from './settings/security/security.component';
import { NotificationsComponent } from './settings/notifications/notifications.component';
import { GeneralComponent } from './settings/general/general.component';
import { SettingsComponent } from './settings/settings.component';
import { ResultsComponent } from './study/results/results.component';
import { WritingComponent } from './study/writing/writing.component';
import { SpeakingComponent } from './study/speaking/speaking.component';
import { ShadowingComponent } from './study/shadowing/shadowing.component';
import { ListeningComponent } from './study/listening/listening.component';
import { TransitionComponent } from './study/transition/transition.component';
import { StudyComponent } from './study/study.component';
import { ListeningResolver } from './study/listening/listening-resolver.service';
import { StudySessionGuard } from './study/study-session-guard.service';
import { ResultsResolver } from './study/results/results-resolver.service';
import { WritingResolver } from './study/writing/writing-resolver.service';
import { WritingGuard } from './study/writing/writing-guard.service';
import { DashboardGuard } from './dashboard/dashboard-guard.service';
import { DashboardResolveService } from './dashboard/dashboard-resolve.service';
import { ConfirmEmailUpdateResolver } from './core/auth/confirm-email-update-resolver.service';
import { LoginComponent } from './login/login.component';

import { MetaGuard } from '@ngx-meta/core';

const routes: Routes = [
    {
        path: '', canActivate: [AuthGuard, MetaGuard], component: HomeComponent, data: {
            meta: {
                title: 'getnative. Break the barrier between fluid and native-like.',
                override: true
            }
        }
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [DashboardGuard, MetaGuard],
        resolve: {user: DashboardResolveService},
        data: {
            meta: {
                title: 'Dashboard'
            }
        }
    },
    {
        path: 'login', component: LoginComponent, outlet: 'modal'
    },
    {
        path: 'settings', component: SettingsComponent, canActivateChild: [AuthGuard, MetaGuard], children: [
            {
                path: '', component: GeneralComponent, data: {
                    meta: {
                        title: 'General Settings'
                    }
                }
            },
            {
                path: 'notifications', component: NotificationsComponent, data: {
                    meta: {
                        title: 'Notification Settings'
                    }
                }
            },
            {
                path: 'security', component: SecurityComponent, data: {
                    meta: {
                        title: 'Security Settings'
                    }
                }
            }
        ]
    },
    {
        path: 'library', component: LibraryComponent, canActivate: [AuthGuard, MetaGuard], data: {
            meta: {
                title: 'Library'
            }
        }
    },
    {
        path: 'library/:id', component: LibraryDetailComponent, canActivate: [AuthGuard, MetaGuard]
    },
    {
        path: 'study', component: StudyComponent, canActivateChild: [AuthGuard, MetaGuard], canDeactivate: [StudySessionGuard], children: [
            {
                path: '', component: TransitionComponent
            },
            {
                path: 'listening', resolve: {video: ListeningResolver}, component: ListeningComponent, data: {
                    meta: {
                        title: 'Listening'
                    }
                }
            },
            {
                path: 'shadowing', component: ShadowingComponent, data: {
                    meta: {
                        title: 'Shadowing'
                    }
                }
            },
            {
                path: 'speaking', component: SpeakingComponent, data: {
                    meta: {
                        title: 'Speaking'
                    }
                }
            },
            {
                path: 'writing',
                component: WritingComponent,
                resolve: {question: WritingResolver},
                canDeactivate: [WritingGuard],
                data: {
                    meta: {
                        title: 'Writing'
                    }
                }
            },
            {
                path: 'results', component: ResultsComponent, resolve: {stats: ResultsResolver}, data: {
                    meta: {
                        title: 'Results'
                    }
                }
            }
        ]
    },
    {
        path: 'help', component: HelpComponent, canActivate: [MetaGuard], data: {
            meta: {
                title: 'Frequently Asked Questions & Contact'
            }
        }
    },
    {
        path: 'privacy', component: PrivacyComponent, canActivate: [MetaGuard], data: {
            meta: {
                title: 'Privacy Policy'
            }
        }
    },
    {
        path: 'tos', component: TOSComponent, canActivate: [MetaGuard], data: {
            meta: {
                title: 'Terms of Service'
            }
        }
    },
    {
        path: 'confirm_email', resolve: {_: ConfirmEmailResolver}, component: DashboardComponent
    },
    {
        path: 'confirm_email_update', resolve: {_: ConfirmEmailUpdateResolver}, component: SettingsComponent
    },
    {
        path: '**', component: PageNotFoundComponent, data: {
            meta: {
                title: 'Page Not Found'
            }
        }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
