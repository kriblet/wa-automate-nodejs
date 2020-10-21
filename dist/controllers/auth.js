"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.smartQr = exports.phoneIsOutOfReach = exports.isInsideChat = exports.needsToScan = exports.isAuthenticated = void 0;
var qrcode = __importStar(require("qrcode-terminal"));
var rxjs_1 = require("rxjs");
var take_1 = require("rxjs/internal/operators/take");
var events_1 = require("./events");
exports.isAuthenticated = function (waPage) { return rxjs_1.merge(exports.needsToScan(waPage), exports.isInsideChat(waPage)).pipe(take_1.take(1)).toPromise(); };
exports.needsToScan = function (waPage) {
    return rxjs_1.from(new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 4, , 5]);
                    _b = (_a = Promise).race;
                    _c = [waPage.waitForFunction('checkQrRefresh()', { timeout: 0, polling: 1000 }).catch(function () { })];
                    return [4, waPage
                            .waitForSelector('body > div > div > .landing-wrapper', {
                            timeout: 0
                        })];
                case 1: return [4, _b.apply(_a, [_c.concat([
                            _d.sent()
                        ])]).catch(function () { })];
                case 2:
                    _d.sent();
                    return [4, waPage.waitForSelector("canvas[aria-label='Scan me!']", { timeout: 0 }).catch(function () { })];
                case 3:
                    _d.sent();
                    resolve(false);
                    return [3, 5];
                case 4:
                    error_1 = _d.sent();
                    return [3, 5];
                case 5: return [2];
            }
        });
    }); }));
};
exports.isInsideChat = function (waPage) {
    return rxjs_1.from(waPage
        .waitForFunction("!!window.WA_AUTHENTICATED || (document.getElementsByClassName('app')[0] && document.getElementsByClassName('app')[0].attributes && !!document.getElementsByClassName('app')[0].attributes.tabindex) || (document.getElementsByClassName('two')[0] && document.getElementsByClassName('two')[0].attributes && !!document.getElementsByClassName('two')[0].attributes.tabindex)", { timeout: 0 })
        .then(function () { return true; }));
};
exports.phoneIsOutOfReach = function (waPage) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, waPage
                    .waitForFunction('document.querySelector("body").innerText.includes("Trying to reach phone")', { timeout: 0, polling: 'mutation' })];
            case 1: return [2, _a.sent()];
        }
    });
}); };
function smartQr(waPage, config) {
    return __awaiter(this, void 0, void 0, function () {
        var evalResult, isAuthed, grabAndEmit, qrEv;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, waPage.evaluate("window.Store && window.Store.State")];
                case 1:
                    evalResult = _a.sent();
                    if (evalResult === false) {
                        console.log('Seems as though you have been TOS_BLOCKed, unable to refresh QR Code. Please see https://github.com/open-wa/wa-automate-nodejs#best-practice for information on how to prevent this from happeing. You will most likely not get a QR Code');
                        if (config.throwErrorOnTosBlock)
                            throw new Error('TOSBLOCK');
                    }
                    return [4, exports.isAuthenticated(waPage)];
                case 2:
                    isAuthed = _a.sent();
                    if (isAuthed)
                        return [2, true];
                    grabAndEmit = function (qrData) { return __awaiter(_this, void 0, void 0, function () {
                        var qrCode;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, waPage.evaluate("getQrPng()")];
                                case 1:
                                    qrCode = _a.sent();
                                    qrEv.emit(qrCode);
                                    if (!config.qrLogSkip)
                                        qrcode.generate(qrData, { small: true });
                                    return [2];
                            }
                        });
                    }); };
                    qrEv = new events_1.EvEmitter(config.sessionId, 'qr');
                    return [2, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var funcName, fn, set, firstQr;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        funcName = '_smartQr';
                                        fn = function (qrData) { return __awaiter(_this, void 0, void 0, function () {
                                            var _a;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0:
                                                        if (!(qrData === 'QR_CODE_SUCCESS')) return [3, 2];
                                                        _a = resolve;
                                                        return [4, exports.isInsideChat(waPage).toPromise()];
                                                    case 1: return [2, _a.apply(void 0, [_b.sent()])];
                                                    case 2:
                                                        grabAndEmit(qrData);
                                                        return [2];
                                                }
                                            });
                                        }); };
                                        set = function () { return waPage.evaluate(function (_a) {
                                            var funcName = _a.funcName;
                                            return window['smartQr'] ? window["smartQr"](function (obj) { return window[funcName](obj); }) : false;
                                        }, { funcName: funcName }); };
                                        return [4, waPage.exposeFunction(funcName, function (obj) { return fn(obj); }).then(set).catch(function (e) {
                                                console.log("set -> e", e);
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [4, waPage.evaluate("document.querySelector(\"canvas[aria-label='Scan me!']\")?document.querySelector(\"canvas[aria-label='Scan me!']\").parentElement.getAttribute(\"data-ref\"):false")];
                                    case 2:
                                        firstQr = _a.sent();
                                        return [4, grabAndEmit(firstQr)];
                                    case 3:
                                        _a.sent();
                                        return [2];
                                }
                            });
                        }); })];
            }
        });
    });
}
exports.smartQr = smartQr;
