
function ConfirmCard({ msg, subMsg ,onConfirm, onCancel}) {
  return(
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 font-poppins">
          <div className="container fixed z-50 flex justify-center">
              <div className="max-w-sm py-32">
                  <div className="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg">
                      <div className="py-6 px-8 rounded-lg bg-white">
                          <h1 className="text-gray-700 font-semibold text-base mb-3 hover:text-gray-900 hover:cursor-pointer">
                              
                              <span className="inline-block align-middle  text-5xl">
                                  {msg}
                              </span>
                          </h1>
                          <p className="text-gray-700 tracking-wide text-sm">{subMsg}</p>
                          <div className="grid-cols-2 grid">
                              <button className="mt-6 mx-3 py-1  bg-sky-500 text-white rounded-lg shadow-md hover:shadow-lg transition duration-300 hover:scale-105" onClick={onConfirm}>Restart</button>
                              <button className="mt-6 mx-3 py-1  bg-red-500 text-white rounded-lg shadow-md hover:shadow-lg transition duration-300 hover:scale-105" onClick={onCancel}>Tutup</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default ConfirmCard;