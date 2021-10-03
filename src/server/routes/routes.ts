import { Express } from 'express';
import { RegisterRoute } from './auth/register';
import { LoginRoute } from './auth/login';

export class Routes {
    private server: Express;
    private baseUrl: string = '/api/v1/';
    private registerRoute: RegisterRoute;
    private loginRoute: LoginRoute;

    constructor(server: Express) {
        this.server = server;
        this.registerRoute = new RegisterRoute(server);
        this.loginRoute = new LoginRoute(server);
        this.configureApiEndPoints(this.baseUrl);
    }

    public configureApiEndPoints(baseUrl: string) {
      this.registerRoute.configureEndPoints(baseUrl);
      this.loginRoute.configureEndPoints(baseUrl);
    }
}