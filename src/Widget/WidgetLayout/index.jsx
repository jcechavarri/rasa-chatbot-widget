import { motion, AnimatePresence } from "framer-motion";
import { nanoid } from "nanoid";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppContext from "../AppContext";
import { setUserId } from "../widgetSlice";
import { Header } from "./Header";
import { Keypad } from "./Keypad";
import { Launcher } from "./Launcher";
import { Messages } from "./Messages";
export const WidgetLayout = (props) => {
  const dispatch = useDispatch();
  let { toggleWidget, userId: _userId } = useSelector(
    (state) => state.widgetState
  );
  let { userId } = props;
  let userIdRef = useRef(_userId);
  useEffect(() => {
    if (userId) {
      userIdRef.current = userId;
    } else {
      if (!userIdRef.current) {
        userIdRef.current = nanoid();
        console.log(userIdRef.current);
        dispatch(setUserId(userIdRef.current));
      }
    }
  }, [dispatch, props.userId, userId]);

  return (
    <AppContext.Provider value={{ userId: userIdRef.current,...props }}>
      <AnimatePresence>
        {toggleWidget && (
          <motion.div
            className="fixed bottom-5 right-5 z-50 flex h-[579px] w-[400px]  flex-col rounded-[1.8rem]   bg-white  font-lato   shadow-md xs:right-0 xs:h-[calc(100%-100px)] xs:w-full"
            animate={{ y: -60 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            key="widget"
          >
            <Header />
            <Messages />
            <Keypad />
          </motion.div>
        )}
        <Launcher />
      </AnimatePresence>
    </AppContext.Provider>
  );
};
