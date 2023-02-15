import { Player } from "@livepeer/react";
import mux from "mux-embed";
import { useCallback, useEffect, useRef, useState } from "react";

import videos from "../../constants/sample-data.json";

export default function Home() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [playerRef, setPlayerRef] = useState();

  const mediaElementRef = useCallback((ref) => {
    setPlayerRef(ref);
  }, []);

  useEffect(() => {
    if (playerRef) {
      const initTime = mux.utils.now();

      mux.monitor(playerRef, {
        debug: false,
        data: {
          env_key: process.env.REACT_APP_MUX_ENV_KEY,
          player_name: "dStorage Sample App - Player",
          player_init_time: initTime,
          video_id: url,
          video_title: title,
        },
      });
    }
  }, [playerRef]);

  return (
    <div>
      <Nav />
      <div className="flex flex-col justify-center items-center h-screen font-poppins">
        <h1 className="text-5xl font-bold pb-2 -mt-32 text-slate-900 text-transparent bg-clip-text bg-gradient-to-r from-[#00A660] to-[#28CE88] text-center lg:text-7xl">
          Campaign Video 
        </h1>
        <h3 className="text-xl mt-4 text-slate-800 w-[90%] text-center lg:w-[70%]">
          An Informational video about the campaign
        </h3>

        <input
          type="text"
          placeholder="ipfs://... or ar://"
          value={url}
          className="mt-8 px-4 py-2 rounded-lg border-2 border-slate-100 focus:outline-none  w-[80%] bg-slate-100 lg:w-[40%]"
          onChange={(e) => {
            setUrl(e.target.value);
            setTitle(null);
            setUrl(null);
            setLoading(true);
            setTimeout(() => {
              setUrl(e.target.value);
              setLoading(false);
            }, 1000);
          }}
        />

        <div className="mt-8 w-[80%] lg:w-[40%] flex flex-col lg:flex-row justify-between items-center">
          <p className="text-md font-semibold text-slate-800 ml-4">
            No video? <br className="hidden lg:block" />
            Try one of these:
          </p>
          <div className="flex flex-row ">
            {videos.map((video, index) => (
              <div key={index} className="relative">
                <img
                  onClick={() => {
                    setTitle(video.title);
                    setUrl(null);
                    setLoading(true);
                    setTimeout(() => {
                      setUrl(video.url);
                      setLoading(false);
                    }, 1000);
                  }}
                  className="w-18 h-16 ml-4 rounded-md  border-gray-100 hover:-translate-y-1 hover:shadow-lg cursor-pointer transition-all duration-200 mt-4 lg:mt-0"
                  src={video.thumbnail}
                />
                <div className="absolute top-0 right-0 m-1 font-semibold border border-white bg-white rounded-full">
                  <img
                    className="w-4 h-4 rounded-full"
                    src={
                      video.storageType === "ipfs"
                        ? "logos/ipfs.png"
                        : "logos/arweave.png"
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 w-[90%] lg:w-[40%]">
          {url && (
            <Player
              title={title || url}
              src={url}
              autoPlay
              muted
              showPipButton
              mediaElementRef={mediaElementRef}
            />
          )}
          {loading && (
            <div className="flex flex-col justify-center mt-8 items-center">
              <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-[#19BC75]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
