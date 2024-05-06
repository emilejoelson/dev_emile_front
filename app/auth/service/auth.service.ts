import { Injectable } from "@angular/core";
import { ConfigService } from "../../core/services/config.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, map, throwError } from "rxjs";
import { Store } from "../models/Store.model";
import { AccessData } from "../models/AccessData";
import { LogedUser } from "../models/LoggedUser";
import { TokenStorageService } from "../../core/services/token-storage.service";
import { Router } from "@angular/router";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {
    private hostUrl: string;
    private userSubject: BehaviorSubject<LogedUser | null>;
    public user: Observable<LogedUser | null>;

    constructor(
        private configService: ConfigService,
        private http: HttpClient,
        private router: Router,
        private tokenStorage: TokenStorageService
    ) {
        this.hostUrl = this.configService.getAPIUrl();
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    login(username: string, password: string): Observable<AccessData> {
        return this.http.post<AccessData>(`${this.hostUrl}/auth/login`, {
            username,
            password,
        }, httpOptions)
            .pipe(map(data => {
                let decodedJWT = JSON.parse(window.atob(data.accessToken.token.split('.')[1]));
                const id = decodedJWT.sub;
                const roles = decodedJWT.roles;
                const user = new LogedUser(id, roles);
                this.tokenStorage.saveUser(user);
                this.userSubject.next(user);
                return data;
            }));
    }

    register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
        return this.http.post<AccessData>(`${this.hostUrl}/auth/register`, {
            firstName,
            lastName,
            email,
            password
        }, httpOptions);
    }

    sendForgetPasswordEmail(email: string): Observable<any> {
        return this.http.get<any>(`${this.hostUrl}/auth/forgetPassword?email=${email}`);
    }

    resendForgetPasswordEmail(email: string): Observable<any> {
        return this.http.get(`${this.hostUrl}/auth/forgetPassword/resend?email=${email}`);
    }

    resetPassword(newPassword: string, token: string): Observable<any> {
        return this.http.post<any>(`${this.hostUrl}/auth/resetPassword`, {
            newPassword,
            token
        }, httpOptions);
    }

    refreshToken(refreshToken: string) {
        return this.http.post(`${this.hostUrl}/auth/refreshtoken`, {
            refreshToken
        }, httpOptions);
    }

    createStore(storeData: Store, logoFile: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', logoFile);
        formData.append('storeDto', new Blob([JSON.stringify(storeData)], { type: 'application/json' }));

        return this.http.post(`${this.hostUrl}/auth/create-store`, formData).pipe(
            catchError((error) => {
                console.error('Error creating store:', error);
                return throwError(error);
            })
        );
    }

    public get currentUserValue() {
        return this.userSubject.value;
    }

    roleMatch(allowedRoles: string[]): boolean {
        const userRoles = this.tokenStorage.getUser()["roles"] as Array<string>;
        return allowedRoles.some(role => userRoles.includes(role));
    }

    logout() {
        this.tokenStorage.signOut();
        this.userSubject.next(null);
        this.router.navigate(['/']);
    }
}