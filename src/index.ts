import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { ExampleResolver } from "./resolvers/resolver";
import { Context } from "./interfaces/context.interface";
import { authChecker } from "./auth-checker";

void (async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [ExampleResolver],
    authChecker
  });

  const server = new ApolloServer({
    schema,
    context: () => {
      const ctx: Context = {
        user: {
          id: 1,
          name: "Sample User",
          roles: ["REGULAR"]
        }
      };

      return ctx;
    }
  });

  const { url } = await server.listen(4000);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
})();
