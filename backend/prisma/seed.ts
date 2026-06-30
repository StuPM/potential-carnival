import prisma from "../src/lib/prisma.js";

async function main() {
  await prisma.$transaction([
    // Record 1: The Matrix
    prisma.media.create({
      data: {
        id: "film-603",
        type: "film",
        created: new Date(1770913547363),
        film: {
          create: {
            tmdbId: 603,
            title: "The Matrix",
            originalTitle: "The Matrix",
            originalLanguage: "en",
            overview:
              "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
            posterPath: "/p96dm7sCMn4VYAStA6siNz30G1r.jpg",
            releaseDate: new Date("1999-03-31"),
            watchedCount: 1,
            genres: ["action", "science fiction"],
          },
        },
        mediaHistory: {
          create: {
            finished: new Date("2025-05-05"),
            rating: 10,
            location: "cinema",
          },
        },
      },
    }),

    // Record 2: The Terminator
    prisma.media.create({
      data: {
        id: "film-218",
        type: "film",
        created: new Date(1771605136742),
        film: {
          create: {
            tmdbId: 218,
            title: "The Terminator",
            originalTitle: "The Terminator",
            originalLanguage: "en",
            overview:
              'In the post-apocalyptic future, reigning tyrannical supercomputers teleport a cyborg assassin known as the "Terminator" back to 1984 to kill Sarah Connor, whose unborn son is destined to lead insurgents against 21st century mechanical hegemony. Meanwhile, the human-resistance movement dispatches a lone warrior to safeguard Sarah. Can he stop the virtually indestructible killing machine?',
            posterPath: "/qvktm0BHcnmDpul4Hz01GIazWPr.jpg",
            releaseDate: new Date("1984-10-26"),
            watchedCount: 1, 
            genres: ["action" ,"thriller", "science fiction"],
          },
        },
        mediaHistory: {
          create: {
            finished: new Date("2026-05-05"),
            rating: 10,
            location: "cinema",
          },
        },
      },
    }),
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
