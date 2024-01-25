import logo from './logo.svg';
import './App.css';
import { MdRefresh } from "react-icons/md";
import { FaEquals, FaMinus, FaPlus, FaBomb, FaQuestion } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { GiSpeaker } from "react-icons/gi";
import { TbLetterISmall } from "react-icons/tb";
import { GrDiamond } from "react-icons/gr";
import { v4 } from 'uuid';
function App() {
  const [mines, setMines] = useState(1)
  const [tiles, setTiles] = useState([])
  const [start, setStart] = useState(false);
  const [prevData, setPrevData] = useState([]);
  const [value, setValue] = useState("0.0000010");
  const [max, setMax] = useState(true);
  const [equal, setEqual] = useState(false);

  const fisherYatesShuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array
  }
  useEffect(() => {
    const diom = Array.from({ length: 25 - mines }).map((item, index) => {
      return { id: index + 1, value: "diamonds" }
    })
    const bom = Array.from({ length: mines }).map((item, index) => {
      const unId = v4()
      return { id: unId, value: "mine" }
    })
    const newArr = [...diom, ...bom]
    setTiles(fisherYatesShuffle(newArr))
  }, [mines])
  const isFlipped = (id) => {
    return prevData.some((item) => item.id === id)
  }
  const handleClasses = (item) => {
    const isFlip = isFlipped(item.id)

    if (start && !isFlip) {
      return { class: "text-white tiles_element d-flex justify-content-center" }
    }
    if (start && isFlip) {
      return { class: prevData.find(it => it.id === item.id && it.flipped) ? "tiles_element1 opactiy-1" : "tiles_element1 opactiy-05", ...item }
    }
    else {
      return { class: "text-white tiles_element_play d-flex justify-content-center" }
    }
  }
  const fillTiles = (item) => {
    const newItem = { ...item, flipped: true }
    const newprevData = [...prevData, newItem]
    const newArr = tiles.map((item) => {
      const tile = newprevData.every((it) => it.id !== item.id)
      if (tile) {
        return { ...item, flipped: false }
      }
      return { ...item, flipped: true }
    }

    )
    setPrevData(newArr);
  }
  console.log(mines, "mines")
  return (
    <div className="App bg-black">
      <div className="container">
        <div className="row">
          <div className="col-md-12 ">
            <div className="mines">
              <div className="row">
                <div className="col-md-4 bg_dark">
                  <div className="left_mines">
                    <h5 className='text-white text-start mb-0'>{mines} mines</h5>
                    <input type='range' min="1" max="10" step="1" onChange={(e) => setMines(e.target.value)} value={mines} className='range_slider mb-4 w-100' />
                    <button className={` w-100 position-relative py-3 fw-bolder ${start ? 'start_play_btn' : 'play_btn'}`} onClick={() => setStart(true)}>
                      {start ? "PICK A TILE" : "PLAY"}
                      {start ? null : <span className="position-absolute refresh_btn">
                        <svg
                          className="sc-gJjChS hRNhRx"
                          width="100%"
                          height="100%"
                          viewBox="0 0 44 44"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <rect fillOpacity="0.25" fill="#141414" x="0" y="0" width="44" height="44" rx="21.8181818"></rect>
                            <path
                              d="M22,7 C30.1930995,7 36.8519914,13.5687236 36.9975667,21.7270616 L38.6342087,21.7272727 C38.9354549,21.7272727 39.1796632,21.971481 39.1796632,22.2727273 C39.1796632,22.4048607 39.1316994,22.5325021 39.0446827,22.6319372 L36.4282273,25.6217959 C36.2298412,25.8484945 35.8852419,25.8714462 35.6585434,25.67306 C35.6403203,25.6571128 35.6231795,25.6399698 35.6072346,25.6217448 L32.9914371,22.631886 C32.7930792,22.4051628 32.8160739,22.0605664 33.0427971,21.8622085 C33.1422255,21.7752197 33.2698459,21.7272727 33.4019559,21.7272727 L34.996,21.727 L34.9964496,21.6931438 C34.8334283,14.6551918 29.0771346,9 22,9 C14.8202983,9 9,14.8202983 9,22 C9,29.1797017 14.8202983,35 22,35 C25.6998147,35 29.0386391,33.4544168 31.4060337,30.97369 C31.588614,30.8075398 31.8302871,30.7037484 32.096202,30.7037484 C32.6484867,30.7037484 33.096202,31.1514637 33.096202,31.7037484 C33.096202,32.003464 32.9643477,32.2723832 32.7554817,32.4556638 L32.8198595,32.3889951 C30.0902834,35.231056 26.2517212,37 22,37 C13.7157288,37 7,30.2842712 7,22 C7,13.7157288 13.7157288,7 22,7 Z"
                              fill="#141414"
                              opacity="0.7"
                            ></path>
                            <path
                              d="M19.835124,26.9090909 L19.835124,23.4670846 L24.5557851,23.4670846 L24.5557851,26.9090909 L26.5590909,26.9090909 L26.5590909,20.2695925 C26.5590909,19.5172414 26.3078512,18.9153605 25.8053719,18.4639498 L25.8053719,18.4639498 L23.0681818,16 L21.3227273,16 L18.5855372,18.4639498 C18.0830579,18.9153605 17.8318182,19.5172414 17.8318182,20.2695925 L17.8318182,20.2695925 L17.8318182,26.9090909 L19.835124,26.9090909 Z M24.5557851,21.8119122 L19.835124,21.8119122 L19.835124,20.3636364 C19.835124,20.0501567 19.9210744,19.8119122 20.0929752,19.6489028 C21.4285124,18.3949843 22.1227273,17.7304075 22.1756198,17.6551724 L22.1756198,17.6551724 L24.2979339,19.6489028 C24.4698347,19.799373 24.5557851,20.0376176 24.5557851,20.3636364 L24.5557851,20.3636364 L24.5557851,21.8119122 Z"
                              fill="#141414"
                              fillRule="nonzero"
                              opacity="0.7"
                            ></path>
                          </g>
                        </svg>
                      </span>}

                    </button>
                    <div className='stake'>
                      {max ? <><div className='text-white'>
                        <div className=' stake_btn d-flex justify-content-center align-items-center mb-2 cursor-pointer' onClick={() => value == "0.000001" ? null : setValue(value / 2)}>
                          <FaMinus color='white' />
                        </div>
                        <div className=' stake_btn d-flex justify-content-center align-items-center cursor-pointer'>
                          MIN
                        </div>


                      </div>
                        <div className='text-white d-flex align-items-center justify-content-center flex-column'>
                          <h4 className='mb-0'>{value}</h4>
                          <p className='mb-0'>
                            $0.00 STAKE
                          </p>
                        </div>
                        <div className='text-white'>
                          <div className=' stake_btn d-flex justify-content-center align-items-center mb-2 cursor-pointer' onClick={() => value == "0.000008" ? null : setValue(value * 2)}>
                            <FaPlus color='white' />
                          </div>
                          <div className=' stake_btn d-flex justify-content-center align-items-center cursor-pointer' onClick={() => setMax(!max)}>
                            MAX
                          </div>


                        </div></> :

                        <><div className='text-white'>

                          <div className=' stake_btn d-flex justify-content-center align-items-center play_btn '>
                            YES
                          </div>


                        </div>
                          <div className='text-white d-flex align-items-center justify-content-center flex-column'>
                            <h6 className='mb-0'>Set Stack To The Max Point</h6>

                          </div>
                          <div className='text-white'>

                            <div className=' stake_btn d-flex justify-content-center align-items-center start_play_btn cursor-pointer' onClick={() => setMax(!max)} >
                              NO
                            </div>


                          </div></>}

                    </div>
                  </div>

                </div>
                <div className="col-md-8 py-2 right_mines">
                  <h6 className='text-white position-relative my-4'>MAX PAYOUT x2,254.00
                    <span className="position-absolute equal_btn">
                      <span className='cursor-pointer position-relaive' onClick={() => setEqual(!equal)}>
                        <FaEquals />
                        {equal && <div className=' d-flex flex-column position-absolute equal_btnn'>
                          <div>
                            <FaQuestion size={21} />
                          </div>
                          <div>
                            <GiSpeaker size={21} />
                          </div>
                          <div>
                            <TbLetterISmall size={25} />
                          </div>
                        </div>}

                      </span>

                    </span></h6>
                  <div className='tiles '>

                    {
                      tiles.map((item, index) => {
                        const getValue = handleClasses(item)
                        return (


                          <div key={item.id} className={getValue.class} onClick={() => {
                            if (start) {


                              if (item.value === "mine") {
                                fillTiles(item)
                              } else {
                                setPrevData((prev) => [...prev, { ...item, flipped: true }])
                              }
                            }
                          }
                          } >
                            {getValue.value === "mine" && <div className='d-flex align-items-center justify-content-center'><FaBomb size={35} color='white' /></div>}
                            {getValue.value === "diamonds" && <div className='d-flex align-items-center'><GrDiamond size={35} color='white' /></div>}
                          </div>


                        )
                      })
                    }

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div >
  );
}

export default App;
