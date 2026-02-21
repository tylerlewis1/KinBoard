import { useEffect, useState } from "react";
import { postAnnouncement, voteAnnouncement } from "./announcements.service";
export function useAnnouncements(circleData, announcments, user) {
  const [modalVis, setModalVis] = useState(false);
  const [msg, setMsg] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState("");
  const [type, setType] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    setHasVoted(announcments?.voated?.includes(user.uid));
  }, [announcments]);

  const vote = (id) => voteAnnouncement(circleData.id, id, user.uid);

  const send = async () => {
    const payload = !type
      ? {
          date: new Date(),
          msg,
          who: user.name,
          pfp: user.pfp,
        }
      : {
          date: new Date(),
          msg: question,
          who: user.name,
          pfp: user.pfp,
          options,
          voated: [],
        };

    await postAnnouncement(circleData.id, payload);

    setModalVis(false);
    setMsg("");
    setQuestion("");
    setOptions([]);
  };

  return {
    modalVis,
    setModalVis,
    msg,
    setMsg,
    question,
    setQuestion,
    options,
    setOptions,
    option,
    setOption,
    type,
    setType,
    vote,
    send,
    hasVoted
  };
}
