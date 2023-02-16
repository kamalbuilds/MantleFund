import { Player } from "@livepeer/react";
import mux from "mux-embed";
import { useCallback, useEffect, useRef, useState } from "react";


export const Demonstration= () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [playerRef, setPlayerRef] = useState();

  const mediaElementRef = useCallback((ref: any) => {
    setPlayerRef(ref);
  }, []);
  

  useEffect(() => {
    if (playerRef) {
      const initTime = mux.utils.now();
      console.log("playerRef", playerRef);
      mux.monitor(playerRef, {
        debug: false,
        data: {
          env_key: process.env.REACT_APP_MUX_ENV_KEY,
          player_name: "Campaign Player",
          player_init_time: initTime,
          video_id: url,
          video_title: title,
        },
      });
    }
  }, [playerRef]);

  return (
    <div>
      
      <div className="flex flex-col justify-center items-center h-screen font-poppins">
        <h1 className="text-2xl font-bold pb-2 mt-32 text-slate-900 text-transparent bg-clip-text bg-gradient-to-r from-[#00A660] to-[#28CE88] text-center lg:text-5xl">
          Campaign Video 
        </h1>
        <h3 className="text-xl mt-4 text-white-800 w-[90%] text-center lg:w-[70%]">
          An Informational video about the campaign
        </h3>

        <input
          type="text"
          placeholder="ipfs://... or ar://"
          value={url}
          className="mt-8 px-4 py-2 rounded-lg border-2 border-slate-100 focus:outline-none  w-[90%] bg-slate-100 lg:w-[40%]"
          onChange={(e) => {
            setUrl(e.target.value);
            setTitle(title);
            setLoading(true);
            setTimeout(() => {
              setUrl(e.target.value);
              setLoading(false);
            }, 1000);
          }}
        />

        <div className="mt-8 w-[100%] lg:w-[100%]">
          <>
          {console.log(url,"url is here")}
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
          </>
        </div>
      </div>
    </div>
  );
}
