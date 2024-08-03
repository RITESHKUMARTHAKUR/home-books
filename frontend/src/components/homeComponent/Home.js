import React, { useEffect, useState } from "react";
import "./Home.css";
import { Flame,MoveRight  } from 'lucide-react';
import Slider from "react-slick";
import { Link } from "react-router-dom";
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
import NotebookImg from "../../images/notebook.webp";
import StationaryImg from "../../images/stationary.webp";
import ProdCard2 from "../homeComponent/productCard2/ProductCard2";
import NotebooksCard from "./noteBooksCard/NotebooksCard";
import WhatsaapPng from "../../images/whatsapp.png";
import { toast } from "react-toastify";

const Home = () => {
  const {currentUser} = useAuth();
  const getPromotionUrl = `${process.env.REACT_APP_API_BASE_URL}/getPromotions`;
  const getSchoolUrl = `${process.env.REACT_APP_API_BASE_URL}/getSchool`;
  const getSchoolBooksUrl = `${process.env.REACT_APP_API_BASE_URL}/getBooks`;
  const addCartUrl = `${process.env.REACT_APP_API_BASE_URL}/addCart`;

  const [schoolDoc,setSchoolDoc] = useState([]);
  const [booksDoc,setBooksDoc] = useState([]);
  const [promotionDoc,setPromotionDoc] = useState([]);

  const [booksTwelve,setBooksTwelve] = useState([]);
  const [booksEleven,setBooksEleven] = useState([]);
  const [booksTen,setBooksTen] = useState([]);
  const [booksNine,setBooksNine] = useState([]);

  var settingsOffers = {
    dots: promotionDoc.length > 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed:1000,
    infinite: true,
    autoplaySpeed: 4500,
    cssEase: "linear",
    dots: false,
    // fade: true,
    responsive: [
      // {
      //   breakpoint: 1024,
      //   settings: {
      //     slidesToShow: 1,
      //     autoplay: true,
      //     speed: 100,
      //     fade: true,
      //     cssEase: 'linear',
      //     autoplaySpeed: 3000,
      //     slidesToScroll: 1,
      //     infinite: true,
      //     initialSlide: 0,
      //     dots: false
      //   }
      // },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          autoplay: true,
          speed: 1000,
          cssEase: 'linear',
          autoplaySpeed: 4500,
          slidesToScroll: 1,
          infinite: true,
          initialSlide: 0,
          dots: false
        }
      }
    ]
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
    const twelveBooks = booksInfo.filter(books => books.bookClass === "8" );
    setBooksTwelve(twelveBooks);

    const elevenBooks = booksInfo.filter(books => books.bookClass === "3" );
    setBooksEleven(elevenBooks);

    const tenBooks = booksInfo.filter(books => books.bookClass === "10" );
    setBooksTen(tenBooks);

    const nineBooks = booksInfo.filter(books => books.bookClass === "9" );
    setBooksNine(nineBooks);

  }

  const fetchPromotions = async () => {
    await fetch(getPromotionUrl,{
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }).then(async (response) => {
      if(response.ok) {
        const promotionData = await response.json();
        setPromotionDoc(promotionData);
      }
    });
      window.scrollTo(0, 0);
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
    const promise = new Promise( async (resolve,reject) => {
      fetch(getSchoolUrl, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        if (response.status !== 200) {
            toast("No school found!");
            reject("Server Error!")
        }else {
            response.json().then(schoolInfo => {
              setSchoolDoc(schoolInfo);
              resolve("Done!")
            });
            
        }
      })
    }); 
    toast.promise(promise, {
      pending: "loading...",
      // success: "Done!",
      error: "Error !",
    });
    
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
      // return titleString
      return titleString.slice(0,25)+ "...";
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
    fetchPromotions();
  },[]);

  return (
    <div className="homeContainer">
      <Link to={"https://wa.me/+919302086706?text=Hi,%20I'm%20interested%20in%20your%20Books%20for%20sale!%20"} className="whatsaap-icon-container">
        <img src={WhatsaapPng} className="whatsapp-icon" alt="" />
      </Link>
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
          {
            promotionDoc.length > 1 ?
            <Slider {...settingsOffers}>
              {
                promotionDoc.length>0 && promotionDoc.map(promotions => (
                  <div className="sliderDivImg">
                    <img src={promotions.promotionImg} alt="" />
                  </div>
                  
                ))
              }
          </Slider>
            :
            promotionDoc.length>0 && promotionDoc.map(promotions => (
              
              <div className="sliderDivImg">
                <img src={promotions.promotionImg} alt="" />
              </div>
            ))
          }
          
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
      
      <div className="homeSectionFifth">
            <NotebooksCard
              link={"/stationary"}
              noteBookimg={NotebookImg}
              title={"Notebooks"} 
            />
            <NotebooksCard
            link={"/stationary"}
              noteBookimg={StationaryImg}
              title={"Stationary"} 
            />
      </div>

      {/* ---------------------- Trending Books Section ---------------------- */}
        <div className="homeSectionSecond">
        <h3 className="sectionHeader">
          {" "}
          {/* <FaBolt /> */}
        
          <Flame strokeWidth={3} />
          
          &nbsp; Trending Books
        </h3>
        <div className="productDiv">
          {booksTwelve && booksTwelve.map(booksDoc => (
            <ProdCard2 
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
        </div>
        {/* <Slider {...settingsTwelve}>
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
          
          
          
        </Slider> */}
        </div>
      {/* ---------------------- Trending Books Section ---------------------- */}


      {/* Section class 11 */}
      {/* <div className="homeSectionSecond">
        <h3 className="sectionHeader">
          {" "}
          <FaBolt />
          &nbsp;CLass 11
        </h3>
        <div className="productDiv">
          {booksEleven && booksEleven.map(booksDoc => (
            <ProdCard2 
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
        </div> */}
        {/* <Slider {...settingsEleven}>
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

        </Slider> */}
      {/* </div> */}
      {/* Section class 11 */}


      {/* Section class 10 */}
      {/* <div className="homeSectionSecond">
        <h3 className="sectionHeader">
          {" "}
          <FaBolt />
          &nbsp;CLass 10
        </h3>
        <div className="productDiv">
          {booksTen && booksTen.map(booksDoc => (
            <ProdCard2 
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
        </div> */}
        {/* <Slider {...settingsTen}>
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

        </Slider> */}
      {/* </div> */}
      {/* Section class 10 */}

      {/* <div className="homeSectionSecond">
        <h3 className="sectionHeader">
          {" "}
          <FaBolt />
          &nbsp;CLass 9
        </h3>
         <div className="productDiv">
          {booksNine && booksNine.map(booksDoc => (
            <ProdCard2 
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
        </div> */}
        {/* <Slider {...settingsNine}>
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
        </Slider> */}
      {/* </div> */}
      {/* Section class 9 */}
      <div className="section-viewall">
        <Link to="/viewallBooks" className="viewall-btn">
          View More <MoveRight/>
        </Link>
      </div>
      
      <div className="homeSectionThird">
        <BenefitCard
          icon={<TbTruckDelivery />}
          title={"Nation Wide Delivery"}
          desc={
            "Get your books delivered right to your doorstep, no matter where you are in the world!"
          }
        />
        <BenefitCard
          icon={<FaIdCard />}
          title={"Safe Payment"}
          desc={
            "Secure transactions guaranteed: pay with confidence, every time!"
          }
        />
        <BenefitCard
          icon={<FaShieldHalved />}
          title={"Shop With Confidence"}
          desc={
            "Buy with trust: our commitment to quality and customer satisfaction!"
          }
        />
        <BenefitCard
          icon={<BiSupport />}
          title={"24/7 Support"}
          desc={
            "Need help? We're always here: 24/7 support for all your bookish needs!"
          }
        />
      </div>
    </div>
  );
};

export default Home;
