import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

function getRandomSubset<T>(array: T[], count: number): T[] {
  return array.sort(() => 0.5 - Math.random()).slice(0, count);
}

function generateLoremIpsum(wordCount: number): string {
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.";
  const words = lorem.split(" ");
  let result = "";
  // Powtarzamy tekst, aż uzyskamy co najmniej wordCount słów
  while (result.split(" ").length < wordCount) {
    result += lorem + " ";
  }
  return result.split(" ").slice(0, wordCount).join(" ");
}

async function main() {
  // ---------------------------
  // Utworzenie kategorii
  // ---------------------------
  const categoriesData = [
    { value: "tech", label: "Technologia" },
    { value: "music", label: "Muzyka" },
    { value: "sports", label: "Sport" },
    { value: "art", label: "Sztuka" },
    { value: "science", label: "Nauka" },
  ];

  const categories = [];
  for (const cat of categoriesData) {
    const category = await prisma.category.create({ data: cat });
    categories.push(category);
  }

  console.log("✅ Categories seeded!");

  // ---------------------------
  // Utworzenie miast
  // ---------------------------
  const citiesData = [
    { value: "NY", label: "New York" },
    { value: "LDN", label: "London" },
    { value: "PAR", label: "Paris" },
    { value: "BER", label: "Berlin" },
    { value: "TKY", label: "Tokyo" },
  ];

  const cities = [];
  for (const cityData of citiesData) {
    const city = await prisma.city.create({ data: cityData });
    cities.push(city);
  }

  console.log("✅ Cities seeded!");

  // ---------------------------
  // Utworzenie użytkowników wraz z profilami
  // ---------------------------
  const users = [];

  const adminUser = await prisma.user.create({
    data: {
      id: "1418bfc2-9a78-4dd1-988c-25962eb51af2",
      email: `admin@admin.com`,
      username: `admin`,
      role: Role.ADMIN,
      smallPhoto: "128x128",
      mediumPhoto: "256x256",
      largePhoto: "512x512",
      profile: {
        create: {
          bio: `Bio admina`,
        },
      },
    },
  });

  users.push(adminUser);

  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.create({
      data: {
        email: `user${i}@example.com`,
        username: `user${i}`,
        role: Role.USER,
        smallPhoto: "128x128",
        mediumPhoto: "256x256",
        largePhoto: "512x512",
        profile: {
          create: {
            bio: `To jest bio użytkownika user${i}`,
          },
        },
      },
    });
    users.push(user);
  }

  console.log("✅ Users seeded!");

  // ---------------------------
  // Utworzenie grup, wydarzeń oraz komentarzy
  // ---------------------------
  const groups = [];
  for (let i = 1; i <= 5; i++) {
    // Wybierz losowo 2 kategorie oraz 2 miasta dla grupy
    const randomCategories = getRandomSubset(categories, 2);
    const randomCities = getRandomSubset(cities, 2);
    // Wybierz losowo 3-5 użytkowników, którzy będą członkami grupy
    const membersCount = Math.floor(Math.random() * 3) + 3; // 3,4,5
    const randomMembers = getRandomSubset(users, membersCount);
    const hostIndex = Math.floor(Math.random() * randomMembers.length);

    const group = await prisma.group.create({
      data: {
        title: `Grupa ${i}`,
        // Generujemy opis z 30 słów Lorem Ipsum
        description: generateLoremIpsum(30),
        isVerified: i % 2 === 0, // na przemian true/false
        sponsoredUntil: new Date(new Date().setDate(new Date().getDate() + i * 10)),
        smallPhoto: "128x128",
        mediumPhoto: "256x256",
        largePhoto: "512x512",
        categories: {
          create: randomCategories.map((cat) => ({
            category: {
              connect: { id: cat.id },
            },
          })),
        },
        cities: {
          create: randomCities.map((city) => ({
            city: {
              connect: { id: city.id },
            },
          })),
        },
        users: {
          create: randomMembers.map((user, index) => ({
            user: { connect: { id: user.id } },
            isHost: index === hostIndex,
            isModerator: false,
          })),
        },
      },
    });
    groups.push(group);

    // ---------------------------
    // Utworzenie wydarzeń dla danej grupy (3 wydarzenia)
    // ---------------------------
    for (let j = 1; j <= 3; j++) {
      // Wybierz losowo jedną kategorię oraz jedno miasto dla wydarzenia
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];

      // Wybierz losowo 2-4 użytkowników, którzy będą uczestnikami wydarzenia
      const eventUsersCount = Math.floor(Math.random() * 3) + 2; // 2,3,4
      const randomEventUsers = getRandomSubset(users, eventUsersCount);
      const hostIndex = Math.floor(Math.random() * randomEventUsers.length);

      const now = new Date();
      const startAt = new Date(now.getTime() + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000); // wydarzenie do 7 dni do przodu
      const endAt = new Date(startAt.getTime() + 2 * 60 * 60 * 1000); // trwające 2 godziny

      await prisma.event.create({
        data: {
          title: `Wydarzenie ${j} w grupie ${i}`,
          // Generujemy opis wydarzenia z 40 słów Lorem Ipsum
          description: generateLoremIpsum(40),
          startAt: startAt,
          endAt: endAt,
          group: {
            connect: { id: group.id },
          },
          categories: {
            create: [
              {
                category: { connect: { id: randomCategory.id } },
              },
            ],
          },
          cities: {
            create: [
              {
                city: { connect: { id: randomCity.id } },
              },
            ],
          },
          users: {
            create: randomEventUsers.map((user, index) => ({
              user: { connect: { id: user.id } },
              isHost: index === hostIndex,
              isModerator: false,
            })),
          },
        },
      });
    }

    // ---------------------------
    // Utworzenie komentarzy dla grupy (2-4 komentarze)
    // ---------------------------
    const commentCount = Math.floor(Math.random() * 3) + 2; // 2,3,4
    for (let k = 1; k <= commentCount; k++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      await prisma.comment.create({
        data: {
          rate: Math.floor(Math.random() * 5) + 1, // ocena od 1 do 5
          // Generujemy treść komentarza z 20 słów Lorem Ipsum
          content: generateLoremIpsum(20),
          user: {
            connect: { id: randomUser.id },
          },
          group: {
            connect: { id: group.id },
          },
        },
      });
    }
  }

  console.log("✅ Groups seeded!");
  console.log("🎉 Database seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
