
"use client"

import { useState} from "react";
import { Link } from "react-router-dom";


const Home = () => {
  

  const [redbtn , setredbtn] = useState(false);

  return (
    <div className=''>
        
        <div 
          className="mainpage-1 flex flex-col justify-center "
        >
          <div className="flex flex-row ">
            <div className="w-1/2 flex flex-col">
              <div className=" flex flex-row justify-center">
                {/* <Image
                  src="/assests/img/LingULabel.svg"
                  alt="SuLogo Logo"
                  className=""
                  width={480}
                  height={180}

                  priority 
                /> */}
                <img src="./assests/img/LingULabel.png" alt="" className="" width="400" height="400" />
                
              </div>

              
              <div className="flex flex-row justify-center">
                <p className='description '>
                  學生會為嶺南大學唯一代表全體全日制學生的學生組織。
                </p>

              </div>
              

              <div className="flex flex-row py-10 justify-center">
                <div className='flex flex-col items-center'>
                  <button 
                    className=" w-0 red_btn "
                    onClick={()=>setredbtn((prev)=>!prev)}
                  > 
                  </button>
                  
                  {redbtn && (
                      // <ul className="hover-list selectlink ">
                      //   <li>商店 Shop</li>
                      //   <li>活動 Event</li>
                      //   {/* <li>Cart</li> */}
                      // </ul>
                      <div className='dropdown flex flex-col'>
                        {/* <Link
                          href='/shop'
                          className='dropdown_link text-su-green text-lg font-semibold py-5'
                          onClick={() => {}}
                        >
                          商店 Shop
                        </Link> */}
                        <Link 
                            to={"shop"}
                            className="dropdown_link text-su-green text-lg font-semibold py-5"
                        >
                            商店 Shop
                        </Link>
                        
                        <Link 
                            to={"events"}
                            className="dropdown_link text-su-green text-lg font-semibold py-5"
                        >
                            活動 Event
                        </Link>
                        
                      </div>
                  )}
                  
                </div>
                
              </div>
              
            </div>


            <div className="w-1/2" >
              <div className="flex flex-row justify-center">
                {/* <Image
                  src="/assests/img/Events.svg"
                  alt="SuLogo Logo"
                  className=""
                  width={360}
                  height={120}
                  priority 
                /> */}
                <img src="./assests/img/Events.png" alt="" className="" width="300" height="300" />

              </div>
            </div>
            
           
          </div>
          
        
        </div>

        <div 
          className="mainpage flex flex-col items-center "
        >
         
         <img 
            src     =".\assests\img\aboutusphoto.svg" 
            alt     = "promptation logo"
            width   = {1000}
            height  = {1000}
            className = "object-contain p-20"
          />
          <span
            className='flex flex-row justify-center py-10'
          >
            
            
            <img src="./assests/img/AboutUs.png" alt="" className="" width="200" height="200" />
          </span>

          <br />

          <span
            className='flex flex-row justify-center'
          >
            <p
                className='w-10/12 justify-self-center' 
              >
              嶺南大學學生會成立於一九六七年，是唯一代表全體全日制學生的學生組織，並經香港社團註冊條例註冊的合法組織。嶺南大學學生會現時約有三千多名會員，包括所有嶺南大學全日制學士、碩士研究生以及嶺南大學社區學院全日制副學士（除未有辦理入會手續或退會者外）。 本會的組成包括幹事會、編輯委員會、代表會及仲議會四個中央組織，以及三個課程聯會和二十多個屬會。幹事會負責行政工作、編輯委員會負責出版及傳媒監察、代表會負責立法及監察，而仲議會則負責仲裁。 本會多年來堅持以發揚民主自治、團結及互助精神；謀求會員福利、保障會員權益；培養會員社會意識及責任感；關心社會問題、促進社會發展；以及與校方及校外團體緊密聯繫作為本會宗旨，為同學及社會服務。
            </p>
          </span>
            
            <br />
          <span
            className='flex flex-row justify-center py-10'
          >

            <p
              className='w-10/12'
            >
            The Lingnan University Students' Union was established in 1967 and is the only student organization representing all full-time students. It is a legal organization registered under the Hong Kong Societies Ordinance. The Students' Union has over 3,000 members, including all full-time undergraduate and postgraduate students at Lingnan University and full-time associate degree students at Lingnan College (excluding those who have not completed the membership procedures or resigned). The Students' Union is composed of four central organizations: the Executive Committee, the Editorial Board, the Representative Council, and the Mediation Council, as well as three course associations and more than 20 affiliated clubs. The Executive Committee is responsible for administrative work, the Editorial Board is responsible for publishing and media monitoring, the Representative Council is responsible for legislation and monitoring, and the Mediation Council is responsible for arbitration. For many years, the Students' Union has been committed to promoting democratic autonomy, unity, and mutual assistance; seeking members' welfare and protecting their rights and interests; cultivating members' social awareness and sense of responsibility; caring about social issues and promoting social development; and maintaining close contact with the university and external organizations as its mission, to serve students and society.
            </p>
          </span>
          
        </div>

        <div className="mainpage flex flex-col">
          <div
            className='flex flex-row justify-center  py-10'
          >
            <div
              className='justify-self-center'
            >
              {/* <Image
                src="/assests/img/Structure.png"
                alt="SuLogo Logo"
                className=""
                width={800}
                height={40}
                priority 
              /> */}
              <img src="./assests/img/Structure.png" alt="" className="" width="800" height="800" />
               
            </div>

          </div>
          <div
            className='flex flex-row justify-center py-5'
          >
            <p className="flex flex-col justify-center selectlink">   
              
              <p className="selectlink">結構 Structure</p>
            </p>
          </div>
          
          <div
            className='flex flex-row justify-center'
          >
            
            <div className="flex flex-col justify-center selectlink text-center">
              
             
              <Link
                to={"/structure/exco"}
                className="py-5"
              >
                幹事會 Secretary
              </Link>

              <Link
                className="py-5"
                to={"/structure/deputation"}
              >
                代表會 Deputation
              </Link>

              <Link
                to={"/structure/judicial"}
                className="py-5"
              >
                仲議會 Judicial Council
              </Link>

              <Link
                to={"/structure/editorialboard"}
                className="py-5"
              >
                編輯委員會 Editorial Board
              </Link>
              
                
            </div>

          </div>
            
          
        </div>
        
        <div className="mainpage py-20">
          <div className="flex flex-row justify-center">
            <div className="flex flex-col justify-center">
              <div className="flex flex-col justify-center">
                {/* <Image
                  src="/assests/img/societyText.svg"
                  alt="SuLogo Logo"
                  className=""
                  width={120}
                  height={40}
                  priority 
                /> */}
              </div>

              <div className="flex flex-col justify-center">
                <p className=''>
                由嶺大學生會會員組織而成立的興趣及宗教團體，<br /> 並經向學生會註冊，均稱為學生會會屬會。
                </p>
              </div>

              <div className="flex flex-col justify-center">
                
              </div>

            </div>
            <div className="flex flex-col justify-center">
              {/* <Image
                src="/assests/img/Society.png"
                alt="SuLogo Logo"
                className=""
                width={360}
                height={120}
                priority 
              /> */}
            </div>
            
          </div>
        </div>
    </div>
    
    
  )
}

export default Home


