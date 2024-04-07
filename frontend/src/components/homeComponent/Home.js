import React, { useEffect, useState } from "react";
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
import {useAuth} from '../../contexts/AuthContext';
import BookImg from "../../images/phys_book.jpg";
import SchoolImg from "../../images/school.jpg";
import { toast } from "react-toastify";

const Home = () => {
  const {currentUser} = useAuth();
  const getSchoolUrl = `${process.env.REACT_APP_API_BASE_URL}/getSchool`;
  const getSchoolBooksUrl = `${process.env.REACT_APP_API_BASE_URL}/getBooks`;
  const addCartUrl = `${process.env.REACT_APP_API_BASE_URL}/addCart`;

  const [schoolDoc,setSchoolDoc] = useState([]);
  const [booksDoc,setBooksDoc] = useState([]);

  const [booksTwelve,setBooksTwelve] = useState([]);
  const [booksEleven,setBooksEleven] = useState([]);
  const [booksTen,setBooksTen] = useState([]);
  const [booksNine,setBooksNine] = useState([]);

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

  var settingsTwelve = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4 ,
    slidesToScroll: 1 ,
    autoplay: false,
    speed: 200,
    autoplaySpeed: 1500,
    cssEase: "linear",
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4 ,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
    // dots: false,
    // infinite: true,
    // slidesToShow: 4 ,
    // // slidesToShow: 4 ,
    // slidesToScroll: 1,
    // autoplay: false,
    // speed: 200,
    // autoplaySpeed: 1500,
    // cssEase: "linear",
  };
  var settingsEleven = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4 ,
    slidesToScroll: 1 ,
    autoplay: false,
    speed: 200,
    autoplaySpeed: 1500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4 ,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
    // dots: false,
    // infinite: true,
    // slidesToShow: 4 ,
    // // slidesToShow: 4 ,
    // slidesToScroll: 1,
    // autoplay: false,
    // speed: 200,
    // autoplaySpeed: 1500,
    // cssEase: "linear",
  };
  var settingsTen = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4 ,
    slidesToScroll: 1 ,
    autoplay: false,
    speed: 400,
    autoplaySpeed: 1000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4 ,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: booksTen.length >9 ? false: true
        }
      }
    ]
    // dots: false,
    // infinite: true,
    // slidesToShow: 4 ,
    // // slidesToShow: 4 ,
    // slidesToScroll: 1,
    // autoplay: false,
    // speed: 200,
    // autoplaySpeed: 1500,
    // cssEase: "linear",
  };
  var settingsNine = {
    dots: false,
    infinite: true,
    slidesToShow: 4 ,
    slidesToScroll: 1 ,
    autoplay: false,
    speed: 200,
    autoplaySpeed: 1500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4 ,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: booksNine.length >9 ? false: true,
        }
      }
    ]
    // dots: false,
    // infinite: true,
    // slidesToShow: 4 ,
    // // slidesToShow: 4 ,
    // slidesToScroll: 1,
    // autoplay: false,
    // speed: 200,
    // autoplaySpeed: 1500,
    // cssEase: "linear",
  };

  var settingsSchools = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: schoolDoc.length === 3 ? 3:4 ,
    slidesToScroll: 1 ,
    autoplay: false,
    speed: 200,
    autoplaySpeed: 1500,
    cssEase: "linear",
    initialSlide: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: schoolDoc.length === 3 ? 3:4 ,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          autoplay: booksNine.length > 9 ? true: false,
          speed: 200,
          autoplaySpeed: 150,
          slidesToScroll: 1,
          infinite: true,
          initialSlide: 3,
          dots: true
        }
      }
    ]
  };

  const setBooks = (booksInfo) => {
    const twelveBooks = booksInfo.filter(books => books.bookClass === "2" );
    setBooksTwelve(twelveBooks);

    const elevenBooks = booksInfo.filter(books => books.bookClass === "3" );
    setBooksEleven(elevenBooks);

    const tenBooks = booksInfo.filter(books => books.bookClass === "10" );
    setBooksTen(tenBooks);

    const nineBooks = booksInfo.filter(books => books.bookClass === "9" );
    setBooksNine(nineBooks);

  }


  const fetchBooks = async () => {

    await fetch(getSchoolBooksUrl, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status !== 200) {
          toast("No school found!");
      }else {
          response.json().then(booksInfo => {
            setBooksDoc(booksInfo);
            setBooks(booksInfo);
          })
      }
    })
  };

  const fetchSchools = () => {
    fetch(getSchoolUrl, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status !== 200) {
          toast("No school found!");
      }else {
          response.json().then(schoolInfo => {
              setSchoolDoc(schoolInfo);
          })
      }
    })
  };

  const handleAddToCart = async (productId) => {
    const bookId = productId;
    if(currentUser){
      const bookIndex = booksDoc.findIndex( obj => obj._id === bookId );
      const bookDetails = booksDoc[bookIndex];
    
      const cartDoc = await fetch(addCartUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({bookDetails,currentUser})
      });
      if(cartDoc.status === 200 ){
        toast.success("Added to Cart!");
        
      }else {
        toast.error("Failed to add!");
      }

    }else{
      toast.error("Login First!")
    }
  
  }

  const getTitle = (titleString) => {
    if(titleString.length > 16){
      return titleString.slice(0,16)+ "...";
    }else{
      return titleString
    }
  } 

  const getImage = (productImage) => {
    if(productImage.slice(0,1) === "u") {
      return BookImg;
    }
    else {
      return productImage;
    }
  }

  useEffect(() => {
    fetchSchools();
    fetchBooks();
  },[]);
  

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

      {/* ---------------------- School Slider Starts ---------------------- */}
        <div className="homeSectionFourth">
          <h3 className="sectionHeader">
            {" "}
            <FaSchool />
            &nbsp; Schools
          </h3>
          <Slider {...settingsSchools}>
            {schoolDoc && schoolDoc.map((schoolInfo,index) => (
              <SchoolCard
              // img={`${process.env.REACT_APP_API_BASE_URL + "/" + schoolInfo.schoolImg}`}
              img={schoolInfo.schoolImg}
              link={`/school/${schoolInfo._id}`}
              title={schoolInfo.schoolName}
              address={schoolInfo.area}
            />
            ) )}
          
          </Slider>
        </div>
      {/* ---------------------- School Slider Ends ---------------------- */}

      <div className="homeSectionSecond">
        <h3 className="sectionHeader">
          {" "}
          <FaBolt />
          &nbsp;CLass 12
        </h3>
        <Slider {...settingsTwelve}>
          {booksTwelve && booksTwelve.map(booksDoc => (
            <ProductCard
            link={`/product/${booksDoc._id}`}
            off={25}
            name={getTitle(booksDoc.title)}
            price={booksDoc.price}
            discount={booksDoc.discount}
            cartFun={handleAddToCart}
            cartId={booksDoc._id}
            img={getImage(booksDoc.bookImg)}
            />
          ))}
          
          
          
        </Slider>
      </div>

      <div className="homeSectionSecond">
        <h3 className="sectionHeader">
          {" "}
          <FaBolt />
          &nbsp;CLass 11
        </h3>
        <Slider {...settingsEleven}>
          {booksEleven && booksEleven.map(booksDoc => (
            <ProductCard
            link={`/product/${booksDoc._id}`}
            off={25}
            name={getTitle(booksDoc.title)}
            price={booksDoc.price}
            discount={booksDoc.discount}
            cartFun={handleAddToCart}
            cartId={booksDoc._id}
            img={getImage(booksDoc.bookImg)}
            />
          ))}
          
         
          
        </Slider>
      </div>

      <div className="homeSectionSecond">
        <h3 className="sectionHeader">
          {" "}
          <FaBolt />
          &nbsp;CLass 10
        </h3>
        <Slider {...settingsTen}>
          {booksTen && booksTen.map(booksDoc => (
            <ProductCard
            link={`/product/${booksDoc._id}`}
            off={25}
            name={getTitle(booksDoc.title)}
            price={booksDoc.price}
            discount={booksDoc.discount}
            cartFun={handleAddToCart}
            cartId={booksDoc._id}
            img={getImage(booksDoc.bookImg)}
            />
          ))} 

        </Slider>
      </div>

      <div className="homeSectionSecond">
        <h3 className="sectionHeader">
          {" "}
          <FaBolt />
          &nbsp;CLass 9
        </h3>
        <Slider {...settingsNine}>
          {booksNine && booksNine.map(booksDoc => (
            <ProductCard
            link={`/product/${booksDoc._id}`}
            off={25}
            name={getTitle(booksDoc.title)}
            price={booksDoc.price}
            discount={booksDoc.discount}
            cartFun={handleAddToCart}
            cartId={booksDoc._id}
            img={getImage(booksDoc.bookImg)}
            />
          ))}
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
