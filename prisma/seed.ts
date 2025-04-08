import { AccountStatus, AppRole, GroupStatus, PrismaClient, Role, SubscriptionPlanType } from "@prisma/client";

const prisma = new PrismaClient();

// ============================================
// Helper functions
// ============================================
function getRandomSubset<T>(array: T[], count: number): T[] {
  return array.sort(() => 0.5 - Math.random()).slice(0, count);
}

/**
 * Generates Lorem Ipsum text with the specified number of words.
 */
function generateLoremIpsum(wordCount: number): string {
  const lorem = `Do ex eu ipsum quis tempor cupidatat excepteur elit esse et. Non velit anim cupidatat consequat velit esse cupidatat non culpa in. Cupidatat exercitation aliqua aliquip aliqua consequat enim anim nisi veniam nisi Lorem ea ex id. Magna do non est cillum Lorem ut dolor do tempor laborum amet laboris do labore. Culpa amet dolore ut adipisicing exercitation. Sunt esse occaecat voluptate labore sit sint eiusmod tempor sunt non sit.
Enim anim dolore officia elit culpa exercitation non commodo velit quis aliqua amet duis. Ipsum ex est pariatur consequat nisi labore est labore. Reprehenderit esse ea excepteur duis aliquip consectetur excepteur. Ut ut consectetur enim ipsum laborum duis nostrud proident exercitation eiusmod deserunt deserunt id reprehenderit. Id consequat exercitation pariatur non laboris consequat commodo ipsum id duis adipisicing dolore commodo laboris. Qui cillum amet id excepteur Lorem officia consectetur ipsum pariatur culpa esse in mollit deserunt. Id exercitation eu consequat aliquip ex ea enim aliquip Lorem officia nisi ea.
Pariatur incididunt ad officia officia exercitation do ea reprehenderit velit pariatur. Nisi aute voluptate cupidatat adipisicing amet qui fugiat cillum eu aute enim. Et dolore consequat reprehenderit amet laborum pariatur quis qui exercitation id laboris. Anim est nostrud ex deserunt id eu sit cillum pariatur consequat enim ea.
Enim deserunt nulla ex reprehenderit dolor est culpa quis veniam aliqua ipsum eu. Reprehenderit amet eiusmod quis commodo eiusmod cillum est non adipisicing magna aliquip anim. Fugiat voluptate excepteur anim aute esse.
Est est magna ipsum occaecat eiusmod labore sint velit sit. Consequat fugiat dolore irure aliquip in quis consectetur. Qui laboris Lorem enim do in eu veniam mollit proident. Excepteur laborum nostrud sunt tempor id. Deserunt ullamco tempor excepteur eiusmod ullamco in quis aliquip qui quis ea elit commodo. Sint tempor culpa labore ipsum eiusmod commodo dolor consequat aliqua eiusmod reprehenderit consequat ullamco reprehenderit.`;

  let result = "";
  while (result.split(" ").length < wordCount) {
    result += lorem + " ";
  }
  return result.split(" ").slice(0, wordCount).join(" ");
}

// ============================================
// Definicja zakresu dat dla eventów, grup, komentarzy itd.
// ============================================
const now = new Date();
const rangeStart = new Date(now.getFullYear(), now.getMonth() - 1, 1); // początek poprzedniego miesiąca
const rangeEnd = new Date(now.getFullYear(), now.getMonth() + 2, 0); // koniec następnego miesiąca

function getRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function main() {
  // ============================================
  // Seed Categories
  // ============================================
  const categoriesData = Array.from({ length: 15 }, (_, i) => ({
    value: `cat${i + 1}`,
    label: `Category ${i + 1}`,
  }));

  const categories = [];
  for (const cat of categoriesData) {
    const category = await prisma.category.create({ data: cat });
    categories.push(category);
  }
  console.log("✅ Categories seeded!");

  // ============================================
  // Seed Cities
  // ============================================
  const citiesData = Array.from({ length: 15 }, (_, i) => ({
    value: `city${i + 1}`,
    label: `City ${i + 1}`,
  }));

  const cities = [];
  for (const cityData of citiesData) {
    const city = await prisma.city.create({ data: cityData });
    cities.push(city);
  }
  console.log("✅ Cities seeded!");

  // ============================================
  // Seed Admin and Moderator Users
  // ============================================
  const users = [];

  // Create Admin user
  const adminUser = await prisma.user.create({
    data: {
      id: "1418bfc2-9a78-4dd1-988c-25962eb51af2",
      email: "admin@admin.com",
      username: "admin",
      role: AppRole.ADMIN,
      status: "ACTIVE",
      smallPhoto: "id/1/128/128",
      mediumPhoto: "id/1/256/256",
      largePhoto: "id/1/512/512",
      profile: {
        create: {
          facebook: "admin",
          phoneNumber: "123-456-789",
          tiktok: "admin",
          twitter: "admin",
          youtube: "admin",
          instagram: "admin",
          bio: generateLoremIpsum(Math.floor(Math.random() * 100)),
          categories: {
            create: getRandomSubset(categories, Math.floor(Math.random() * 5) + 1).map((cat) => ({
              category: { connect: { id: cat.id } },
            })),
          },
          cities: {
            create: getRandomSubset(cities, Math.floor(Math.random() * 5) + 1).map((city) => ({
              city: { connect: { id: city.id } },
            })),
          },
        },
      },
    },
  });

  // Create Moderator user
  const moderatorUser = await prisma.user.create({
    data: {
      id: "c418bfc1-9a78-4dd1-988c-25962eb51aa2",
      email: "moderator@moderator.com",
      username: "moderator",
      role: AppRole.MODERATOR,
      status: "ACTIVE",
      smallPhoto: "id/2/128/128",
      mediumPhoto: "id/2/256/256",
      largePhoto: "id/2/512/512",
      profile: {
        create: {
          facebook: "moderator",
          phoneNumber: "123-456-789",
          tiktok: "moderator",
          twitter: "moderator",
          youtube: "moderator",
          instagram: "moderator",
          bio: generateLoremIpsum(Math.floor(Math.random() * 100)),
          categories: {
            create: getRandomSubset(categories, Math.floor(Math.random() * 5) + 1).map((cat) => ({
              category: { connect: { id: cat.id } },
            })),
          },
          cities: {
            create: getRandomSubset(cities, Math.floor(Math.random() * 5) + 1).map((city) => ({
              city: { connect: { id: city.id } },
            })),
          },
        },
      },
    },
  });

  users.push(adminUser);
  users.push(moderatorUser);
  console.log("✅ Admin & Moderator seeded!");

  // ============================================
  // Seed Regular Users
  // ============================================
  const accountStatus = (index: number): AccountStatus => {
    switch (index) {
      case 1:
        return "ACTIVE";
      case 2:
        return "BANNED";
      case 3:
        return "INACTIVE";
      case 4:
        return "SUSPENDED";
      default:
        return "PENDING_VERIFICATION";
    }
  };

  for (let i = 1; i <= 50; i++) {
    const user = await prisma.user.create({
      data: {
        email: `user${i}@user.com`,
        username: `user${i}`,
        role: AppRole.USER,
        smallPhoto: `id/${i + 3}/128/128`,
        mediumPhoto: `id/${i + 3}/256/256`,
        largePhoto: `id/${i + 3}/512/512`,
        status: accountStatus(i),
        profile: {
          create: {
            facebook: `user${i}`,
            phoneNumber: "123-456-789",
            tiktok: `user${i}`,
            twitter: `user${i}`,
            youtube: `user${i}`,
            instagram: `user${i}`,
            bio: generateLoremIpsum(Math.floor(Math.random() * 100)),
            categories: {
              create: getRandomSubset(categories, Math.floor(Math.random() * 5) + 1).map((cat) => ({
                category: { connect: { id: cat.id } },
              })),
            },
            cities: {
              create: getRandomSubset(cities, Math.floor(Math.random() * 5) + 1).map((city) => ({
                city: { connect: { id: city.id } },
              })),
            },
          },
        },
      },
    });
    users.push(user);
  }
  console.log("✅ Users seeded!");

  // ============================================
  // Seed Groups, Events, and Comments
  // ============================================
  const groupStatus = (index: number): GroupStatus => {
    switch (index) {
      case 1:
        return "ACTIVE";
      case 2:
        return "BANNED";
      case 3:
        return "INACTIVE";
      case 4:
        return "SUSPENDED";
      default:
        return "PENDING_VERIFICATION";
    }
  };

  const groups = [];
  const subscriptionPlans: SubscriptionPlanType[] = [
    SubscriptionPlanType.FREE,
    SubscriptionPlanType.PLUS,
    SubscriptionPlanType.PREMIUM,
  ];

  // Tworzymy 15 grup wraz z eventami i komentarzami
  for (let i = 1; i <= 15; i++) {
    const randomCategories = getRandomSubset(categories, Math.floor(Math.random() * 5) + 1);
    const randomCities = getRandomSubset(cities, Math.floor(Math.random() * 5) + 1);

    const membersCount = Math.floor(Math.random() * 3) + 3;
    const randomMembers = getRandomSubset(users, membersCount);
    const hostIndex = Math.floor(Math.random() * randomMembers.length);
    const moderatorIndex = Math.floor(Math.random() * randomMembers.length);

    const group = await prisma.group.create({
      data: {
        title: `Group ${i} ${generateLoremIpsum(5)}`,
        description: generateLoremIpsum(30),
        smallPhoto: `id/${i + 100}/128/128`,
        mediumPhoto: `id/${i + 100}/256/256`,
        largePhoto: `id/${i + 100}/512/512`,
        status: groupStatus(i),
        createdAt: getRandomDate(rangeStart, rangeEnd),
        categories: {
          create: randomCategories.map((cat) => ({
            category: { connect: { id: cat.id } },
          })),
        },
        cities: {
          create: randomCities.map((city) => ({
            city: { connect: { id: city.id } },
          })),
        },
        users: {
          create: randomMembers.map((user, index) => ({
            user: { connect: { id: user.id } },
            role:
              moderatorIndex === hostIndex
                ? Role.HOST
                : moderatorIndex === index
                ? Role.MODERATOR
                : hostIndex === index
                ? Role.HOST
                : Role.MEMBER,
          })),
        },
      },
    });
    groups.push(group);

    // Tworzymy subskrypcję dla grupy
    const randomPlan = subscriptionPlans[Math.floor(Math.random() * subscriptionPlans.length)];
    const expiryDays = 30;
    const expiresAt = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000);
    await prisma.groupSubscription.create({
      data: {
        plan: randomPlan,
        expiresAt,
        group: { connect: { id: group.id } },
      },
    });

    // Tworzymy 5 eventów dla każdej grupy
    for (let j = 1; j <= 5; j++) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const eventUsersCount = Math.floor(Math.random() * 3) + 2;
      const randomEventUsers = getRandomSubset(users, eventUsersCount);
      const eventHostIndex = Math.floor(Math.random() * randomEventUsers.length);
      const eventModeratorIndex = Math.floor(Math.random() * randomMembers.length);

      const startAt = getRandomDate(rangeStart, rangeEnd);
      const endAt = new Date(startAt.getTime() + 2 * 3600000);

      await prisma.event.create({
        data: {
          title: `Event ${j} in Group ${i}`,
          description: generateLoremIpsum(40),
          startAt,
          endAt,
          smallPhoto: `id/${j + 150}/128/128`,
          mediumPhoto: `id/${j + 150}/256/256`,
          largePhoto: `id/${j + 150}/512/512`,
          group: { connect: { id: group.id } },
          categories: { create: [{ category: { connect: { id: randomCategory.id } } }] },
          cities: { create: [{ city: { connect: { id: randomCity.id } } }] },
          users: {
            create: randomEventUsers.map((user, index) => ({
              user: { connect: { id: user.id } },
              role:
                eventModeratorIndex === eventHostIndex
                  ? Role.HOST
                  : eventModeratorIndex === index
                  ? Role.MODERATOR
                  : eventHostIndex === index
                  ? Role.HOST
                  : Role.MEMBER,
            })),
          },
        },
      });
    }

    // Dodajemy komentarze do grupy
    const commentCount = Math.floor(Math.random() * 3) + 2;
    for (let k = 1; k <= commentCount; k++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      await prisma.comment.create({
        data: {
          rate: Math.floor(Math.random() * 5) + 1,
          content: generateLoremIpsum(20),
          user: { connect: { id: randomUser.id } },
          group: { connect: { id: group.id } },
          createdAt: getRandomDate(rangeStart, rangeEnd),
        },
      });
    }
  }
  console.log("✅ Groups & related data seeded!");

  // ============================================
  // Seed Standalone Events (Not associated with any group)
  // ============================================
  const standaloneEventsCount = 10;
  for (let i = 1; i <= standaloneEventsCount; i++) {
    const hostUser = users[Math.floor(Math.random() * users.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    let randomEventUsers = getRandomSubset(users, Math.floor(Math.random() * 3) + 2);
    if (!randomEventUsers.find((u) => u.id === hostUser.id)) {
      randomEventUsers.push(hostUser);
    }

    const startAt = getRandomDate(rangeStart, rangeEnd);
    const endAt = new Date(startAt.getTime() + 2 * 3600000);

    await prisma.event.create({
      data: {
        title: `Standalone Event ${i}`,
        description: generateLoremIpsum(40),
        startAt,
        endAt,
        smallPhoto: `id/${i + 200}/128/128`,
        mediumPhoto: `id/${i + 200}/256/256`,
        largePhoto: `id/${i + 200}/512/512`,
        canceled: false,
        eventType: "STANDALONE",
        host: { connect: { id: hostUser.id } },
        categories: { create: [{ category: { connect: { id: randomCategory.id } } }] },
        cities: { create: [{ city: { connect: { id: randomCity.id } } }] },
        users: {
          create: randomEventUsers.map((user) => ({
            user: { connect: { id: user.id } },
            role: user.id === hostUser.id ? Role.HOST : Role.MEMBER,
          })),
        },
      },
    });
  }
  console.log("✅ Standalone events seeded!");

  console.log("🎉 Database seeding completed!");
  console.table(users);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
