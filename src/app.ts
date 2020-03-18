import Server from "./server";

let server = new Server();
server.SetupRoutes();
server.Listen(5000);
