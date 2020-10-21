import * as puppeteer from 'puppeteer';
import { ConfigObject } from '../api/model';
export declare const isAuthenticated: (waPage: puppeteer.Page) => Promise<unknown>;
export declare const needsToScan: (waPage: puppeteer.Page) => import("rxjs").Observable<unknown>;
export declare const isInsideChat: (waPage: puppeteer.Page) => import("rxjs").Observable<boolean>;
export declare const phoneIsOutOfReach: (waPage: puppeteer.Page) => Promise<puppeteer.JSHandle<any>>;
export declare function smartQr(waPage: puppeteer.Page, config?: ConfigObject): Promise<unknown>;
