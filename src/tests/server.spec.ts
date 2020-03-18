import * as chai from "chai";
import chaiHttp = require("chai-http");
import Server from "../server";

chai.should();
chai.use(chaiHttp);

let app: Server;
before("Start server", () => {
    app = new Server();
    app.startServer();
});

const SERVER_URL = "http://localhost:3000";

describe("Server Tests", () => {
    describe("/echo tests", () => {
        it("should get 400 when 'q' is not present", (done) => {
            chai.request(SERVER_URL)
                .get("/echo")
                .end((err, res) => {
                    res.should.have.status(400);
                    res.text.should.equal(JSON.stringify({error: "Please add \"q\" param"}));
                    done();
                });
        });

        it("should return response with data passed in query param 'q'", (done) => {
            chai.request(SERVER_URL)
                .get("/echo")
                .query({ q: "hello" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.type.should.equal("application/json");
                    res.text.should.equal(JSON.stringify({ q: "hello" }));
                    done();
                });
        });
    });
});

after("Server process teardown", () => {
    setTimeout(() => process.exit(0), 500);
});
