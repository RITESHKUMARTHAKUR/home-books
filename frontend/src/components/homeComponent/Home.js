import React from "react";
import "./Home.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Book from "../../images/phys_book.jpg";
import {
  FaBolt,
  FaBookOpen,
  FaShieldHalved,
  FaIdCard,
  FaSchool,
} from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

import ProductCard from "./productCard/ProductCard";
import BenefitCard from "./benefitsCard/Benefit";
import SchoolCard from "../schoolComponent/schoolCard/schoolCard";

import BookImg from "../../images/phys_book.jpg";
import SchoolImg from "../../images/school.jpg";

const Home = () => {
  var settingsOffers = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 200,
    autoplaySpeed: 1500,
    cssEase: "linear",
  };
  var settingsProducts = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    speed: 200,
    autoplaySpeed: 1500,
    cssEase: "linear",
  };
  const id = "rrsheuf34hd";

  return (
    <div className="homeContainer">
      <div className="homeSectionFirst">
        <div className="categoriesBar">
          <Link>
            {" "}
            <FaBookOpen /> &nbsp; JEE Exam
          </Link>
          <Link>
            {" "}
            <FaBookOpen /> &nbsp; NEET Exam
          </Link>
          <Link>
            {" "}
            <FaBookOpen /> &nbsp; SSC, Railways
          </Link>
          <Link>
            {" "}
            <FaBookOpen /> &nbsp; Competative Exam
          </Link>
          <Link>
            {" "}
            <FaBookOpen /> &nbsp; All Stationary
          </Link>
          {/* <Link>
            {" "}
            <FaBookOpen /> &nbsp; C.B.S.E Board
          </Link> */}
        </div>
        <div className="productSlider">
          <Slider {...settingsOffers}>

            <div className="sliderDiv">
              <div className="sliderDivContent">
                <h1>
                  50% Off For Your First <br /> Shopping
                </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing
                  elit.Impedit sint iure velit saepe nemo magni dolorum dolorem
                  explicabo aliquam eaque?
                </p>
                <button>Visit Collections</button>
              </div>
              <div className="sliderDivImg">
                <img src={Book} alt="" />
              </div>
            </div>
            
            <div className="sliderDiv">
              <div className="sliderDivContent">
                <h1>
                  50% Off For Your First <br /> Shopping
                </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing
                  elit.Impedit sint iure velit saepe nemo magni dolorum dolorem
                  explicabo aliquam eaque?
                </p>
                <button>Visit Collections</button>
              </div>
              <div className="sliderDivImg">
                <img src={Book} alt="" />
              </div>
            </div>
            
          </Slider>
        </div>
      </div>

      <div className="homeSectionSecond">
        <h3 className="sectionHeader">
          {" "}
          <FaBolt />
          &nbsp;CLass 12
        </h3>
        <Slider {...settingsProducts}>
          <ProductCard
            link={`/product/${id}`}
            off={40}
            name={"Book"}
            price={200}
            img={BookImg}
          />
          <ProductCard
            link={`/product/${id}`}
            off={40}
            name={"Book"}
            price={200}
            img={BookImg}
          />
          <ProductCard
            link={`/product/${id}`}
            off={40}
            name={"Book"}
            price={200}
            img={BookImg}
          />
          <ProductCard
            link={`/product/${id}`}
            off={40}
            name={"Book"}
            price={200}
            img={BookImg}
          />
        </Slider>
      </div>
      <div className="homeSectionSecond">
        <h3 className="sectionHeader">
          {" "}
          <FaBolt />
          &nbsp;CLass 11
        </h3>
        <Slider {...settingsProducts}>
          <ProductCard
            link={`/product/${id}`}
            off={40}
            name={"Book"}
            price={200}
            img={BookImg}
          />
          <ProductCard
            link={`/product/${id}`}
            off={40}
            name={"Book"}
            price={200}
            img={BookImg}
          />
          <ProductCard
            link={`/product/${id}`}
            off={40}
            name={"Book"}
            price={200}
            img={BookImg}
          />
          <ProductCard
            link={`/product/${id}`}
            off={40}
            name={"Book"}
            price={200}
            img={BookImg}
          />
        </Slider>
      </div>
      <div className="homeSectionSecond">
        <h3 className="sectionHeader">
          {" "}
          <FaBolt />
          &nbsp;CLass 10
        </h3>
        <Slider {...settingsProducts}>
          <ProductCard
            link={`/product/${id}`}
            off={40}
            name={"Book"}
            price={200}
            img={BookImg}
          />
          <ProductCard
            link={`/product/${id}`}
            off={40}
            name={"Book"}
            price={200}
            img={BookImg}
          />
          <ProductCard
            link={`/product/${id}`}
            off={40}
            name={"Book"}
            price={200}
            img={BookImg}
          />
          <ProductCard
            link={`/product/${id}`}
            off={40}
            name={"Book"}
            price={200}
            img={BookImg}
          />
        </Slider>
      </div>
      <div className="homeSectionSecond">
        <h3 className="sectionHeader">
          {" "}
          <FaBolt />
          &nbsp;CLass 9
        </h3>
        <Slider {...settingsProducts}>
          <ProductCard
            link={`/product/${id}`}
            off={40}
            name={"Book"}
            price={200}
            img={BookImg}
          />
          <ProductCard
            link={`/product/${id}`}
            off={40}
            name={"Book"}
            price={200}
            img={BookImg}
          />
          <ProductCard
            link={`/product/${id}`}
            off={40}
            name={"Book"}
            price={200}
            img={BookImg}
          />
          <ProductCard
            link={`/product/${id}`}
            off={40}
            name={"Book"}
            price={200}
            img={BookImg}
          />
        </Slider>
      </div>

      <div className="homeSectionFourth">
        <h3 className="sectionHeader">
          {" "}
          <FaSchool />
          &nbsp; Schools
        </h3>
        <Slider {...settingsProducts}>
          <SchoolCard
            img={SchoolImg}
            link={`/school/${id}`}
            title={"D.P.S"}
            address={"Risali Sector"}
          />
          <SchoolCard
            img={SchoolImg}
            link={`/school/${id}`}
            title={"M.G.M"}
            address={"Bhilai Sector"}
          />
          <SchoolCard
            img={SchoolImg}
            link={`/school/${id}`}
            title={"K.P.S"}
            address={"Nehru Nagar"}
          />
          <SchoolCard
            img={SchoolImg}
            link={`/school/${id}`}
            title={"B.S.P"}
            address={"Sector 10"}
          />
          <SchoolCard
            img={SchoolImg}
            link={`/school/${id}`}
            title={"S.N.G"}
            address={"Sector 10"}
          />
        </Slider>
      </div>

      <div className="homeSectionThird">
        <BenefitCard
          icon={<TbTruckDelivery />}
          title={"World Wide Delivery"}
          desc={
            "We offer competitive prices on our 100 million plus product any range."
          }
        />
        <BenefitCard
          icon={<FaIdCard />}
          title={"Safe Payment"}
          desc={
            "We offer competitive prices on our 100 million plus product any range."
          }
        />
        <BenefitCard
          icon={<FaShieldHalved />}
          title={"Shop With Confidence"}
          desc={
            "We offer competitive prices on our 100 million plus product any range."
          }
        />
        <BenefitCard
          icon={<BiSupport />}
          title={"24/7 Support"}
          desc={
            "We offer competitive prices on our 100 million plus product any range."
          }
        />
      </div>
    </div>
  );
};

export default Home;
