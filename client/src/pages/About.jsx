import { JobImg } from "../assets";
import { Meta } from "../components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const About = () => {
  return (
    <div className="container mx-auto flex flex-col gap-5 2xl:gap-14 py-6 ">
      <Meta
        title="Empowering Careers and Connections | Worknity"
        description="Learn about Worknity, your trusted job portal connecting job seekers with their dream opportunities and recruiters with top talent. Discover our mission to simplify job hunting and hiring"
        url="https://worknity.netlify.app/about-us"
        robots="index, follow"
      />
      <div className="w-full flex flex-col-reverse md:flex-row gap-10 items-center px-5 pt-5">
        <div className="w-full md:w-2/3 2xl:w-2/4">
          <h1 className="text-3xl text-blue-600 font-bold mb-5">About Us</h1>
          <p className="text-justify leading-7">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente
            aliquid ratione, voluptatibus similique enim laborum sint fugiat
            illum architecto ullam et quisquam dolorem distinctio quos? Sunt
            nulla magnam repellendus nesciunt. Provident nulla sapiente deserunt
            porro, maiores ad facere dolor quisquam vitae quis ducimus
            asperiores, aspernatur harum autem doloremque eos, quam cumque
            aperiam iste repellendus illo dignissimos nihil culpa? Nesciunt,
            illo?
          </p>
        </div>

        <LazyLoadImage
          alt={"About"}
          effect="blur"
          src={JobImg}
          className="w-auto md:w-[56rem] h-[180px] sm:h-[260px]"
        />
      </div>

      <div className="leading-8 px-5 text-justify">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia unde
          ipsa sapiente odit laudantium quos adipisci eligendi rem, in aut
          praesentium magnam optio at quasi ipsum a recusandae repellendus
          aperiam? Minima quibusdam, ipsa rerum ipsam nemo temporibus laboriosam
          neque accusantium quos voluptatum. Ipsa cupiditate tempore, voluptate,
          ad, at labore quia suscipit temporibus dolor sapiente cum voluptas
          doloremque aliquam obcaecati. Animi. Quaerat cupiditate, harum quae
          debitis ut totam ad facere natus aliquam itaque quos molestiae nam
          delectus rerum distinctio eum expedita quasi numquam at ab ipsam?
          Itaque commodi consequatur laboriosam accusantium. Aut quia quis fugit
          ullam modi architecto eaque sit vero voluptas ipsa. Iusto, aut ad
          similique qui aspernatur quam rem, harum deleniti culpa,
          necessitatibus doloribus provident suscipit sit magnam odit. Quidem
          soluta sint doloremque molestiae commodi consequuntur dolorum sunt
          placeat odio, voluptate suscipit laboriosam! Quidem nobis dignissimos
          reiciendis voluptate ut accusamus quis laborum dolorem numquam
          similique, suscipit ea deleniti. Iusto!
        </p>
      </div>
    </div>
  );
};

export default About;
