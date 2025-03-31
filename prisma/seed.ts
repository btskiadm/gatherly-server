import { AccountStatus, AppRole, GroupStatus, PrismaClient, Role, SubscriptionPlanType } from "@prisma/client";

const prisma = new PrismaClient();

function getRandomSubset<T>(array: T[], count: number): T[] {
  return array.sort(() => 0.5 - Math.random()).slice(0, count);
}

function generateLoremIpsum(wordCount: number): string {
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.";
  const words = lorem.split(" ");
  let result = "";
  while (result.split(" ").length < wordCount) {
    result += lorem + " ";
  }
  return result.split(" ").slice(0, wordCount).join(" ");
}

async function main() {
  // Tworzymy 15 kategorii
  const categoriesData = Array.from({ length: 15 }, (_, i) => ({
    value: `cat${i + 1}`,
    label: `Kategoria ${i + 1}`,
  }));

  const categories = [];
  for (const cat of categoriesData) {
    const category = await prisma.category.create({ data: cat });
    categories.push(category);
  }
  console.log("✅ Categories seeded!");

  // Tworzymy 15 miast
  const citiesData = Array.from({ length: 15 }, (_, i) => ({
    value: `city${i + 1}`,
    label: `Miasto ${i + 1}`,
  }));

  const cities = [];
  for (const cityData of citiesData) {
    const city = await prisma.city.create({ data: cityData });
    cities.push(city);
  }
  console.log("✅ Cities seeded!");

  const users = [];

  // Tworzenie admina
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
          bio: "Bio admina",
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

  // Tworzenie moderatora
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
          bio: "Bio moderator",
          instagram: "moderator",
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

  // Tworzymy 50 użytkowników
  for (let i = 1; i <= 50; i++) {
    const user = await prisma.user.create({
      data: {
        email: `user${i}@user.com`,
        username: `user${i}`,
        role: AppRole.USER,
        smallPhoto: `id/${i * 10}/128/128`,
        mediumPhoto: `id/${i * 10}/256/256`,
        largePhoto: `id/${i * 10}/512/512`,
        status: accountStatus(i),
        profile: {
          create: {
            facebook: `user${i}`,
            phoneNumber: "123-456-789",
            tiktok: `user${i}`,
            twitter: `user${i}`,
            youtube: `user${i}`,
            instagram: `user${i}`,
            bio: `To jest bio użytkownika user${i}`,
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
  // Definiujemy dostępne plany subskrypcji
  const subscriptionPlans: SubscriptionPlanType[] = [
    SubscriptionPlanType.FREE,
    SubscriptionPlanType.PLUS,
    SubscriptionPlanType.PREMIUM,
  ];

  // Tworzymy 15 grup
  for (let i = 1; i <= 15; i++) {
    const randomCategories = getRandomSubset(categories, Math.floor(Math.random() * 5) + 1);
    const randomCities = getRandomSubset(cities, Math.floor(Math.random() * 5) + 1);
    const membersCount = Math.floor(Math.random() * 3) + 3;
    const randomMembers = getRandomSubset(users, membersCount);
    const hostIndex = Math.floor(Math.random() * randomMembers.length);
    const moderatorIndex = Math.floor(Math.random() * randomMembers.length);

    const group = await prisma.group.create({
      data: {
        title: `Grupa ${i}`,
        description: generateLoremIpsum(30),
        smallPhoto: `id/${i * 11}/128/128`,
        mediumPhoto: `id/${i * 11}/256/256`,
        largePhoto: `id/${i * 11}/512/512`,
        status: groupStatus(i),
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
    let expiryDays = 30;
    if (randomPlan === SubscriptionPlanType.PLUS) {
      expiryDays = 30;
    } else if (randomPlan === SubscriptionPlanType.PREMIUM) {
      expiryDays = 30;
    }
    const expiresAt = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000);
    await prisma.groupSubscription.create({
      data: {
        plan: randomPlan,
        expiresAt,
        group: { connect: { id: group.id } },
      },
    });

    // Tworzymy 5 wydarzeń dla każdej grupy
    for (let j = 1; j <= 5; j++) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const eventUsersCount = Math.floor(Math.random() * 3) + 2;
      const randomEventUsers = getRandomSubset(users, eventUsersCount);
      const hostIndex = Math.floor(Math.random() * randomEventUsers.length);
      const moderatorIndex = Math.floor(Math.random() * randomMembers.length);

      const now = new Date();
      const startAt = new Date(now.getTime() + Math.floor(Math.random() * 7) * 86400000);
      const endAt = new Date(startAt.getTime() + 2 * 3600000);

      await prisma.event.create({
        data: {
          title: `Wydarzenie ${j} w grupie ${i}`,
          description: generateLoremIpsum(40),
          startAt,
          endAt,
          group: { connect: { id: group.id } },
          categories: { create: [{ category: { connect: { id: randomCategory.id } } }] },
          cities: { create: [{ city: { connect: { id: randomCity.id } } }] },
          users: {
            create: randomEventUsers.map((user, index) => ({
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
        },
      });
    }
  }

  console.log("✅ Groups & related data seeded!");

  // Tworzymy 10 wydarzeń samodzielnych
  const standaloneEventsCount = 10;
  for (let i = 1; i <= standaloneEventsCount; i++) {
    const hostUser = users[Math.floor(Math.random() * users.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    let randomEventUsers = getRandomSubset(users, Math.floor(Math.random() * 3) + 2);
    if (!randomEventUsers.find((u) => u.id === hostUser.id)) {
      randomEventUsers.push(hostUser);
    }

    const now = new Date();
    const startAt = new Date(now.getTime() + Math.floor(Math.random() * 7) * 86400000);
    const endAt = new Date(startAt.getTime() + 2 * 3600000);

    await prisma.event.create({
      data: {
        title: `Standalone Event ${i}`,
        description: generateLoremIpsum(40),
        startAt,
        endAt,
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
