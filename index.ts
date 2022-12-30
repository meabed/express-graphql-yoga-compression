
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createYoga, createSchema } from "graphql-yoga";
import { createServer } from "http";

const app = express();

app.use(cookieParser());
app.use(compression());

app.use(
    bodyParser.urlencoded({
        extended: false,
        limit: "20mb"
    })
);

app.use(bodyParser.json({ limit: "20mb" }));
app.use(cors({ origin: true, credentials: true, maxAge: 10000000 }));

export const yogaGraphQL = createYoga({
    schema: createSchema({
        typeDefs: /* GraphQL */ `
            type Query {
                hello: String
            }
        `,
        resolvers: {
            Query: {
                hello: () => "Hello from Yoga!"
            }
        }
    }),
    landingPage: true,
    multipart: true,
    parserCache: true,
    validationCache: true
});
app.use("/graphql", yogaGraphQL);

const httpServer = createServer(app);

const port = process.env.PORT || 3000;

httpServer.listen(port);
httpServer.on("listening", () => {
    console.log(`started at http://localhost:${port}`);
});
