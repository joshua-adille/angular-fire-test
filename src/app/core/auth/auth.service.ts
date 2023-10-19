import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { catchError, EMPTY, from, map, Observable, of, switchMap, throwError } from 'rxjs';
import { GoogleAuthProvider } from "firebase/auth";
import { Auth, authState, signInWithPopup, User as FirebaseUser, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from '@angular/fire/auth';
import { User } from '../user/user.types';
import { FirebaseError } from '@angular/fire/app';

type SignInResponse
    = { _type: "success" }
    | { _type: "error"; code: 'invalid-credentials' | 'internal-error', message: string }

type SignUpResponse
    = { _type: "success" }
    | { _type: "error"; code: 'email-already-registered' | 'internal-error', message: string }

@Injectable({providedIn: 'root'})
export class AuthService
{
    private _authenticated: boolean = false;

    private auth: Auth = inject(Auth);
    readonly googleProvider = new GoogleAuthProvider();
    public readonly user: Observable<FirebaseUser | null> = EMPTY;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
    )
    {

        this.user = authState(this.auth)

        this.user.subscribe(firebaseUser => {

            if(firebaseUser === null) {
                this._authenticated = false;
                this._userService.user = undefined;
                return;
            }

            const user: User = {
                id: firebaseUser.uid,
                name: firebaseUser.displayName,
                email: firebaseUser.email,
                avatar: firebaseUser.photoURL,
                // status?: undefined; // Fuse behavior. To be set later.
            };

            // Set the authenticated flag to true
            this._authenticated = true;

            // Store the user on the user service
            this._userService.user = user;
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        // localStorage.setItem('accessToken', token);
        throw new Error("deprecated with new auth.")
    }

    get accessToken(): string
    {
        // return localStorage.getItem('accessToken') ?? '';
        throw new Error("deprecated with new auth.")
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     * 
     * TODO. Error handling.
     *
     * @param email
     */
    forgotPassword(email: string): Observable<void>
    {
        return from(sendPasswordResetEmail(this.auth, email));
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<SignInResponse>
    {
        return from(signInWithEmailAndPassword(this.auth, credentials.email, credentials.password))
            .pipe(
                map(_ => ({ _type: "success" } as const)),
                catchError((error: FirebaseError) => {

                    // If error is pertaining to login credential.
                    if(error.code === 'auth/invalid-login-credentials') {

                        return of({
                            _type: "error",
                            code: 'invalid-credentials',
                            message: error.message } as const);
                    }

                    // Return general internal error.
                    console.error(error);
                    return of({
                        _type: "error",
                        code: 'internal-error',
                        message: error.message
                    } as const);
                })
            );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {
        throw new Error("deprecated with new auth.")
        // Sign in using the token
        return this._httpClient.post('api/auth/sign-in-with-token', {
            accessToken: this.accessToken,
        }).pipe(
            catchError(() =>

                // Return false
                of(false),
            ),
            switchMap((response: any) =>
            {
                // Replace the access token with the new one if it's available on
                // the response object.
                //
                // This is an added optional step for better security. Once you sign
                // in using the token, you should generate a new one on the server
                // side and attach it to the response object. Then the following
                // piece of code can replace the token with the refreshed one.
                if ( response.accessToken )
                {
                    this.accessToken = response.accessToken;
                }

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            }),
        );
    }

    /**
     * Sign out
     * TODO. Error handling.
     */
    signOut(): Observable<any>
    {
        // Return the observable
        return from(
            signOut(this.auth)
                .then(_ => {

                    // Set the authenticated flag to false
                    this._authenticated = false;

                    this._userService.user = undefined;

                    return true;
                })
                .catch(error => {
                    console.error("[debug] unable to signout.", error)
                    return false;
                }));        
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<SignUpResponse>
    {
        return from(createUserWithEmailAndPassword(this.auth, user.email, user.password))
            .pipe(
                map(_ => ({ _type: "success" } as const)),
                catchError((error: FirebaseError) => {

                    // If error is pertaining to login credential.
                    if(error.code === 'auth/email-already-in-use') {

                        return of({
                            _type: "error",
                            code: 'email-already-registered',
                            message: error.message } as const);
                    }

                    // Return general internal error.
                    console.error(error);
                    return of({
                        _type: "error",
                        code: 'internal-error',
                        message: error.message
                    } as const);
                })
            );
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        return this.user.pipe(map(user => !(user === null || user === undefined)));
    }

    /**
     * 
     * @returns 
     */
    signInWithGoogle() {

        return signInWithPopup(this.auth, this.googleProvider)
            .then(_ => {
                console.log("[debug] google signin success");
                return Promise.resolve(true);
            })
            .catch(err => {
                console.error("[debug] google signin error", err);
                return Promise.reject(false);
            });
    }
}
