import { useState, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import BIOSBootScreen from './components/BIOSBootScreen';
import BootScreen from './components/BootScreen';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import Window from './components/Window';
import ShutDownScreen from './apps/ShutDownScreen';

import ResumeApp from './apps/ResumeApp';
import ContactApp from './apps/ContactApp';
import CodingApp from './apps/CodingApp';
import MusicApp from './apps/MusicApp';
import StreamingApp from './apps/StreamingApp';
import AnimeApp from './apps/AnimeApp';
import TerminalApp from './apps/TerminalApp';
import ChatApp from './apps/ChatApp';
import InternetApp from './apps/InternetApp';
import PaintApp from './apps/PaintApp';
import ImagesApp from './apps/ImagesApp';
import FriendsApp from './apps/FriendsApp';
import DatingApp from './apps/DatingApp';
import RecycleBinApp from './apps/RecycleBinApp';
import WikipediaApp from './apps/WikipediaApp';
import SpaceHeyApp from './apps/SpaceHeyApp';
import DinoGame from './apps/DinoGame';
import FlappyGame from './apps/FlappyGame';
import BloonsGame from './apps/BloonsGame';
import MotoX3MGame from './apps/MotoX3MGame';
import GeodashGame from './apps/GeodashGame';
import FNAFGame from './apps/FNAFGame';
import SolitaireGame from './apps/SolitaireGame';
import PacManGame from './apps/PacManGame';
import AmongUsGame from './apps/AmongUsGame';
import ClassOf09App from './apps/ClassOf09App';
import DDLCApp from './apps/DDLCApp';
import MinecraftApp from './apps/MinecraftApp';
import MaidApp from './apps/MaidApp';
import SteamApp from './apps/SteamApp';
import DiscordApp from './apps/DiscordApp';
import TwoW2TApp from './apps/TwoW2TApp';
import RedactedApp from './apps/RedactedApp';
import HedgeCApp from './apps/HedgeCApp';
import OoBioApp from './apps/OoBioApp';
import VideoApp from './apps/VideoApp';
import WallpaperApp from './apps/WallpaperApp';

const APP_COMPONENTS = {
  Resume: ResumeApp,
  Contact: ContactApp,
  Coding: CodingApp,
  Music: MusicApp,
  Streaming: StreamingApp,
  Anime: AnimeApp,
  Terminal: TerminalApp,
  Chat: ChatApp,
  Internet: InternetApp,
  Paint: PaintApp,
  Images: ImagesApp,
  Wallpaper: WallpaperApp,
  Friends: FriendsApp,
  Dating: DatingApp,
  RecycleBin: RecycleBinApp,
  Wikipedia: WikipediaApp,
  SpaceHey: SpaceHeyApp,
  Dino: DinoGame,
  Flappy: FlappyGame,
  Bloons: BloonsGame,
  MotoX3M: MotoX3MGame,
  Geodash: GeodashGame,
  FNAF: FNAFGame,
  Solitaire: SolitaireGame,
  PacMan: PacManGame,
  AmongUs: AmongUsGame,
  ClassOf09: ClassOf09App,
  DDLC: DDLCApp,
  Minecraft: MinecraftApp,
  Maid: MaidApp,
  Steam: SteamApp,
  Discord: DiscordApp,
  TwoW2T: TwoW2TApp,
  Redacted: RedactedApp,
  HedgeC: HedgeCApp,
  OoBio: OoBioApp,
  Video: VideoApp,
};

const WINDOW_TITLES = {
  Resume: 'About xque',
  Contact: 'Contact',
  Coding: 'Coding Projects',
  Music: 'Music Player',
  Streaming: 'Streaming',
  Anime: 'Anime Watchlist',
  Terminal: 'Terminal',
  Chat: 'Chat',
  Internet: 'Internet Explorer',
  Paint: 'Paint',
  Images: 'Images',
  Wallpaper: 'Wallpapers',
  Friends: 'Friends',
  Dating: 'Dating History',
  RecycleBin: 'Recycle Bin',
  Wikipedia: 'Wikipedia',
  SpaceHey: 'SpaceHey',
  Dino: 'Chrome Dino',
  Flappy: 'Flappy Bird',
  Bloons: 'Bloons TD 2',
  MotoX3M: 'Moto X3M',
  Geodash: 'Geometry Dash',
  FNAF: 'Five Nights at Freddy\'s 2',
  Solitaire: 'Solitaire',
  PacMan: 'Pac-Man',
  AmongUs: 'Among Us',
  ClassOf09: 'Class of \'09',
  DDLC: 'Doki Doki Literature Club',
  Minecraft: 'Minecraft',
  Maid: 'Arts & Crafts',
  Steam: 'Steam',
  Discord: 'Discord',
  TwoW2T: '2Writers2Tiles',
  Redacted: 'Redacted',
  HedgeC: 'HedgeCrates',
  OoBio: 'Oo.bio',
  Video: 'Video',
};

const WINDOW_ICONS = {
  Resume: '👤', Contact: '✉️', Coding: '💻', Music: '🎵',
  Streaming: '📺', Anime: '🎌', Terminal: '⬛', Chat: '💬',
  Internet: '🌐', Paint: '🎨', Images: '📷', Wallpaper: '🖼️',
  Friends: '👥', Dating: '❤️', RecycleBin: '🗑️', Wikipedia: '📖',
  SpaceHey: '🌐', Dino: '🦕', Flappy: '🐦', Bloons: '🐵',
  MotoX3M: '🏍️', Geodash: '📐', FNAF: '🐻', Solitaire: '🃏',
  PacMan: '👻', AmongUs: '🟥', ClassOf09: '📜', DDLC: '💗',
  Minecraft: '⛏️', Maid: '🧹', Steam: '🎮', Discord: '💬',
  TwoW2T: '⬜', Redacted: '🔒', HedgeC: '🦔', OoBio: '🔗',
  Video: '💿',
};

const DEFAULT_POSITIONS = {
  Resume: { x: 120, y: 60, width: 680, height: 500 },
  Contact: { x: 200, y: 100, width: 420, height: 380 },
  Coding: { x: 80, y: 40, width: 780, height: 540 },
  Music: { x: 300, y: 120, width: 320, height: 440 },
  Streaming: { x: 140, y: 60, width: 620, height: 470 },
  Anime: { x: 100, y: 30, width: 740, height: 520 },
  Terminal: { x: 160, y: 80, width: 620, height: 420 },
  Chat: { x: 180, y: 90, width: 520, height: 470 },
  Internet: { x: 60, y: 20, width: 840, height: 580 },
  Paint: { x: 100, y: 40, width: 720, height: 520 },
  Images: { x: 160, y: 70, width: 620, height: 470 },
  Wallpaper: { x: 180, y: 90, width: 520, height: 420 },
  Friends: { x: 220, y: 110, width: 420, height: 370 },
  Dating: { x: 140, y: 50, width: 580, height: 470 },
  RecycleBin: { x: 180, y: 90, width: 520, height: 420 },
  Wikipedia: { x: 60, y: 20, width: 800, height: 580 },
  SpaceHey: { x: 120, y: 40, width: 680, height: 520 },
  Dino: { x: 200, y: 60, width: 620, height: 420 },
  Flappy: { x: 280, y: 80, width: 420, height: 520 },
  Bloons: { x: 120, y: 30, width: 840, height: 620 },
  MotoX3M: { x: 80, y: 20, width: 840, height: 580 },
  Geodash: { x: 140, y: 40, width: 720, height: 520 },
  FNAF: { x: 180, y: 60, width: 640, height: 520 },
  Solitaire: { x: 160, y: 30, width: 680, height: 580 },
  PacMan: { x: 200, y: 60, width: 520, height: 580 },
  AmongUs: { x: 120, y: 30, width: 840, height: 620 },
  ClassOf09: { x: 140, y: 40, width: 720, height: 520 },
  DDLC: { x: 200, y: 80, width: 520, height: 420 },
  Minecraft: { x: 80, y: 20, width: 860, height: 620 },
  Maid: { x: 140, y: 50, width: 620, height: 470 },
  Steam: { x: 120, y: 40, width: 720, height: 520 },
  Discord: { x: 200, y: 80, width: 520, height: 420 },
  TwoW2T: { x: 80, y: 20, width: 860, height: 620 },
  Redacted: { x: 180, y: 70, width: 520, height: 420 },
  HedgeC: { x: 180, y: 70, width: 520, height: 420 },
  OoBio: { x: 180, y: 70, width: 520, height: 420 },
  Video: { x: 160, y: 50, width: 660, height: 500 },
};

let windowCounter = 0;

function App() {
  const [phase, setPhase] = useState('bios');
  const [windows, setWindows] = useState([]);
  const [focusedId, setFocusedId] = useState(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const windowsRef = useRef(windows);
  windowsRef.current = windows;

  const openApp = useCallback((componentName) => {
    if (componentName === 'ShutDown') {
      setPhase('shutdown');
      setStartMenuOpen(false);
      return;
    }
    setWindows((prev) => {
      const existing = prev.find((w) => w.component === componentName && !w.closed);
      if (existing) {
        setFocusedId(existing.id);
        return prev.map((w) =>
          w.id === existing.id ? { ...w, minimized: false } : w
        );
      }
      const id = ++windowCounter;
      const basePos = DEFAULT_POSITIONS[componentName] || {
        x: 120 + (id % 6) * 40,
        y: 60 + (id % 6) * 40,
        width: 640,
        height: 420,
      };
      const jitter = { x: (id % 3) * 15, y: (id % 3) * 15 };
      setFocusedId(id);
      return [
        ...prev,
        {
          id,
          component: componentName,
          title: WINDOW_TITLES[componentName] || componentName,
          icon: WINDOW_ICONS[componentName] || '📄',
          x: basePos.x + jitter.x,
          y: basePos.y + jitter.y,
          width: basePos.width,
          height: basePos.height,
          minimized: false,
          closed: false,
          zIndex: id,
        },
      ];
    });
    setStartMenuOpen(false);
  }, []);

  const closeWindow = useCallback((id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setFocusedId(() => {
      const remaining = windowsRef.current.filter((w) => w.id !== id && !w.minimized);
      return remaining.length > 0 ? remaining[remaining.length - 1].id : null;
    });
  }, []);

  const minimizeWindow = useCallback((id) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
    setFocusedId(() => {
      const remaining = windowsRef.current.filter(
        (w) => w.id !== id && !w.minimized
      );
      return remaining.length > 0 ? remaining[remaining.length - 1].id : null;
    });
  }, []);

  const focusWindow = useCallback((id) => {
    setFocusedId(id);
    setWindows((prev) => {
      const maxZ = Math.max(...prev.map((w) => w.zIndex), 0);
      return prev.map((w) =>
        w.id === id ? { ...w, minimized: false, zIndex: maxZ + 1 } : w
      );
    });
  }, []);

  const handleTaskbarClick = useCallback(
    (id) => {
      const win = windowsRef.current.find((w) => w.id === id);
      if (!win) return;
      if (win.minimized) {
        focusWindow(id);
      } else if (focusedId === id) {
        minimizeWindow(id);
      } else {
        focusWindow(id);
      }
    },
    [focusedId, focusWindow, minimizeWindow]
  );

  if (phase === 'bios') {
    return <BIOSBootScreen onComplete={() => setPhase('boot')} />;
  }

  if (phase === 'boot') {
    return <BootScreen onComplete={() => setPhase('desktop')} />;
  }

  if (phase === 'shutdown') {
    return (
      <ShutDownScreen
        onComplete={() => {
          setPhase('bios');
          setWindows([]);
          setFocusedId(null);
        }}
      />
    );
  }

  const openWindowData = windows.filter((w) => !w.closed);

  return (
    <>
      <Desktop
        onOpenApp={openApp}
        activeWindows={openWindowData.map((w) => w.component)}
      />

      <AnimatePresence>
        {openWindowData
          .filter((w) => !w.minimized)
          .map((win) => {
            const AppComponent = APP_COMPONENTS[win.component];
            if (!AppComponent) return null;
            return (
              <Window
                key={win.id}
                windowId={win.id}
                title={win.title}
                icon={win.icon}
                isActive={focusedId === win.id}
                onClose={() => closeWindow(win.id)}
                onMinimize={() => minimizeWindow(win.id)}
                onFocus={() => focusWindow(win.id)}
                initialPosition={{
                  x: win.x,
                  y: win.y,
                  width: win.width,
                  height: win.height,
                }}
              >
                <AppComponent onClose={() => closeWindow(win.id)} />
              </Window>
            );
          })}
      </AnimatePresence>

      <Taskbar
        openWindows={openWindowData.map((w) => ({
          id: w.id,
          title: w.title,
          icon: w.icon,
        }))}
        focusedWindow={focusedId}
        onStartClick={() => setStartMenuOpen((v) => !v)}
        onWindowClick={handleTaskbarClick}
      />

      <StartMenu
        isOpen={startMenuOpen}
        onOpenApp={openApp}
        onClose={() => setStartMenuOpen(false)}
      />
    </>
  );
}

export default App;
