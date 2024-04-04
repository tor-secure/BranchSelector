import EbookImg1 from "../../assets/Ebook/Ebook1.png";
import EbookImg2 from "../../assets/Ebook/Ebook2.png";
import EBook1 from "../../assets/Ebook/Enginering_Lighthouse.pdf";
import EBook2 from "../../assets/Ebook/SurePass_Career.pdf";

function Ebook() {
  const book = [
    {
      img: EbookImg1,
      book: EBook1,
      bookName: "Enginering_Lighthouse",
      title: "Engineering Lighthouse v 3.0",
      description:
        "Our newest e-book presents a thorough and comprehensive reference for those aspiring to become engineers.",

      points: [
        "Detailed insights into the top branches within engineering",
        "Essential skills required for engineers",
        "Insights into the engineering journey and key milestones",
        "Entrance exams in India for engineering aspirants",
        "Campus interview tips and strategies",
      ],
    },
    {
      img: EbookImg2,
      book: EBook2,
      bookName: "SurePass_Career",
      title: "Career Path Chart",
      description:
        " Your comprehensive guide to navigating career paths after Class 12 in Science, Commerce, and Arts",
      points: [
        "Exploring various career options available in Science, Commerce, and Arts after completing Class 12.",
        "Stressing the importance of choosing the right course to pave the way for a successful career journey.",
        "Emphasizing the value of seeking expert guidance to ensure you're on the right path towards your desired career goals.",
      ],
    },
  ];

  return (
    <section
      className="py-14 min-h-[100vh]"
      style={{
        background:
          "linear-gradient(143.6deg, rgba(28, 124, 252, 0) 20.79%, rgba(28, 124, 252, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)",
      }}
    >
      {book.map((item, index) => (
        <div key={index} className="max-w-screen-xl mx-auto md:px-8 mb-32">
          <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
            <div className="flex-1 lg:block ml-24 md:mb-10 lg:mb-0">
              <img
                src={item.img}
                className="md:max-w-lg sm:rounded-lg w-2/3 shadow-xl"
                alt=""
              />
            </div>
            <div className="max-w-xl px-6 space-y-3 mt-6 sm:px-4 md:mt-0 lg:max-w-2xl">
              <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                {item.title}
              </p>
              <p className="mt-3 text-gray-600">
                {item.description}
                <ul className="mt-3">
                  {item.points.map((point,index) => (
                    <li key={index} className="mt-1 flex">
                      <span>&#10004;&nbsp;</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </p>

              <a
                href={item.book}
                download={item.bookName}
                className="inline-flex gap-x-1 items-center text-indigo-600 hover:text-indigo-500 duration-150 font-medium"
              >
                <button className="bg-blue-600 px-5 py-2 text-lg text-white rounded-lg mt-4">
                  Download
                </button>
              </a>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Ebook;
