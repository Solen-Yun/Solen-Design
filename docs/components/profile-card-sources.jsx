import { API } from "./profile-card.jsx";
import entrySource from "../../src/components/profile-card/ProfileCard.jsx?raw";
import cssSource from "../../src/components/profile-card/ProfileCard.css?raw";
import specSource from "../../src/components/profile-card/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom @hugeicons/react @hugeicons/core-free-icons",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom @hugeicons/react @hugeicons/core-free-icons",
        pnpm: "pnpm add react react-dom @hugeicons/react @hugeicons/core-free-icons",
        yarn: "yarn add react react-dom @hugeicons/react @hugeicons/core-free-icons",
        bun: "bun add react react-dom @hugeicons/react @hugeicons/core-free-icons",
      },
      files: [
        { name: "ProfileCard.jsx", code: entrySource },
        { name: "ProfileCard.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { ProfileCard } from "solen-design/react";

<ProfileCard
  avatarUrl="/people/ava.jpg"
  iconUrl="/patterns/tiles.png"
  miniAvatarUrl="/people/ava-mini.jpg"
  name="Javi A. Torres"
  title="Software Engineer"
  handle="javicodes"
  status="Online"
  statusColor="#22c55e"
  contactText="Contact"
  showUserInfo={true}
  theme="dark"
  backdropColor={undefined}
  radius={16}
  holo={0.8}
  glare={0.5}
  enableTilt={true}
  tiltStrength={12}
  parallax={8}
  enableMobileTilt={false}
  mobileTiltSensitivity={5}
  intro={true}
  onContactClick={() => console.log("contact")}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
