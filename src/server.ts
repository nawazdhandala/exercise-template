import { Request, Response, NextFunction, Express } from "express";
import express = require("express");
import bodyParser = require("body-parser");

export default class Server {
    public app: Express;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    /**
     * SetupRoutes
     */
    public SetupRoutes() {
        this.app.get("/echo", (req: Request, res: Response, next: NextFunction) => {
            if (!req.query.q) {
                return res.status(400).json({error: "Please add \"q\" param"});
            }
            res.status(200).json({q: req.query.q});
            return;
        });
    }

    /**
     * Listen
     */
    public Listen(port: number = 3000) {
        this.app.listen(port, () => console.log(`Server is running on port ${port}`));
    }

    /*
    * One stop shop for initializing server
    */
    public startServer() {
        this.SetupRoutes();
        this.Listen();
    }
}
