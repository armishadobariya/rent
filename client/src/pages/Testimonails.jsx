import React from "react";

const Testimonails = () => {
  const posts = [
    {
      id: 1,
      description:
        "I was skeptical about finding the right PG accommodation, but RentNest exceeded my expectations. The detailed property descriptions and verified listings gave me confidence, and the seamless process made it stress-free.",
      date: "Nov 18, 2023",
      datetime: "2023-11-18",
      stars: 5,
      author: {
        name: "Siddharth",
        role: "Working Professional",
        href: "#",
        imageUrl:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
    {
      id: 2,
      description:
        "The RentNest team understands the challenges of finding affordable accommodation in Bangalore. Their commitment to providing quality options for all budgets sets them apart. A reliable companion in your house-hunting journey!",
      date: "Oct 24, 2023",
      datetime: "2023-10-24",
      stars: 5,
      author: {
        name: "Anonymous",
        role: "Business Man",
        href: "#",
        imageUrl:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      },
    },
    {
      id: 3,
      description:
        "RentNest helped me connect with reliable flatmates in no time. The chat feature is a game-changer, allowing us to communicate and coordinate effortlessly. Thanks for making my move to Bangalore a smooth transition!",
      date: "Oct 15, 2023",
      datetime: "2023-10-15",
      stars: 4,
      author: {
        name: "Shubash",
        role: "Student",
        href: "#",
        imageUrl:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      },
    },
    // More posts...
  ];
  return (
    <div className="bg-white pb-10 ">
      <div className="mx-auto max-w-8xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Happy Cutomers
          </h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-10 sm:pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="flex items-center gap-x-2 text-xs">
                <time dateTime={post.datetime} className="text-gray-500">
                  {post.date}
                </time>
                {Array(post.stars)
                  .fill(1)
                  .map((_, index) => (
                    <img src="/star.svg" alt="star" className="w-5 h-5" />
                  ))}
              </div>
              <div className="group relative">
                <p className="mt-5  text-sm leading-6 text-gray-600">
                  {post.description}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  src={post.author.imageUrl}
                  alt=""
                  className="h-10 w-10 rounded-full bg-gray-50"
                />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <a href={post.author.href}>
                      <span className="absolute inset-0" />
                      {post.author.name}
                    </a>
                  </p>
                  <p className="text-gray-600">{post.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonails;
