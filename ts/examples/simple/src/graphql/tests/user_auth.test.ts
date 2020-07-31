import schema from "src/graphql/schema";
import {
  queryRootConfig,
  expectQueryFromRoot,
  expectMutation,
} from "src/graphql_test_utils";
import { ID, DB, LoggedOutViewer } from "@lolopinto/ent";
import CreateUserAction, {
  UserCreateInput,
} from "src/ent/user/actions/create_user_action";
import { randomEmail, random } from "src/util/random";
import { clearAuthHandlers, registerAuthHandler } from "@lolopinto/ent/auth";
import User from "src/ent/user";
import passport from "passport";
import session from "express-session";
import { Express } from "express";
import { PassportAuthHandler } from "@lolopinto/ent/auth";
import supertest from "supertest";

// TODO we need something that does this by default for all tests
afterAll(async () => {
  await DB.getInstance().endPool();
});

afterEach(() => {
  clearAuthHandlers();
});

function getUserRootConfig(
  userID: ID,
  partialConfig?: Partial<queryRootConfig>,
): queryRootConfig {
  return {
    schema: schema,
    root: "user",
    args: {
      id: userID,
    },
    ...partialConfig,
  };
}

const loggedOutViewer = new LoggedOutViewer();
async function createUser(input?: Partial<UserCreateInput>): Promise<User> {
  return await CreateUserAction.create(loggedOutViewer, {
    firstName: "first",
    lastName: "last",
    emailAddress: randomEmail(),
    password: random(),
    ...input,
  }).saveX();
}

test("no viewer", async () => {
  const user = await createUser();

  await expectQueryFromRoot(
    getUserRootConfig(user.id, {
      rootQueryNull: true,
    }),
    ["id", null],
  );
});

test("wrong login credentials", async () => {
  const user = await createUser();

  await expectMutation(
    {
      mutation: "userAuth",
      schema,
      args: {
        emailAddress: user.emailAddress,
        password: random(),
      },
      expectedError: /not the right credentials/,
    },
    ["token", null],
    ["viewerID", null],
  );
});

test("right credentials", async () => {
  const pw = random();
  const user = await createUser({
    password: pw,
  });

  let st: supertest.SuperTest<supertest.Test>;

  st = await expectMutation(
    {
      // pass a function that takes a server that keeps track of cookies etc
      // and use that for this request
      test: (app: Express) => {
        return supertest.agent(app);
      },
      init: (app: Express) => {
        app.use(
          session({
            secret: "secret",
          }),
        );
        app.use(passport.initialize());
        app.use(passport.session());
        registerAuthHandler("viewer", new PassportAuthHandler());
      },
      mutation: "userAuth",
      schema,
      args: {
        emailAddress: user.emailAddress,
        password: pw,
      },
    },
    ["token", "1"],
    ["viewerID", user.id],
  );

  // send to authed server from above
  // and user is logged in and can make queries!
  await expectQueryFromRoot(
    getUserRootConfig(user.id, {
      // pass the agent used above to the same server and user is authed!
      test: st,
    }),
    ["id", user.id],
    ["emailAddress", user.emailAddress],
  );

  // independent server, nothing is saved. user isn't logged in
  await expectQueryFromRoot(
    getUserRootConfig(user.id, {
      rootQueryNull: true,
    }),
    ["id", null],
  );
});
