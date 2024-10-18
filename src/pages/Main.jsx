import React, { useState, useEffect } from 'react';
import Alert from '../components/Alert'
import Panduan from '../components/Panduan'
import bookIcon from '../img/book.png'
import infoIcon from '../img/info.png'

function Main() {
  const [angka1, setAngka1] = useState("");
  const [angka2, setAngka2] = useState("");
  const [angka3, setAngka3] = useState("");
  const [angka4, setAngka4] = useState("");
  const [angkaBenar, setAngkaBenar] = useState(0);
  const [urutanBenar, seturUtanBenar] = useState(0);
  const [ans, setAns] = useState([]);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false)
  const [showResult, setShowResult] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isWin, setIsWin ] = useState(false);
  const [showPanduan, setshowPanduan] = useState(false);

  function getUniqueRandomNumbers(count, min, max) {
    const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);
    
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    return numbers.slice(0, count);
  }


  const addToHistory = (newItem) => {
    setHistory(prevHistory => [...prevHistory, newItem]);
  };

  const checkAnswer = () => {
    let user_ans = [Number(angka1), Number(angka2), Number(angka3), Number(angka4)];
    let tempAngkaBenar = 0;
    let tempUrutanBenar = 0;
    
    for (let i = 0; i < 4; i++) {
      if (ans.includes(user_ans[i])) {
        if (ans[i] === user_ans[i]) {
          tempUrutanBenar += 1;
          tempAngkaBenar += 1;
        } else {
          tempAngkaBenar += 1;
        }
      }
    }
  
    addToHistory([Number(angka1), Number(angka2), Number(angka3), Number(angka4), tempAngkaBenar, tempUrutanBenar]);

    // Pengecekan apakah jawaban dari user sudah benar semua
    if (tempUrutanBenar === 4){
      setIsWin(true)
    }
    
    seturUtanBenar(tempUrutanBenar);
    setAngkaBenar(tempAngkaBenar);
  };

  const generateAns = () => {
    const uniqueRandomNumbers = getUniqueRandomNumbers(4, 1, 9);
    setAns(uniqueRandomNumbers);
  };

  const onAngkaChange = (event, n) => {
    let angka = event.target.value;
  
    if (angka > 9) {
      angka = Math.floor(angka / 10);
    }
  
    let regex = /[^0-9]/;
  
    if (!regex.test(angka)) {
      changeAngka(n, angka);
  
      // Pindah fokus ke input berikutnya jika angka valid dan ada input selanjutnya
      if (n < 4 && angka !== "" && history.length < 2) {
        const nextInput = document.getElementById(`angka-${n + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };
  
  const changeAngka = (n, angka) => {
    if (n === 1) {
      setAngka1(angka);
    } else if (n === 2) {
      setAngka2(angka);
    } else if (n === 3) {
      setAngka3(angka);
    } else if (n === 4) {
      setAngka4(angka);
    }
  };
  

  function isUnique(a, b, c, d) {
    const values = new Set([a, b, c, d]);
    return values.size === 4; 
  }
  
  const validateAngka = () => {
    if (angka1 === "" || angka2 === "" || angka3 === "" || angka4 === "") {
      setShowError(true);
      return false;
    }
    if (!isUnique(angka1, angka2, angka3, angka4)) {
      setShowError(true);
      return false;
    }
    
    setShowError(false);
    return true;
  };
  
  const onCheck = () => {
    if (validateAngka()) {
      console.log(ans);
      seturUtanBenar(0);
      setAngkaBenar(0);
      checkAnswer();
      setShowResult(true);
      setShowHistory(true);
    } else {
      setShowResult(false);
    }
  };
   
  const onClose = () => {
    setIsWin(false);
  }

  const onClosePanduan = () => {
    setshowPanduan(false);
  }

  const onOpenPanduan = () => {
    setshowPanduan(true);
  }

  const restartGame = () => {
    setIsWin(false);
    generateAns();
    seturUtanBenar(0);
    setAngkaBenar(0);
    setHistory([]);
    setShowResult(false);
    setShowHistory(false);
    setAngka1("");
    setAngka2("");
    setAngka3("");
    setAngka4("");
  }

  useEffect(() => {
    generateAns();
  }, []);

  useEffect(() => {}, [history]);
  
  useEffect(() => {}, [isWin]);
  
  useEffect(() => {}, [showPanduan]);
  

  return (
    <>
      {isWin && (
        <Alert msg={"Selamat!"} subMsg={"Anda telah menyelesaikan permainan setelah " + history.length +" percobaan!"} onCancel={onClose} onConfirm={restartGame} />
      )}

      {showPanduan && (
        <Panduan onCancel={onClosePanduan} />
      )}
      
      {/* Konten utama */}
      <div className={`relative z-10 h-screen flex flex-col justify-center items-center ${ isWin ? 'translate-y-16' : ''} `}>
      
        <div className="box">
          <h2 className="text-center  text-xl mb-6 font-bold " >Tebak 4 Angka!</h2>
          <div className="inner-box bg-gray-200 shadow-md p-6 rounded-md">
            
            <div className="input-place grid grid-cols-4">
            
              <input
                className="m-2 w-10 h-10 hover:border-2 hover:border-green-400 transition duration-500 bg-white rounded-md text-center text-xl col-start-1"
                name="angka11"
                id="angka-1"
                placeholder="0"
                value={angka1}
                onChange={(event) => onAngkaChange(event, 1)}
              />
              <input
                className="m-2 w-10 h-10 hover:border-2 hover:border-green-400 transition duration-500 bg-white rounded-md text-center text-xl col-start-2"
                name="angka22"
                id="angka-2"
                placeholder="0"
                value={angka2}
                onChange={(event) => onAngkaChange(event, 2)}
              />
              <input
                className="m-2 w-10 h-10 hover:border-2 hover:border-green-400 transition duration-500 bg-white rounded-md text-center text-xl col-start-3"
                name="angka33"
                id="angka-3"
                placeholder="0"
                value={angka3}
                onChange={(event) => onAngkaChange(event, 3)}
              />
              <input
                className="m-2 w-10 h-10 hover:border-2 hover:border-green-400 transition duration-500 bg-white rounded-md text-center text-xl col-start-4"
                name="angka44"
                id="angka-4"
                placeholder="0"
                value={angka4}
                onChange={(event) => onAngkaChange(event, 4)}
              />

              <button className="text-white rounded-md text-xs p-1 text-center col-start-1 col-span-2 mt-4 bg-blue-600 hover:bg-blue-400 transition duration-700 hover:scale-110" onClick={onCheck}>
                Check!
              </button>
              {history.length > 0 && (
                <div className="button text-xs p-1 text-center col-start-3 col-span-2 mt-4 ml-3 bg-red-400 hover:bg-red-200 transition duration-700 hover:scale-110" onClick={restartGame}>
                  Restart
                </div>
              )}
            </div>

            {showResult && (
              <div className="text-xs mt-3">
                <div>Benar : {angkaBenar}</div>
                <div>Posisi : {urutanBenar}</div>
              </div>
            )}

            {showError && (
              <div className="text-xs mt-3">
                <div className='text-red-500'>*Pastikan semua kolom telah terisi!</div>
                <div className='text-red-500'>*Pastikan setiap angka yang anda masukan berbeda!</div>
              </div>
            )}
          </div>

          <div className={`Extra grid grid-cols-3 mt-2 transition-all duration-700 ${history.length > 0 ? 'opacity-0' : 'opacity-100'}`}>
            <div className='text-xs bg-red-400 text-white rounded-md shadow-md text-center py-1 cursor-pointer transition-all duration-700 hover:bg-red-300 hover:scale-110' onClick={onOpenPanduan}>
              <div className='flex justify-center items-center '>
                <img src={bookIcon} alt="Book Icon" className="w-4 h-4 mr-1" />
                Panduan
              </div>
            </div>
          
            <div className='text-xs ml-1 bg-orange-400 text-white rounded-md shadow-md text-center py-1 cursor-pointer transition-all duration-700 hover:bg-orange-300 hover:scale-110'>
              <div className='flex justify-center items-center '>
                <img src={infoIcon} alt="Book Icon" className="w-4 h-4 mr-1" />
                Tentang
              </div>
            </div>

          </div>
        </div>

        {showHistory && (
          <div className="box  p-2 rounded-md mt-4">
            <div className="grid grid-cols-3 border-2 border-blue-200 rounded-lg">
              <div className="text- center p-1 bg-blue-200 text-blue-500 rounded-tl-md"></div>
              <div className="text-center p-1 bg-blue-200 text-blue-500 text-xs">Benar</div>
              <div className="text-center p-1 bg-blue-200 text-blue-500 text-xs rounded-tr-md">Posisi</div>

              {history.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="text-center p-1">{item[0]}, {item[1]}, {item[2]}, {item[3]}</div>
                  <div className="text-center p-1">{item[4]}</div>
                  <div className="text-center p-1">{item[5]}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Main;
