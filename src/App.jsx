import { useEffect, useRef, useState } from "react";
import { supabase } from "./lib/supabase";
import "./App.css";

const skins = {
  fair: "#F7C8A8",
  light: "#E9AB7C",
  medium: "#C9825B",
  tan: "#9B5B3C",
  deep: "#70402F",
};

const hairs = {
  black: "#17151B",
  brown: "#4A2B22",
  dark: "#2B1A18",
  blonde: "#C99748",
  red: "#71332D",
};

const outfits = {
  black: "#20212B",
  white: "#E8E8EC",
  blue: "#3868D8",
  purple: "#754ED2",
  green: "#32865E",
  pink: "#D94D86",
  red: "#B94343",
};

const pants = {
  black: "#20212B",
  blue: "#354D7A",
  grey: "#5E606B",
  brown: "#654C3E",
};

const defaultYou = {
  gender: "male",
  skin: "medium",
  hair: "black",
  outfit: "black",
  pants: "black",
  accessory: "none",
  expression: "happy",
};

const ROOM_STORAGE_KEY = "viberoom_room_code";

const defaultFriend = {
  gender: "female",
  skin: "fair",
  hair: "brown",
  outfit: "pink",
  pants: "blue",
  accessory: "heart",
  expression: "happy",
};

function Avatar({ character, size = "large", mood = "", style }) {
  const female = character.gender === "female";

  return (
    <div className={`avatar avatar-${size} ${mood}`} style={style}>
      <svg
        viewBox="0 0 240 360"
        className="avatar-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* FLOOR SHADOW */}
        <ellipse
          cx="120"
          cy="342"
          rx={female ? 70 : 64}
          ry="11"
          fill="rgba(0,0,0,.30)"
        />

        {/* LEGS */}
        <rect
          x="79"
          y="270"
          width="31"
          height="68"
          rx="14"
          fill={pants[character.pants]}
        />

        <rect
          x="130"
          y="270"
          width="31"
          height="68"
          rx="14"
          fill={pants[character.pants]}
        />

        {/* SHOES */}
        <path
          d="M68 327 Q92 318 112 330 L112 343 Q88 351 64 342 Q60 336 68 327Z"
          fill="#15161D"
        />

        <path
          d="M128 330 Q148 318 172 327 Q180 336 175 342 Q151 351 128 343Z"
          fill="#15161D"
        />

        <path
          d="M73 334 Q91 339 107 334"
          stroke="rgba(255,255,255,.18)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        <path
          d="M133 334 Q149 339 167 334"
          stroke="rgba(255,255,255,.18)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        {/* BODY */}
        {female ? (
          <path
            d="M72 271 Q76 216 120 207 Q164 216 168 271 L181 294 Q175 310 155 314 L85 314 Q65 310 59 294Z"
            fill={outfits[character.outfit]}
          />
        ) : (
          <path
            d="M67 271 Q71 216 120 207 Q169 216 173 271 L183 297 Q177 312 157 314 L83 314 Q63 312 57 297Z"
            fill={outfits[character.outfit]}
          />
        )}

        {/* SHIRT DETAIL */}
        <path
          d="M84 231 Q120 248 156 231"
          stroke="rgba(255,255,255,.12)"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
        />

        <path
          d="M101 215 L120 233 L139 215"
          stroke="rgba(255,255,255,.25)"
          strokeWidth="5"
          fill="none"
        />

        {/* NECK */}
        <rect
          x="101"
          y="188"
          width="38"
          height="40"
          rx="15"
          fill={skins[character.skin]}
        />

        {/* EARS */}
        <ellipse
          cx="61"
          cy="137"
          rx="15"
          ry="22"
          fill={skins[character.skin]}
        />

        <ellipse
          cx="179"
          cy="137"
          rx="15"
          ry="22"
          fill={skins[character.skin]}
        />

        {/* HEAD */}
        <path
          d="M120 47
          C78 47 60 78 62 132
          C64 181 85 207 120 209
          C155 207 176 181 178 132
          C180 78 162 47 120 47Z"
          fill={skins[character.skin]}
        />

        {/* FACE LIGHT */}
        <ellipse
          cx="105"
          cy="112"
          rx="25"
          ry="18"
          fill="rgba(255,255,255,.07)"
        />

        {/* HAIR TOP */}
        <path
          d="M58 109
          Q53 57 91 34
          Q139 9 173 45
          Q193 67 180 112
          Q160 89 139 83
          Q103 74 76 101Z"
          fill={hairs[character.hair]}
        />

        {/* FEMALE SIDE HAIR */}
        {female && (
          <>
            <path
              d="M65 88 Q43 127 61 181 Q68 195 79 188 L82 112Z"
              fill={hairs[character.hair]}
            />

            <path
              d="M175 88 Q197 127 179 181 Q172 195 161 188 L158 112Z"
              fill={hairs[character.hair]}
            />
          </>
        )}

        {/* BROWS */}
        <path
          d="M82 119 Q96 111 107 118"
          stroke="#4B3029"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        <path
          d="M133 118 Q145 111 158 119"
          stroke="#4B3029"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* EYES */}
        {character.expression === "cool" ? (
          <>
            <path
              d="M78 125 L109 121 L110 141 L81 143Z"
              fill="#16171D"
            />

            <path
              d="M130 121 L161 125 L158 143 L129 141Z"
              fill="#16171D"
            />
          </>
        ) : (
          <>
            <ellipse
              cx="96"
              cy="132"
              rx="8"
              ry="10"
              fill="#171820"
            />

            <ellipse
              cx="144"
              cy="132"
              rx="8"
              ry="10"
              fill="#171820"
            />

            <circle
              cx="98"
              cy="129"
              r="3"
              fill="white"
            />

            <circle
              cx="146"
              cy="129"
              r="3"
              fill="white"
            />
          </>
        )}

        {/* NOSE */}
        <path
          d="M120 130 Q113 151 119 157 Q125 160 130 155"
          stroke="rgba(120,65,45,.45)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        {/* CHEEKS */}
        <ellipse
          cx="83"
          cy="158"
          rx="12"
          ry="6"
          fill="rgba(240,100,120,.22)"
        />

        <ellipse
          cx="157"
          cy="158"
          rx="12"
          ry="6"
          fill="rgba(240,100,120,.22)"
        />

        {/* MOUTH */}
        {character.expression === "cool" ? (
          <path
            d="M105 169 Q120 164 135 169"
            stroke="#63352F"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M104 166 Q120 183 136 166"
            stroke="#63352F"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
        )}

        {/* GLASSES */}
        {character.accessory === "glasses" && (
          <>
            <circle
              cx="95"
              cy="133"
              r="18"
              fill="rgba(30,30,35,.18)"
              stroke="#19191F"
              strokeWidth="5"
            />

            <circle
              cx="145"
              cy="133"
              r="18"
              fill="rgba(30,30,35,.18)"
              stroke="#19191F"
              strokeWidth="5"
            />

            <path
              d="M113 133 H127"
              stroke="#19191F"
              strokeWidth="5"
            />
          </>
        )}

        {/* CAP */}
        {character.accessory === "cap" && (
          <>
            <path
              d="M55 79 Q120 35 185 79 L181 98 Q120 70 59 98Z"
              fill="#282A36"
            />

            <path
              d="M91 86 Q126 72 174 89 Q151 105 112 100Z"
              fill="#181920"
            />
          </>
        )}

        {/* HEART */}
        {character.accessory === "heart" && (
          <text
            x="120"
            y="263"
            textAnchor="middle"
            fontSize="25"
            fill="white"
          >
            ♥
          </text>
        )}

        {/* STAR */}
        {character.accessory === "star" && (
          <text
            x="120"
            y="263"
            textAnchor="middle"
            fontSize="25"
            fill="white"
          >
            ★
          </text>
        )}
      </svg>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("room");

  const [characters, setCharacters] = useState({
    you: defaultYou,
    friend: defaultFriend,
  });

  const [editing, setEditing] = useState("you");
  const [draft, setDraft] = useState(defaultYou);

  const [messages, setMessages] = useState([]);
  const chatMessagesRef = useRef(null);
  const [text, setText] = useState("");
  const [reaction, setReaction] = useState(null);
  const [toast, setToast] = useState("");
  const [activeCharacter, setActiveCharacter] = useState(null);

  const [user, setUser] = useState(null);
  const [roomCode, setRoomCode] = useState(
    () => localStorage.getItem(ROOM_STORAGE_KEY) || ""
  );
  const [roomInput, setRoomInput] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  const [roomError, setRoomError] = useState("");
  const [friendTyping, setFriendTyping] = useState(false);
  const typingChannelRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const startAuth = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();

        if (sessionData?.session?.user) {
          if (mounted) setUser(sessionData.session.user);
        } else {
          const { data, error } = await supabase.auth.signInAnonymously();
          if (error) throw error;
          if (mounted) setUser(data.user);
        }
      } catch (error) {
        console.error("VibeRoom auth error:", error);
        if (mounted) {
          setRoomError("Could not connect to VibeRoom. Check your internet connection.");
        }
      } finally {
        if (mounted) setAuthLoading(false);
      }
    };

    startAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted && session?.user) {
        setUser(session.user);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user || !roomCode) {
      setMessages([]);
      setConnectionStatus(user ? "Create or join a room" : "Connecting...");
      return;
    }

    let mounted = true;
    let channel;

    setFriendTyping(false);

    const loadMessages = async () => {
      setChatLoading(true);
      setConnectionStatus("Connecting...");

      const { data, error } = await supabase
        .from("messages")
        .select("id, room_code, sender_id, content, created_at")
        .eq("room_code", roomCode)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("VibeRoom message load error:", error);
        if (mounted) {
          setRoomError("Couldn't load messages. Please check your connection.");
          setConnectionStatus("Offline");
        }
      } else if (mounted) {
        setMessages(
          (data || []).map((msg) => ({
            id: msg.id,
            from: msg.sender_id === user.id ? "you" : "friend",
            text: msg.content,
          }))
        );
        setRoomError("");
        setConnectionStatus("Live");
      }

      if (mounted) setChatLoading(false);
    };

    loadMessages();

    channel = supabase
      .channel(`room-${roomCode}`, {
        config: {
          broadcast: { self: false },
        },
      })
      .on(
        "broadcast",
        { event: "typing" },
        ({ payload }) => {
          if (!mounted || !payload) return;
          if (payload.sender_id === user.id) return;

          setFriendTyping(Boolean(payload.is_typing));

          if (payload.is_typing) {
            clearTimeout(typingTimeoutRef.current);
            typingTimeoutRef.current = setTimeout(() => {
              if (mounted) setFriendTyping(false);
            }, 3500);
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `room_code=eq.${roomCode}`,
        },
        (payload) => {
          if (!mounted) return;

          if (payload.eventType === "INSERT") {
            const msg = payload.new;
            setMessages((prev) => {
              if (prev.some((item) => item.id === msg.id)) return prev;
              return [
                ...prev,
                {
                  id: msg.id,
                  from: msg.sender_id === user.id ? "you" : "friend",
                  text: msg.content,
                },
              ];
            });
          }

          if (payload.eventType === "DELETE") {
            setMessages((prev) =>
              prev.filter((item) => item.id !== payload.old.id)
            );
          }

          setConnectionStatus("Live");
        }
      )
      .subscribe((status) => {
        if (!mounted) return;

        if (status === "SUBSCRIBED") {
          setConnectionStatus("Live");
        } else if (
          status === "CHANNEL_ERROR" ||
          status === "TIMED_OUT" ||
          status === "CLOSED"
        ) {
          setConnectionStatus("Offline");
        }
      });

    typingChannelRef.current = channel;

    return () => {
      mounted = false;
      setFriendTyping(false);
      clearTimeout(typingTimeoutRef.current);
      typingChannelRef.current = null;
      if (channel) supabase.removeChannel(channel);
    };
  }, [user, roomCode]);

  useEffect(() => {
    if (activeTab !== "chat" || !chatMessagesRef.current) return;

    const element = chatMessagesRef.current;
    requestAnimationFrame(() => {
      element.scrollTop = element.scrollHeight;
    });
  }, [messages, activeTab]);

  const makeRoomCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const bytes = new Uint8Array(6);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, (byte) => chars[byte % chars.length]).join("");
  };

  const createRoom = () => {
    const code = makeRoomCode();
    localStorage.setItem(ROOM_STORAGE_KEY, code);
    setRoomError("");
    setRoomCode(code);
  };

  const joinRoom = () => {
    const code = roomInput.trim().toUpperCase().replace(/\s/g, "");
    if (code.length < 4) {
      setRoomError("Enter the room code your friend gave you.");
      return;
    }

    localStorage.setItem(ROOM_STORAGE_KEY, code);
    setRoomError("");
    setRoomCode(code);
    setRoomInput("");
  };

  const leaveRoom = () => {
    localStorage.removeItem(ROOM_STORAGE_KEY);
    setRoomCode("");
    setMessages([]);
    setConnectionStatus("Create or join a room");
  };

  const copyRoomCode = async () => {
    if (!roomCode) return;

    try {
      await navigator.clipboard.writeText(roomCode);
      setToast("Room code copied ✨");
      setTimeout(() => setToast(""), 1600);
    } catch {
      setToast("Code: " + roomCode);
      setTimeout(() => setToast(""), 2200);
    }
  };

  const update = (key, value) => {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const editPerson = (person) => {
    setEditing(person);
    setDraft({ ...characters[person] });
  };

  const saveAvatar = () => {
    setCharacters((prev) => ({
      ...prev,
      [editing]: { ...draft },
    }));

    setToast("Avatar saved ✨");

    setTimeout(() => {
      setToast("");
    }, 1800);
  };

  const handleTyping = (value) => {
    setText(value);

    const channel = typingChannelRef.current;
    if (!channel || !user || !roomCode) return;

    clearTimeout(typingTimeoutRef.current);

    channel.send({
      type: "broadcast",
      event: "typing",
      payload: {
        sender_id: user.id,
        is_typing: Boolean(value.trim()),
      },
    });

    if (value.trim()) {
      typingTimeoutRef.current = setTimeout(() => {
        channel.send({
          type: "broadcast",
          event: "typing",
          payload: {
            sender_id: user.id,
            is_typing: false,
          },
        });
      }, 1200);
    }
  };

  const send = async () => {
    const content = text.trim();

    if (!content || !user || !roomCode) return;

    setText("");
    clearTimeout(typingTimeoutRef.current);

    if (typingChannelRef.current) {
      typingChannelRef.current.send({
        type: "broadcast",
        event: "typing",
        payload: {
          sender_id: user.id,
          is_typing: false,
        },
      });
    }

    const { error } = await supabase.from("messages").insert({
      room_code: roomCode,
      sender_id: user.id,
      content,
    });

    if (error) {
      console.error("VibeRoom send error:", error);
      setText(content);
      setToast("Message couldn't send");
      setTimeout(() => setToast(""), 1800);
    }
  };

  const quickMessage = (msg) => {
    setText(msg);
    setActiveTab("chat");
  };

  const react = (emoji) => {
    setReaction(emoji);

    setTimeout(() => {
      setReaction(null);
    }, 1300);
  };

  const tapCharacter = (person) => {
    setActiveCharacter(person);

    setTimeout(() => {
      setActiveCharacter(null);
    }, 900);
  };

  return (
    <div className="app">

      {/* HEADER */}

      <header className="topbar">

        <div>
          <div className="brand">
            <span className="brand-dot" />
            VibeRoom
          </div>

          <div className="room-status">
            <span className={`online-dot ${connectionStatus === "Live" ? "" : "offline"}`} />
            {connectionStatus === "Live"
              ? "Just you two"
              : connectionStatus}
          </div>
        </div>

        <button className="menu-button">
          ⋮
        </button>

      </header>

      {!authLoading && !roomCode && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(7,7,13,.96)",
            display: "grid",
            placeItems: "center",
            padding: "24px",
          }}
        >
          <div
            style={{
              width: "min(100%, 430px)",
              padding: "28px",
              borderRadius: "28px",
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.12)",
              boxShadow: "0 24px 80px rgba(0,0,0,.45)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "2px",
                opacity: 0.6,
                marginBottom: "10px",
              }}
            >
              PRIVATE VIBEROOM
            </div>

            <h2 style={{ margin: "0 0 8px", fontSize: "30px" }}>
              Just you two. 💙
            </h2>

            <p style={{ opacity: 0.68, lineHeight: 1.55, marginTop: 0 }}>
              Create a room and send the code to your friend, or join their
              room with a code.
            </p>

            <button
              onClick={createRoom}
              style={{
                width: "100%",
                border: 0,
                borderRadius: "16px",
                padding: "15px 18px",
                marginTop: "14px",
                cursor: "pointer",
                fontWeight: 800,
                fontSize: "15px",
              }}
            >
              ✨ Create New Room
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                margin: "20px 0",
                opacity: 0.4,
              }}
            >
              <div style={{ height: 1, flex: 1, background: "currentColor" }} />
              <span style={{ fontSize: 12 }}>OR</span>
              <div style={{ height: 1, flex: 1, background: "currentColor" }} />
            </div>

            <input
              value={roomInput}
              onChange={(e) => setRoomInput(e.target.value.toUpperCase())}
              onKeyDown={(e) => {
                if (e.key === "Enter") joinRoom();
              }}
              placeholder="Enter room code"
              maxLength={12}
              style={{
                width: "100%",
                boxSizing: "border-box",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,.12)",
                background: "rgba(255,255,255,.06)",
                color: "inherit",
                padding: "15px",
                outline: "none",
                fontSize: "16px",
                letterSpacing: "3px",
                textAlign: "center",
              }}
            />

            <button
              onClick={joinRoom}
              style={{
                width: "100%",
                border: "1px solid rgba(255,255,255,.14)",
                borderRadius: "16px",
                padding: "14px 18px",
                marginTop: "10px",
                cursor: "pointer",
                fontWeight: 800,
                fontSize: "15px",
                background: "rgba(255,255,255,.08)",
                color: "inherit",
              }}
            >
              🔗 Join Friend's Room
            </button>

            {roomError && (
              <div
                style={{
                  marginTop: "14px",
                  fontSize: "13px",
                  lineHeight: 1.45,
                  color: "#ff9c9c",
                }}
              >
                {roomError}
              </div>
            )}
          </div>
        </div>
      )}

      {roomCode && (
        <div
          style={{
            position: "fixed",
            top: "72px",
            right: "14px",
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <button
            onClick={copyRoomCode}
            style={{
              border: "1px solid rgba(255,255,255,.12)",
              background: "rgba(15,15,24,.78)",
              color: "inherit",
              borderRadius: "999px",
              padding: "7px 10px",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "1px",
              backdropFilter: "blur(12px)",
            }}
            title="Copy room code"
          >
            ROOM {roomCode}
          </button>
          <button
            onClick={leaveRoom}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,.12)",
              background: "rgba(15,15,24,.78)",
              color: "inherit",
              cursor: "pointer",
            }}
            title="Leave room"
          >
            ×
          </button>
        </div>
      )}

      <main className="content">

        {/* ================= ROOM ================= */}

        {activeTab === "room" && (
          <section>

            <div className="welcome-card">

              <span className="mini-label">
                PRIVATE ROOM
              </span>

              <h1>
                Your little corner of
                <br />
                the internet.
              </h1>

              <p>
                Just you and your favorite person.
                No strangers. No noise.
              </p>

            </div>

            <div className="characters-stage">

              {/* ROOM LIGHTS */}

              <div className="room-light light-one" />
              <div className="room-light light-two" />

              {/* DECOR */}

              <div className="floating-bubble bubble-one">
                👋
              </div>

              <div className="floating-bubble bubble-two">
                ✨
              </div>

              <div className="floating-bubble bubble-three">
                💕
              </div>

              <div className="floating-bubble bubble-four">
                🎵
              </div>

              {/* SPEECH */}

              <div className="speech speech-friend">
                heyyy 👀
              </div>

              <div className="speech speech-you">
                hiiii 😎
              </div>

              {/* FRIEND */}

              <button
                className={`room-character friend-character ${
                  activeCharacter === "friend"
                    ? "character-active"
                    : ""
                }`}
                onClick={() =>
                  tapCharacter("friend")
                }
              >

                <div className="character-aura" />

                <Avatar
                  character={characters.friend}
                  size="large"
                />

                <div className="character-name">
                  Her
                </div>

                <div className="character-state">
                  <span className="tiny-online" />
                  online ✨
                </div>

              </button>

              {/* YOU */}

              <button
                className={`room-character you-character ${
                  activeCharacter === "you"
                    ? "character-active"
                    : ""
                }`}
                onClick={() =>
                  tapCharacter("you")
                }
              >

                <div className="character-aura" />

                <Avatar
                  character={characters.you}
                  size="large"
                />

                <div className="character-name">
                  You
                </div>

                <div className="character-state">
                  <span className="tiny-online" />
                  online 😎
                </div>

              </button>

              {/* FLOOR */}

              <div className="room-floor">
                <div className="floor-line" />
              </div>

            </div>

            {/* REACTIONS */}

            <div className="reaction-dock">

              {["❤️", "😂", "🔥", "😍", "😭", "👀"].map(
                (emoji) => (
                  <button
                    key={emoji}
                    onClick={() => react(emoji)}
                  >
                    {emoji}
                  </button>
                )
              )}

            </div>

            {reaction && (
              <div className="big-reaction">
                {reaction}
              </div>
            )}

            {/* ACTIONS */}

            <div className="quick-actions">

              <button
                onClick={() =>
                  setActiveTab("chat")
                }
              >
                <span>💬</span>
                <strong>Chat</strong>
                <small>
                  Talk privately
                </small>
              </button>

              <button
                onClick={() =>
                  setActiveTab("fun")
                }
              >
                <span>🎮</span>
                <strong>Play</strong>
                <small>
                  Mini games
                </small>
              </button>

              <button
                onClick={() =>
                  setActiveTab("me")
                }
              >
                <span>🧑‍🎨</span>
                <strong>Avatar</strong>
                <small>
                  Customize
                </small>
              </button>

            </div>

          </section>
        )}

        {/* ================= CHAT ================= */}

        {activeTab === "chat" && (
          <section
            className="chat-screen"
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "calc(100dvh - 150px)",
              maxHeight: "calc(100dvh - 150px)",
              overflow: "hidden",
            }}
          >
            <div className="section-heading" style={{ flexShrink: 0 }}>
              <div>
                <span className="mini-label">PRIVATE CHAT</span>
                <h2>Messages</h2>
              </div>

              <div
                style={{
                  width: 44,
                  height: 54,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <Avatar
                  character={characters.friend}
                  size="small"
                  style={{
                    width: 38,
                    height: 57,
                    flex: "0 0 38px",
                  }}
                />
              </div>
            </div>

            <div
              ref={chatMessagesRef}
              className="chat-messages"
              style={{
                flex: "1 1 auto",
                minHeight: 0,
                overflowY: "auto",
                overflowX: "hidden",
                WebkitOverflowScrolling: "touch",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                padding: "8px 2px 18px",
                scrollBehavior: "smooth",
              }}
            >
              {messages.length === 0 && !chatLoading && (
                <div
                  style={{
                    textAlign: "center",
                    opacity: 0.5,
                    padding: "38px 12px",
                    fontSize: 13,
                  }}
                >
                  No messages yet. Say hi 👋
                </div>
              )}

              {messages.map((msg, index) => {
                const mine = msg.from === "you";
                const isLatest = index === messages.length - 1;

                return (
                  <div
                    key={msg.id}
                    className={`message-row ${mine ? "mine" : "theirs"}`}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: mine ? "flex-end" : "flex-start",
                      gap: 8,
                      padding: "0 2px",
                      boxSizing: "border-box",
                      flexShrink: 0,
                    }}
                  >
                    {!mine && (
                      <Avatar
                        character={characters.friend}
                        size="small"
                        style={{
                          width: 38,
                          height: 57,
                          flex: "0 0 38px",
                          marginBottom: 1,
                        }}
                      />
                    )}

                    <div
                      className="message-bubble"
                      style={{
                        width: "fit-content",
                        maxWidth: "min(76%, 320px)",
                        padding: "10px 14px",
                        borderRadius: mine
                          ? "18px 18px 5px 18px"
                          : "18px 18px 18px 5px",
                        background: mine
                          ? "linear-gradient(135deg, #754ED2, #5E3EB8)"
                          : "rgba(255,255,255,.075)",
                        border: mine
                          ? "1px solid rgba(255,255,255,.08)"
                          : "1px solid rgba(255,255,255,.10)",
                        color: "#fff",
                        fontSize: 14,
                        lineHeight: 1.45,
                        boxShadow: mine
                          ? "0 7px 18px rgba(117,78,210,.22)"
                          : "0 7px 18px rgba(0,0,0,.14)",
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                      }}
                    >
                      {msg.text}
                    </div>

                    {mine && (
                      <Avatar
                        character={characters.you}
                        size="small"
                        style={{
                          width: 38,
                          height: 57,
                          flex: "0 0 38px",
                          marginBottom: 1,
                        }}
                      />
                    )}
                  </div>
                );
              })}

              {friendTyping && (
                <div className="typing-row">
                  <Avatar
                    character={characters.friend}
                    size="small"
                    style={{
                      width: 38,
                      height: 57,
                      flex: "0 0 38px",
                      marginBottom: 1,
                    }}
                  />
                  <div className="typing-bubble" aria-label="Friend is typing">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              )}
            </div>

            <div
              className="quick-replies"
              style={{
                flexShrink: 0,
                display: "flex",
                gap: 8,
                overflowX: "auto",
                padding: "4px 0 10px",
                scrollbarWidth: "none",
              }}
            >
              <button onClick={() => quickMessage("Miss you ❤️")}>
                Miss you ❤️
              </button>

              <button onClick={() => quickMessage("😂😂")}>😂😂</button>

              <button onClick={() => quickMessage("Wait 👀")}>
                Wait 👀
              </button>

              <button onClick={() => quickMessage("Let's play 🎮")}>
                Let's play 🎮
              </button>
            </div>

            <div
              className="message-input-area"
              style={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 0 max(8px, env(safe-area-inset-bottom))",
              }}
            >
              <button
                className="input-icon"
                type="button"
                aria-label="Add"
              >
                ＋
              </button>

              <input
                value={text}
                onChange={(e) => handleTyping(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    send();
                  }
                }}
                placeholder="Type something..."
                style={{
                  flex: 1,
                  minWidth: 0,
                }}
              />

              <button
                className="send-button"
                onClick={send}
                type="button"
                aria-label="Send message"
              >
                ➤
              </button>
            </div>
          </section>
        )}

        {/* ================= FUN ================= */}

        {activeTab === "fun" && (
          <section>

            <div className="section-heading">

              <div>
                <span className="mini-label">
                  VIBE ZONE
                </span>

                <h2>
                  Let's have some fun 🎮
                </h2>
              </div>

            </div>

            <div className="game-grid">

              <button className="game-card">
                <span>🎯</span>
                <strong>
                  Would You Rather
                </strong>
                <small>
                  Impossible choices
                </small>
              </button>

              <button className="game-card">
                <span>🔥</span>
                <strong>
                  Truth or Dare
                </strong>
                <small>
                  Don't chicken out
                </small>
              </button>

              <button className="game-card">
                <span>🧠</span>
                <strong>
                  Quick Quiz
                </strong>
                <small>
                  How well do you know me?
                </small>
              </button>

              <button className="game-card">
                <span>🎨</span>
                <strong>
                  Draw Together
                </strong>
                <small>
                  Create something crazy
                </small>
              </button>

              <button className="game-card wide-card">
                <span>📺</span>
                <strong>
                  Watch Together
                </strong>
                <small>
                  Synchronized watching
                </small>
              </button>

            </div>

          </section>
        )}

        {/* ================= AVATAR ================= */}

        {activeTab === "me" && (
          <section className="creator-screen">

            <div className="section-heading">

              <div>
                <span className="mini-label">
                  AVATAR STUDIO
                </span>

                <h2>
                  Create your vibe ✨
                </h2>

                <p>
                  Your avatar. Your style.
                </p>
              </div>

            </div>

            <div className="person-switcher">

              <button
                className={
                  editing === "you"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  editPerson("you")
                }
              >
                😎 You
              </button>

              <button
                className={
                  editing === "friend"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  editPerson("friend")
                }
              >
                🥰 Friend
              </button>

            </div>

            <div className="avatar-preview">

              <Avatar
                character={draft}
                size="large"
              />

              <strong>
                {editing === "you"
                  ? "Your Avatar"
                  : "Friend's Avatar"}
              </strong>

              <small>
                Customize everything below
              </small>

            </div>

            <div className="creator-section">

              <label>
                Character
              </label>

              <div className="choice-row">

                <button
                  className={
                    draft.gender === "male"
                      ? "choice active"
                      : "choice"
                  }
                  onClick={() =>
                    update("gender", "male")
                  }
                >
                  👦 Male
                </button>

                <button
                  className={
                    draft.gender === "female"
                      ? "choice active"
                      : "choice"
                  }
                  onClick={() =>
                    update("gender", "female")
                  }
                >
                  👧 Female
                </button>

              </div>

            </div>

            <div className="creator-section">

              <label>
                Skin Tone
              </label>

              <div className="skin-row">

                {Object.entries(skins).map(
                  ([name, color]) => (
                    <button
                      key={name}
                      className={
                        draft.skin === name
                          ? "skin selected"
                          : "skin"
                      }
                      style={{
                        background: color,
                      }}
                      onClick={() =>
                        update("skin", name)
                      }
                    />
                  )
                )}

              </div>

            </div>

            <div className="creator-section">

              <label>
                Hair
              </label>

              <div className="option-grid">

                {Object.entries(hairs).map(
                  ([name, color]) => (
                    <button
                      key={name}
                      className={
                        draft.hair === name
                          ? "option active"
                          : "option"
                      }
                      onClick={() =>
                        update("hair", name)
                      }
                    >
                      <span
                        className="option-dot"
                        style={{
                          background: color,
                        }}
                      />

                      {name}

                    </button>
                  )
                )}

              </div>

            </div>

            <div className="creator-section">

              <label>
                Outfit
              </label>

              <div className="option-grid">

                {Object.entries(outfits).map(
                  ([name, color]) => (
                    <button
                      key={name}
                      className={
                        draft.outfit === name
                          ? "option active"
                          : "option"
                      }
                      onClick={() =>
                        update("outfit", name)
                      }
                    >
                      <span
                        className="option-dot"
                        style={{
                          background: color,
                        }}
                      />

                      {name}

                    </button>
                  )
                )}

              </div>

            </div>

            <div className="creator-section">

              <label>
                Pants
              </label>

              <div className="option-grid">

                {Object.entries(pants).map(
                  ([name, color]) => (
                    <button
                      key={name}
                      className={
                        draft.pants === name
                          ? "option active"
                          : "option"
                      }
                      onClick={() =>
                        update("pants", name)
                      }
                    >
                      <span
                        className="option-dot"
                        style={{
                          background: color,
                        }}
                      />

                      {name}

                    </button>
                  )
                )}

              </div>

            </div>

            <div className="creator-section">

              <label>
                Accessories
              </label>

              <div className="option-grid">

                <button
                  className={
                    draft.accessory === "none"
                      ? "option active"
                      : "option"
                  }
                  onClick={() =>
                    update("accessory", "none")
                  }
                >
                  ✨ None
                </button>

                <button
                  className={
                    draft.accessory === "glasses"
                      ? "option active"
                      : "option"
                  }
                  onClick={() =>
                    update(
                      "accessory",
                      "glasses"
                    )
                  }
                >
                  🕶️ Glasses
                </button>

                <button
                  className={
                    draft.accessory === "cap"
                      ? "option active"
                      : "option"
                  }
                  onClick={() =>
                    update(
                      "accessory",
                      "cap"
                    )
                  }
                >
                  🧢 Cap
                </button>

                <button
                  className={
                    draft.accessory === "heart"
                      ? "option active"
                      : "option"
                  }
                  onClick={() =>
                    update(
                      "accessory",
                      "heart"
                    )
                  }
                >
                  ❤️ Heart
                </button>

                <button
                  className={
                    draft.accessory === "star"
                      ? "option active"
                      : "option"
                  }
                  onClick={() =>
                    update(
                      "accessory",
                      "star"
                    )
                  }
                >
                  ⭐ Star
                </button>

              </div>

            </div>

            <div className="creator-section">

              <label>
                Mood
              </label>

              <div className="choice-row">

                <button
                  className={
                    draft.expression === "happy"
                      ? "choice active"
                      : "choice"
                  }
                  onClick={() =>
                    update(
                      "expression",
                      "happy"
                    )
                  }
                >
                  😊 Happy
                </button>

                <button
                  className={
                    draft.expression === "cool"
                      ? "choice active"
                      : "choice"
                  }
                  onClick={() =>
                    update(
                      "expression",
                      "cool"
                    )
                  }
                >
                  😎 Cool
                </button>

              </div>

            </div>

            <button
              className="save-character"
              onClick={saveAvatar}
            >
              ✨ Save Avatar
            </button>

            {toast && (
              <div className="save-toast">
                {toast}
              </div>
            )}

          </section>
        )}

      </main>

      {roomError && roomCode && (
        <div
          style={{
            position: "fixed",
            left: "50%",
            bottom: "92px",
            transform: "translateX(-50%)",
            zIndex: 60,
            width: "min(88%, 360px)",
            padding: "12px 14px",
            borderRadius: "14px",
            background: "rgba(150,40,50,.92)",
            color: "white",
            fontSize: "13px",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,.35)",
          }}
        >
          {roomError}
        </div>
      )}

      <nav className="bottom-nav">

        <button
          className={
            activeTab === "room"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("room")
          }
        >
          <span>🏠</span>
          <small>Room</small>
        </button>

        <button
          className={
            activeTab === "chat"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("chat")
          }
        >
          <span>💬</span>
          <small>Chat</small>
        </button>

        <button
          className={
            activeTab === "fun"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("fun")
          }
        >
          <span>🎮</span>
          <small>Fun</small>
        </button>

        <button
          className={
            activeTab === "me"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("me")
          }
        >
          <span>✨</span>
          <small>Me</small>
        </button>

      </nav>

    </div>
  );
}

export default App;