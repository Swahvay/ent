import { User, UserToFriendsQuery, UserToSelfContactQuery } from "src/ent/";

import { IDViewer, LoggedOutViewer, DB, ID } from "@lolopinto/ent";

import CreateUserAction, {
  UserCreateInput,
} from "src/ent/user/actions/create_user_action";
import CreateEventAction from "src/ent/event/actions/create_event_action";
import { randomEmail } from "src/util/random";

const loggedOutViewer = new LoggedOutViewer();

// TODO we need something that does this by default for all tests
afterAll(async () => {
  await DB.getInstance().endPool();
});

async function create(input: UserCreateInput): Promise<User> {
  return await CreateUserAction.create(loggedOutViewer, input).saveX();
}

test("self contact query", async () => {
  let user = await create({
    firstName: "Jon",
    lastName: "Snow",
    emailAddress: randomEmail(),
  });
  let vc = new IDViewer(user.id);
  user = await User.loadX(vc, user.id);
  let selfContact = await user.loadSelfContact();

  const selfContactsMap = await UserToSelfContactQuery.query(
    vc,
    user.id,
  ).queryEnts();
  expect(selfContactsMap.size).toBe(1);
  const contacts = selfContactsMap.get(user.id) || [];

  expect(contacts).toStrictEqual([selfContact]);
});

test("friends query", async () => {
  let dany = await create({
    firstName: "Daenerys",
    lastName: "Targaryen",
    emailAddress: randomEmail(),
  });
  let sam = await create({
    firstName: "Samwell",
    lastName: "Tarly",
    emailAddress: randomEmail(),
  });

  let action = CreateUserAction.create(loggedOutViewer, {
    firstName: "Jon",
    lastName: "Snow",
    emailAddress: randomEmail(),
  });
  let t = new Date();
  t.setTime(t.getTime() + 86400);
  action.builder.addFriend(dany).addFriendID(sam.id, {
    time: t,
  });
  const jon = await action.saveX();

  const vc = new IDViewer(jon.id);
  const query = UserToFriendsQuery.query(vc, jon.id);

  const [countMap, idsMap] = await Promise.all([
    query.queryRawCount(),
    query.queryIDs(),
  ]);

  const count = countMap.get(jon.id);
  const ids = idsMap.get(jon.id);

  expect(count).toBe(2);
  // sam more recent so always gonna come back before dany
  expect(ids).toStrictEqual([sam.id, dany.id]);
});

test("chained queries", async () => {
  let dany = await create({
    firstName: "Daenerys",
    lastName: "Targaryen",
    emailAddress: randomEmail(),
  });
  let sam = await create({
    firstName: "Samwell",
    lastName: "Tarly",
    emailAddress: randomEmail(),
  });
  let action = CreateUserAction.create(loggedOutViewer, {
    firstName: "Jon",
    lastName: "Snow",
    emailAddress: randomEmail(),
  });
  action.builder.addFriend(dany).addFriendID(sam.id);
  const jon = await action.saveX();

  const [event, event2] = await Promise.all([
    CreateEventAction.create(loggedOutViewer, {
      name: "fun event",
      creatorID: sam.id,
      startTime: new Date(),
      location: "location",
    }).saveX(),
    CreateEventAction.create(loggedOutViewer, {
      name: "fun event 2",
      creatorID: dany.id,
      startTime: new Date(),
      location: "location 2",
    }).saveX(),
  ]);

  const vc = new IDViewer(jon.id);
  const chainedIDs = await UserToFriendsQuery.query(vc, jon.id)
    .queryUserToHostedEvents()
    .queryIDs();

  const expectedResult = new Map<ID, ID[]>();
  expectedResult.set(sam.id, [event.id]);
  expectedResult.set(dany.id, [event2.id]);

  expect(chainedIDs).toStrictEqual(expectedResult);
});
